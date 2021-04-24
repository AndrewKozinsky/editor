import * as mongoose from 'mongoose'
import { Schema, Document } from 'mongoose'
const validator = require('validator')
import * as bcrypt from 'bcryptjs'
const crypto = require('crypto')


export interface IUser extends Document {
    name?: string,
    email: string,
    emailConfirmToken?: string,
    password: string,
    passwordConfirm?: string,
    passwordChangedAt?: Date,
    passwordResetToken?: string,
    passwordResetExpires?: Date,
    language: string

    correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>,
    changedPasswordAfter(JWTTimestamp: number): Promise<boolean>,
    createPasswordResetToken(): string
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
    // Дата когда был изменён пароль
    passwordChangedAt: Date,
    // Токен сброса пароля
    passwordResetToken: String,
    // Дата когда токен сброса пароля будет недействителен
    passwordResetExpires: Date,
    // Язык итерфейса
    language: {
        type: String,
        required: [ true, '{{user.langRequired}}' ]
    },
})

// Перед сохранением пользователя зашифровать пароль
UserSchema.pre('save', async function(this: IUser, next) {
    // Завершить функцию если не обновляют пароль
    if(!this.isModified('password')) return next()

    // Зашифровать пароль
    this.password = await bcrypt.hash(this.password, 12)

    // Удалить поле с подтверждением пароля
    this.passwordConfirm = undefined
})

// При изменении пароля записать дату изменения
UserSchema.pre('save', function (this: IUser, next) {
    if(!this.isModified('password') || this.isNew)
        return next();

    const newDate = new Date()
    newDate.setMinutes(newDate.getMinutes() - 1)

    this.passwordChangedAt = newDate
    next()
})


// Функция проверяющая идентичность паролей
UserSchema.methods.correctPassword = async (candidatePassword: string, userPassword: string) => {
    return await bcrypt.compare(candidatePassword, userPassword)
}


// Функция проверяет изменился ли пароль пользователя позже, чем переданное время.
// true обозначает, что изменился позже переданного времени
UserSchema.methods.changedPasswordAfter = function (this: IUser, JWTTimestamp: number) {

    if(this.passwordChangedAt) {
        const changedTimestamp = Math.round(
            this.passwordChangedAt.getTime() / 1000
        )

        return JWTTimestamp < changedTimestamp
    }

    return false
}

// Метод создающий токен сброса пароля
UserSchema.methods.createPasswordResetToken = function (this: IUser) {
    // Будет сгенерирована строка вида 2d860d2bb4d2d0184e99e80fac9390ab55bd72a0b545bdf06c34ae9a87cc6d2b
    const resetToken = crypto.randomBytes(32).toString('hex')

    // Поставить зашифрованный токен сброса пароля в данные пользователя
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')

    // Поставить, что пароль можно сбросить в течение 10 минут
    const newDate = new Date()
    newDate.setMinutes(newDate.getMinutes() + 10)
    this.passwordResetExpires = newDate

    return resetToken
}


const UserModel = mongoose.model<IUser>('User', UserSchema)

export default UserModel