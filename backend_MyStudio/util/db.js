const url = process.env.MONGO_URI
import mongoose from 'mongoose'
const database = process.env.MONGO_DB

export const getDb = async () => {
    mongoose.set('bufferCommands', false)
    try {
        await mongoose.connect(url, { dbName: database })
            .then(() => {
                console.log('connected')
            })
            .catch(err => console.log('error connecting to db', err.message))
    } catch (error) {
        console.log('error getting db', error.message)
    }
}