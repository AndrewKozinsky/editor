import { baseTemplate } from './letters/functions/baseTemplate'
import { confirmLetterContentTemplate } from './letters/functions/confirmLetterContentTemplate'
// const resetPasswordLetterContentTemplate = require('./letters/functions/resetPasswordLetterContentTemplate')

// Класс содержит методы для создания разметки писем различных типов.
// Возвращается текстовую и HTML-версия письма.
export class EmailTemplate {
    host: string

    constructor(host: string) {
        this.host = host
    }

    // Функция создаёт шаблон письма с просьбой подтвердить почтовый адрес
    createConfirmLetter(confirmUrl: string) {
        // Получить разметку содержимого письма подтверждения почты
        const letterContent = confirmLetterContentTemplate(confirmUrl)

        // Получить каркас письма и вставить в него содержимое
        const htmlTemplate = baseTemplate(this.host, letterContent)

        // Текстовая версия письма
        const textContent = `Your email address was provided when you registered in the Editorium. Please confirm your mail address by clicking on this address: ${confirmUrl}. If you did not register for this service, please ignore this letter.`

        return [htmlTemplate, textContent]
    }

    // Функция создаёт шаблон письма со ссылкой на сброс пароля
    /*createResetPasswordLetter(resetUrl) {
        const letterContent = resetPasswordLetterContentTemplate(resetUrl)
        const htmlTemplate = baseTemplate(this.host, letterContent)

        const textContent = `Reset password request was made. Please click on this address to reset your password and provide the new one: ${resetUrl}. If you didn't forget your password, please ignore this email.`

        return [htmlTemplate, textContent]
    }*/
}