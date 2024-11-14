import bcrypt from 'bcryptjs'
import axios from 'axios'

export const returnUrl = () => {
    const url = {
        protocol: process.env.API_PROTOCOL,
        hostname: `${process.env.API_HOSTNAME}:${process.env.EXT_API_PORT}`,
        pathname: process.env.API_AUTH_PATHNAME,
        pass_api: process.env.PASS_API
    }

    return `${url.protocol}://${url.hostname}/${url.pathname}/${url.pass_api}`
}


export const request = async () => {

    const url = returnUrl()
    const { data } = await axios.get(url)
    return data


}


export const login = async (req, res) => {
    try {

        const authCookie = req.cookies.authTokenSCST;

        if (authCookie) throw new Error('Já há um usuário autenticado!')

        const { register, password } = req.body

        const users = await request()

        if (users) {

            const user = users.some(item => item.matricula === Number(register)) ? users.find(item => item.matricula === Number(register)) : {}

            console.log(typeof user)

            if (user && Object.keys(user).length == 0) throw new Error('Usuário não encontrado')

            if (!password) throw new Error('Senha inexistente')

            const validPass = await bcrypt.compare(password, user.senha);

            if (!validPass) throw new Error('Senha incorreta')

            res.cookie('authTokenSCST', user.matricula, { maxAge: 900000, httpOnly: true });

            res.redirect('/is-authenticated')

        }

    } catch (error) {
        console.error(error.message)
        res.json({ message: error.message })
    }
}

export const logout = (req, res) => {

    const cookie = 'authTokenSCST'

    const authCookie = req.cookies[cookie];

    if (authCookie) {
        res.clearCookie(cookie);
        res.json({ message: 'Logout efetuado com sucesso!' });
    } else {
        res.json({
            message: 'Nenhum usuário autenticado para efetuar logout.'
        })
    }
};

export const isAuthenticated = (req, res) => {

    const authCookie = req.cookies.authTokenSCST;

    if (authCookie) {
        res.json({
            message: 'Usuário autenticado.',
            matricula: authCookie
        })
    } else {
        res.json({
            message: 'Nenhum usuário autenticado.'
        })
    }
};