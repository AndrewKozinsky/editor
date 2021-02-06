import * as mongoose from 'mongoose'
import { Schema, Document } from 'mongoose'
const validator = require('validator')


export interface IUser extends Document {
    name?: string,
    email: string,
    emailConfirmToken?: string,
    password: string,
    passwordConfirm: string,
    passwordChangedAt?: Date,
    passwordResetToken?: string,
    passwordResetExpires?: Date,
    lang: string
}

const UserSchema: Schema = new Schema({
    // Имя пользователя
    name: {
        type: String
    },
    // Почта пользователя
    email: {
        type: String,
        lowercase: true,
        required: [true, '{{user.emailRequired}}'],
        unique: true,
        validate: [validator.isEmail, '{{user.emailValidate}}']
    },
    // Токен подтверждения почты пользователя. Если undefined, то почта еще не подтверждена
    emailConfirmToken: String,
    // Пароль пользователя
    password: {
        type: String,
        required: [true, '{{user.passwordRequired}}'],
        minLength: [4, '{{user.passwordMinLength}}'],
        select: false
    },
    // Подтверждение пароля при регистрации и смене пароля
    passwordConfirm: {
        type: String,
        required: [ true, '{{user.passwordConfirmRequired}}' ],
        validate: {
            validator: function (this: IUser, passwordConfirm: string) {
                return this.password === passwordConfirm
            },
            message: '{{user.passwordConfirmValidate}}'
        }
    },
    // Когда был изменён пароль
    passwordChangedAt: Date,
    // Токен сброса пароля
    passwordResetToken: String,
    // Срок когда токен сброса пароля будет недействителен
    passwordResetExpires: Date,
    // Язык итерфейса
    lang: {
        type: String,
        required: [ true, '{{user.langRequired}}' ]
    },
})

// Перед сохранением пользователя зашифровать пароль
UserSchema.pre('save', async function(next) {
    // Завершить функцию если не обновляют пароль
    // if(!this.isModified('password')) return next()

    // Зашифровать пароль
    // this.password = await bcrypt.hash(this.password, 12)

    // Удалить поле с подтверждением пароля
    // this.passwordConfirm = undefined
})

// При изменении пароля записать дату изменения
/*UserSchema.pre('save', function (next) {
    if(!this.isModified('password') || this.isNew)
        return next();

    this.passwordChangedAt = +Date.now() - 1000
    next()
})*/


// Функция проверяющая идентичность паролей
/*UserSchema.methods.correctPassword = async (candidatePassword, userPassword) => {
    return await bcrypt.compare(candidatePassword, userPassword)
}*/

// Функция проверяет изменился ли пароль пользователя позже, чем переданное время.
// true обозначает, что изменился позже переданного времени
/*UserSchema.methods.changedPasswordAfter = function (JWTTimestamp) {

    if(this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );

        return JWTTimestamp < changedTimestamp
    }

    return false
}*/

// Метод создающий токен сброса пароля
/*UserSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex')

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000

    return resetToken;
}*/


const UserModel = mongoose.model<IUser>('User', UserSchema)

export default UserModel