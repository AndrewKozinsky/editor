import * as mongoose from 'mongoose'
import { db } from '../configuration'

export function connectDb() {
    const params = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }

    mongoose.connect(db, params)

    return mongoose.connection
}