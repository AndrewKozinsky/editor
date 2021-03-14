import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'store/rootReducer'
import Header from 'modules/textBlocks/Header/Header'
import Menu from 'common/misc/Menu/Menu'
import Button from 'common/formElements/Button/Button'
import Wrapper from 'common/Wrapper/Wrapper'
import TextInput from 'common/formElements/TextInput/TextInput'
import messages from '../messages'
// Удали если не потребуется
// import '../AuthFormStyles/AuthFormStyles.scss'


/** Форма входа в сервис */
function EnterForm() {

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Корневой класс стилей форм
    // Удали если не потребуется
    // let authFormCls = 'auth-form'

    return (
        <div>
            <Wrapper b={25}>
                <Menu />
            </Wrapper>
            <Wrapper b={10}>
                <Header text={messages.enterForm.formHeader[lang]} type='h1' />
            </Wrapper>
            <Wrapper>
                <TextInput
                    label={messages.enterForm.emailField[lang]}
                    size='middle'
                    placeholder={messages.enterForm.emailPlaceholder[lang]}
                    autoFocus
                />
            </Wrapper>
            <Wrapper t={15}>
                <TextInput label={messages.enterForm.passwordField[lang]} size='middle' />
            </Wrapper>
            <Wrapper t={20} align={'right'}>
                <Button text={messages.enterForm.submitBtnText[lang]} />
            </Wrapper>
        </div>
    )
}

export default EnterForm