
export function forgotPasswordLetterContentTemplate(resetUrl: string, lang: string) {

    // Если нужно отправить письмо на русском языке
    if (lang === 'rus') {
        return `<p class="paragraph">
            Был сделан запрос на сброс пароля. Пожалуйста, щелкните по этой кнопке чтобы подтвердить сброс и вписать новый пароль.
        </p>
        <div class="button-link-wrapper">
            <a href="${resetUrl}" class="button-link">
                Сбросить пароль
            </a>
        </div>
        <p class="paragraph">
            Если вы не делали запрос на сброс пароля, то проигнорируйте это письмо.
        </p>`
    }
    // В противном случае отправить письмо на английском языке
    else {
        return `<p class="paragraph">
            Reset password request was made. Please click on this button to reset your password and provide the new one.
        </p>
        <div class="button-link-wrapper">
            <a href="${resetUrl}" class="button-link">
                Reset my password
            </a>
        </div>
        <p class="paragraph">
            If you didn't forget your password, please ignore this email.
        </p>`
    }
}