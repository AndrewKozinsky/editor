export function confirmLetterContentTemplate(confirmUrl: string, lang: string) {

    // Если нужно отправить письмо на русском языке
    if (lang === 'rus') {
        return `<p class="paragraph">
                Ваша почта была указана при регистрации на сервисе <i>Editorium</i>. Пожалуйста, подтвердите её щёлкнув на эту кнопку:
            </p>
            <div class="button-link-wrapper">
                <a href="${confirmUrl}" class="button-link">
                    Подтвердить почту
                </a>
            </div>
            <p class="paragraph">
                Если вы не регистрировались на сервисе, то проигнорируйте это письмо.
            </p>`
    }
    // В противном случае отправить письмо на английском языке
    else {
        return `<p class="paragraph">
                Your email address was provided when you registered in the <i>Editorium</i>. Please confirm your mail address by clicking on this button:
            </p>
            <div class="button-link-wrapper">
                <a href="${confirmUrl}" class="button-link">
                    Confirm my email
                </a>
            </div>
            <p class="paragraph">
                If you did not register for this service, please ignore this letter.
            </p>`
    }


}