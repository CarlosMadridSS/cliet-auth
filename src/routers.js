import express from 'express'
import { login, isAuthenticated, logout} from './auth.js'

const routers = express.Router()

const passApi = process.env.PASS_API

routers.post(`/login/:${passApi}`, async (req, res) => {
    login(req, res)
})


routers.get(`/is-authenticated/:register/:${passApi}`, (req, res) => {
    isAuthenticated(req, res, req.params.register)
})

routers.get(`/logout/:register/:${passApi}`, (req, res) => {
    logout(req, res, req.params.register)
})


export default routers