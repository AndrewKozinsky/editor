import { baseTemplate } from './letters/functions/baseTemplate'
import { confirmLetterContentTemplate } from './letters/functions/confirmLetterContentTemplate'
const { forgotPasswordLetterContentTemplate } = require('./letters/functions/forgotPasswordLetterContentTemplate')

// Класс содержит методы для создания разметки писем различных типов.
// Возвращается текстовую и HTML-версия письма.
export class EmailTemplate {
    host: string

    constructor(host: string) {
        this.host = host
    }

    // Функция создаёт шаблон письма с просьбой подтвердить почтовый адрес
    createConfirmLetter(token: string, lang: string) {
        // Получить разметку содержимого письма подтверждения почты
        const letterContent = confirmLetterContentTemplate(this.host, token, lang)

        // Получить каркас письма и вставить в него содержимое
        const htmlTemplate = baseTemplate(this.host, letterContent, lang)

        // Текстовая версия письма
        const textContent = lang === 'rus'
            ? `Ваш адрес был указан при регистрации на сервисе Editorium. Пожалуйста, подтвердите почту перейдя по адресу: ${this.host}/editor/confirm-email и в открывшейся форме укажите токен ${token}. Если вы не регистрировались на этом сервисе, то проигнорируйте это письмо.`
            : `Your email address was provided when you registered in the Editorium. Please confirm your email by going to ${this.host}/editor/confirm-email and enter ${token} in the form that opens. If you did not register for this service, please ignore this letter.`

        return [htmlTemplate, textContent]
    }

    // Функция создаёт шаблон письма со ссылкой на сброс пароля
    createForgotPasswordLetter(resetUrl: string, lang: string) {
        const letterContent = forgotPasswordLetterContentTemplate(resetUrl, lang)

        // Получить каркас письма и вставить в него содержимое
        const htmlTemplate = baseTemplate(this.host, letterContent, lang)

        // Текстовая версия письма
        const textContent = lang === 'rus'
            ? `Был сделан запрос на сброс пароля. Пожалуйста, перейдите по этому адресу чтобы подтвердить сброс и вписать новый пароль.: ${resetUrl}. Если вы не делали запрос на сброс пароля, то проигнорируйте это письмо.`
            : `Reset password request was made. Please click on this address to reset your password and provide the new one: ${resetUrl}. If you didn't forget your password, please ignore this email.`

        return [htmlTemplate, textContent]
    }
}