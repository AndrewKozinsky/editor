// import React from 'react'
// import Wrapper from 'common/Wrapper/Wrapper'
// import TextInput from 'common/formElements/TextInput/TextInput'
// import Button from 'common/formElements/Button/Button'
// import Form from 'common/formElements/Form/Form'
// import useFormHandler from 'libs/formHandler/useFormHandler'
// import getFormConfig from './formResources'
// import Notice from 'common/Notice/Notice'
// import useHandleConfirmChangingEmailModal from './confirmEmailModal'
// import { userDataSectionMessages } from 'messages/userDataSectionMessages'


/*export default function EmailForm() {

    // FormHandler
    const fh = useFormHandler(getFormConfig(), 'email')

    // В openModal будет функция открывающая модальное окно с подтверждением изменения почты
    // В самом хуке обрабатывается утвердительный ответ на подтверждение изменения почты
    // isSuccessMessageOpen булево значение показывать ли сообщение об успешном изменении почты
    const { isSuccessMessageOpen } = useHandleConfirmChangingEmailModal(fh)

    return (
        <>
            <Form name='email' formHandlers={fh.formHandlers}>
                <Wrapper>
                    <TextInput
                        label={ userDataSectionMessages.emailField }
                        name='email'
                        value={fh.fields.email.value[0]}
                        maxWidth={250}
                        onChange={fh.onChangeFieldHandler}
                        autocomplete='email'
                        placeholder={userDataSectionMessages.emailPlaceholder}
                        error={fh.fields.email.data.error}
                        disabled={fh.fields.email.data.disabled}
                    />
                </Wrapper>
                <Wrapper t={10}>
                    <Button
                        type='submit'
                        text={userDataSectionMessages.submitBtnText}
                        name='submit'
                        icon='btnSignSave'
                        disabled={fh.fields.submit.data.disabled}
                        loading={fh.fields.submit.data.loading}
                    />
                </Wrapper>
            </Form>
            {isSuccessMessageOpen && <Wrapper t={15}>
                <Notice type='success'>
                    {userDataSectionMessages.emailHasChanged}
                </Notice>
            </Wrapper>}
        </>
    )
}*/
