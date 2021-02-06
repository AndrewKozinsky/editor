export function confirmLetterContentTemplate(confirmUrl: string) {
    return `
        <p class="paragraph">
            Your email address was provided when you registered in the <i>Editorium</i>. Please confirm your mail address by clicking on this button:
        </p>
        <div class="button-link-wrapper">
            <a href="${confirmUrl}" class="button-link">
                Confirm my email
            </a>
        </div>
        <p class="paragraph">
            If you did not register for this service, please ignore this letter.
        </p>
        `
}