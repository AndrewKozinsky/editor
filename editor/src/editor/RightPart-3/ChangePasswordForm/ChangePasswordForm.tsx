// import React from 'react'
// import Wrapper from 'common/Wrapper/Wrapper'
// import TextInput from 'common/formElements/TextInput/TextInput'
// import Button from 'common/formElements/Button/Button'
// import Form from 'common/formElements/Form/Form'
// import Notice from 'common/Notice/Notice'
// import useFormHandler from 'libs/formHandler/useFormHandler'
// import getFormConfig from './formResources'
// import { changePasswordSectionMessages } from 'messages/changePasswordSectionMessages'


/*export default function ChangePasswordForm() {

    // FormHandler
    const fh = useFormHandler(getFormConfig(), 'changePassword')

    return (
        <>
            <Form name='changePassword' formHandlers={fh.formHandlers}>
                <Wrapper>
                    <TextInput
                        label={ changePasswordSectionMessages.currentPasswordField }
                        name='passwordCurrent'
                        type='password'
                        maxWidth={250}
                        value={fh.fields.passwordCurrent.value[0]}
                        onChange={fh.onChangeFieldHandler}
                        autocomplete='current-password'
                        error={fh.fields.passwordCurrent.data.error}
                        disabled={fh.fields.passwordCurrent.data.disabled}
                    />
                </Wrapper>
                <Wrapper t={10}>
                    <TextInput
                        label={ changePasswordSectionMessages.newPasswordField }
                        name='newPassword'
                        type='password'
                        maxWidth={250}
                        value={fh.fields.newPassword.value[0]}
                        onChange={fh.onChangeFieldHandler}
                        autocomplete='new-password'
                        error={fh.fields.newPassword.data.error}
                        disabled={fh.fields.newPassword.data.disabled}
                    />
                </Wrapper>
                <Wrapper t={10}>
                    <TextInput
                        label={ changePasswordSectionMessages.newPasswordAgainField }
                        name='newPasswordAgain'
                        type='password'
                        maxWidth={250}
                        value={fh.fields.newPasswordAgain.value[0]}
                        onChange={fh.onChangeFieldHandler}
                        autocomplete='new-password'
                        error={fh.fields.newPasswordAgain.data.error}
                        disabled={fh.fields.newPasswordAgain.data.disabled}
                    />
                </Wrapper>
                <Wrapper t={10}>
                    <Button
                        text={changePasswordSectionMessages.submitBtnText}
                        name='submit'
                        type='submit'
                        icon='btnSignSave'
                        disabled={fh.fields.submit.data.disabled}
                        loading={fh.fields.submit.data.loading}
                    />
                </Wrapper>
            </Form>
            {fh.form.passwordHasChanged && <Wrapper t={15}>
                <Notice type='success'>
                    {changePasswordSectionMessages.passwordHasChanged}
                </Notice>
            </Wrapper>}
        </>
    )
}*/
