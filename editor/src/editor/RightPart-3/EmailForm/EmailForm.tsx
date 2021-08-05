import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import { AppState } from 'store/rootReducer'
import formConfig from './formConfig'


export default function EmailForm() {
    const email = useSelector((store: AppState) => store.user.email)
    const formState = useFormConstructorState(formConfig)

    useEffect(function() {
        if (!email) return
        const emailField = formState.fields.email
        formState.updateField('email', { ...emailField, value: [email]})
    }, [email])

    return <FormConstructor config={formConfig} state={formState} />
}


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
