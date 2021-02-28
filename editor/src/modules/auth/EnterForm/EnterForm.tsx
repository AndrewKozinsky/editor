import React from 'react'
import Header from '../../textBlocks/Header/Header'
import AuthFormMenu from '../AuthFormMenu/AuthFormMenu'
import messages from '../messages'
import '../AuthFormStyles/AuthFormStyles.scss'
import {useSelector} from 'react-redux';
import {AppState} from '../../../store/rootReduser';


/** Форма входа в сервис */
function EnterForm() {

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Корневой класс стилей форм
    let authFormCls = 'auth-form'

    return (
        <div>
            <AuthFormMenu />
            <div className={`${authFormCls}__header-wrapper`}>
                <Header text={messages.enterForm.formHeader[lang]} type='h1' />
            </div>
        </div>
    )
}

export default EnterForm;