import { ObjectId } from "mongodb";
import mongoose from 'mongoose'
import User from "../model/User.js";
import { getDb } from "../util/db.js";
import { createToken } from "../util/token.js";

const cookieConfig = {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    path: '/api'
}

mongoose.set('bufferCommands', false)

// const db = await getDb()
// const COL = 'users'

export const register = async (req, res) => {
    const user = req.body
    try {
        const dbUser = await User.exists({ email: user.email })
        if (dbUser !== null) {
            console.log('error: user already exists')
            res.status(409).end()
        }
        else {
            try {
                const newUser = await User.create({
                    first: user.first,
                    last: user.last,
                    email: user.email,
                    pass: user.pass,
                    registeredAt: new Date()
                })
                // console.log(newUser)
                res.status(200).json(newUser)
            } catch (error) {
                console.log(error.message)
            }
        }
    } catch (error) {
        console.log(error.message)
        res.status(403).end()
    }
}

export const login = async (req, res) => {
    const user = req.body
    try {
        const dbUser = await User.exists({ email: user.email })
        if (dbUser === null || dbUser.pass !== user.pass) {
            console.log('problem with username or password. please try again')
            res.status(401).end()
        }
        else {
            try {
                const token = createToken(dbUser)
                res.cookie('token', token, cookieConfig)
                res.status(200).json({ token })
            } catch (error) {
                console.log(error.message)
                res.status(403).end()
            }
        }
    } catch (error) {
        console.log(error.message)
        res.status(401).end()
    }
}