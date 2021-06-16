import React from 'react'
// @ts-ignore
import { useHistory } from 'react-router-dom'
import Header from 'common/textBlocks/Header/Header'
import Menu from 'common/misc/Menu/Menu'
import Button from 'common/formElements/Button/Button'
import Form from 'common/formElements/Form/Form'
import Wrapper from 'common/Wrapper/Wrapper'
import TextInput from 'common/formElements/TextInput/TextInput'
import getFormConfig from './formResources'
import { getMenuItems } from '../menuItems'
import useFormHandler from 'libs/formHandler/useFormHandler'
import { confirmEmailMessages } from 'messages/confirmEmailMessages'
import CommonError from '../CommonError/CommonError'


/** Форма подтверждения почты */
export default function ConfirmEmailFormBlock() {
    const history = useHistory()

    // FormHandler
    const fh = useFormHandler(getFormConfig(history), 'confirmEmail')

    return (
        <div>
            <Wrapper b={25}>
                <Menu items={getMenuItems()}/>
            </Wrapper>
            <Wrapper b={10}>
                <Header text={confirmEmailMessages.formHeader} type='h1' />
            </Wrapper>
            <Form name='confirmEmail' formHandlers={fh.formHandlers}>
                <Wrapper>
                    <TextInput
                        label={ confirmEmailMessages.tokenField }
                        name='token'
                        value={fh.fields.token.value[0]}
                        onChange={fh.onChangeFieldHandler}
                        error={fh.fields.token.data.error}
                        disabled={fh.fields.token.data.disabled}
                        autoFocus
                    />
                </Wrapper>
                <Wrapper t={20} align={'right'}>
                    <Button
                        type='submit'
                        text={confirmEmailMessages.submitBtnText}
                        name='submit'
                        disabled={fh.fields.submit.data.disabled}
                        loading={fh.fields.submit.data.loading}
                    />
                </Wrapper>
                <CommonError error={fh.form.commonError} />
            </Form>
        </div>
    )
}
