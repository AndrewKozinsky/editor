import * as mongoose from 'mongoose'
import { Schema, Document } from 'mongoose'

export interface IUser extends Document {
    name: string
}

const UserSchema: Schema = new Schema({
    name: String
})

const UserModel = mongoose.model<IUser>('User', UserSchema)

export default UserModel