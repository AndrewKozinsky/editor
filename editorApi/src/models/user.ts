import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
    name: String
})

const UserModel = model('User', UserSchema)

export default UserModel