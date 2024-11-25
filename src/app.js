import express from 'express';
import routers from './routers.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors'
import database from './db.js';

dotenv.config()

const app = express()

database()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // Permite cookies e credenciais
}));

app.use(express.json());

app.use(cookieParser(process.env.SECRET_COOKIES))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use('/', routers)


app.listen(process.env.API_PORT, console.log('Servidor rodando'))