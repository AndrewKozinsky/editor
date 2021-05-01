import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Wrapper from 'common/Wrapper/Wrapper'
import TextInput from 'common/formElements/TextInput/TextInput'
import Button from 'common/formElements/Button/Button'
import Form from 'common/formElements/Form/Form'
import {AppState} from 'store/rootReducer'
import useFormHandler from 'libs/formHandler/useFormHandler'
import getFormConfig from './formResources'
import messages from '../messages'
import Notice from 'common/Notice/Notice'
import useHandleConfirmChangingEmailModal from './confirmEmailModal'


export default function EmailForm() {

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // В openModal будет функция открывающая модальное окно с подтверждением изменения почты
    // В самом хуке обрабатывается утвердительный ответ на подтверждение изменения почты
    // isSuccessMessageOpen булево значение показывать ли сообщение об успешном изменении почты
    const { setIsModalOpen, isSuccessMessageOpen } = useHandleConfirmChangingEmailModal()

    // FormHandler
    const fh = useFormHandler(getFormConfig(lang, setIsModalOpen), 'email')

    return (
        <>
            <Form name='email' formHandlers={fh.formHandlers}>
                <Wrapper>
                    <TextInput
                        label={ messages.UserDataSection.emailField[lang] }
                        name='email'
                        value={fh.fields.email.value[0]}
                        maxWidth={250}
                        onChange={fh.onChangeFieldHandler}
                        autocomplete='email'
                        placeholder={messages.UserDataSection.emailPlaceholder[lang]}
                        error={fh.fields.email.data.error}
                        disabled={fh.fields.email.data.disabled}
                    />
                </Wrapper>
                <Wrapper t={10}>
                    <Button
                        type='submit'
                        text={messages.UserDataSection.submitBtnText[lang]}
                        name='submit'
                        icon='btnSignSave'
                        disabled={fh.fields.submit.data.disabled}
                        loading={fh.fields.submit.data.loading}
                    />
                </Wrapper>
            </Form>
            {isSuccessMessageOpen && <Wrapper t={15}>
                <Notice type='success'>
                    messages.UserDataSection.emailHasChanged[lang]
                </Notice>
            </Wrapper>}
        </>
    )
}
