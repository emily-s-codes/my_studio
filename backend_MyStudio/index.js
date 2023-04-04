import './config.js'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import { encrypt } from './middleware/encrypt.js'
import { register } from './controller/userController.js'

const PORT = process.env.PORT
const app = express()

const formReader = multer()

app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors({
    origin: true,
    credentials: true
}))
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send('Alles OKAY')
})

app.post('/api/register', encrypt, register)
app.post('/api/login', encrypt, register)

app.listen(PORT, () => console.log('Server runs on Port:', PORT))