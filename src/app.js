import express from 'express';
import routers from './routers.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

dotenv.config()

const app = express()

app.use(cookieParser(process.env.SECRET_COOKIES))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use('/', routers)


app.listen(process.env.API_PORT, console.log('Servidor rodando'))