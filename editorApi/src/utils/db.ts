import * as mongoose from 'mongoose'
import { config } from '../config/config'


/**
 * Функция соединяющаяся с базой данных
 */
export function connectDb(): mongoose.Connection {
    const params = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }

    mongoose.connect(config.db, params)
    return mongoose.connection
}
