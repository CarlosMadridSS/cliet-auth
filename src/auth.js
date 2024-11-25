import bcrypt from 'bcryptjs'
import axios from 'axios'
import hasResultsInTable from './dal/hasResultsInTable.js'
import removeSessionUser from './dal/removeSessionUser.js'
import insertSessionUser from './dal/insertSessionUser.js'


export const returnUrl = () => {

    const ApiPort = process.env.EXT_API_PORT.length > 0 ? `:${process.env.EXT_API_PORT}` : ''

    const url = {
        protocol: process.env.API_PROTOCOL,
        hostname: `${process.env.API_HOSTNAME}${ApiPort}`,
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

        const { register, password } = req.body

        const resultHasResultsInTable = hasResultsInTable(register)

        if (resultHasResultsInTable) await removeSessionUser(register)

        const users = await request()

        if (users) {

            const user = users.some(item => item.matricula === Number(register)) ? users.find(item => item.matricula === Number(register)) : {}

            if (user && Object.keys(user).length == 0) throw new Error('Usuário não encontrado')

            if (!password) throw new Error('Senha inexistente')

            const validPass = await bcrypt.compare(password, user.senha);

            if (!validPass) throw new Error('Senha incorreta')

            insertSessionUser(register)

            setTimeout(() => {
                res.redirect(`/is-authenticated/${register}/${process.env.PASS_API}`)
            }, 400)

        }

    } catch (error) {
        console.error(error.message)
        res.json({ message: error.message })
    }
}

export const logout = async (req, res, register) => {

    const resultRemoveSessionUser = await removeSessionUser(register)

    if (resultRemoveSessionUser) res.json({ message: 'Logout efetuado com sucesso!' })
    else res.json({ message: 'Nenhum usuário autenticado para efetuar logout.' })
};

export const isAuthenticated = async (req, res, register) => {

    const resultHasResultsInTable = await hasResultsInTable(register)

    if (resultHasResultsInTable) {
        res.json({
            message: 'Usuário autenticado.',
            matricula: register
        })
    } else {
        res.json({
            message: 'Nenhum usuário autenticado.'
        })
    }
};