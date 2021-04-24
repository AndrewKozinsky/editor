import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
// @ts-ignore
import { useHistory } from 'react-router-dom'
import {AppState} from 'store/rootReducer'
import Header from 'common/textBlocks/Header/Header'
import Menu from 'common/misc/Menu/Menu'
import Button from 'common/formElements/Button/Button'
import Form from 'common/formElements/Form/Form'
import Wrapper from 'common/Wrapper/Wrapper'
import TextInput from 'common/formElements/TextInput/TextInput'
import messages from '../messages'
import getFormConfig from './formResources'
import { getMenuItems } from '../menuItems'
import useFormHandler from 'libs/formHandler/useFormHandler'
import CommonError from '../CommonError/CommonError'


/** Форма входа в сервис */
export default function ConfirmEmailFormBlock() {
    const dispatch = useDispatch()
    const history = useHistory()

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // FormHandler
    const fh = useFormHandler(getFormConfig(lang, history, dispatch), 'confirmEmail')

    return (
        <div>
            <Wrapper b={25}>
                <Menu items={getMenuItems(lang)}/>
            </Wrapper>
            <Wrapper b={10}>
                <Header text={messages.ConfirmEmailForm.formHeader[lang]} type='h1' relativeSize={1}/>
            </Wrapper>
            <Form name='confirmEmail' formHandlers={fh.formHandlers}>
                <Wrapper>
                    <TextInput
                        label={ messages.ConfirmEmailForm.tokenField[lang] }
                        name='token'
                        relativeSize={2}
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
                        text={messages.ConfirmEmailForm.submitBtnText[lang]}
                        name='submit'
                        relativeSize={1}
                        disabled={fh.fields.submit.data.disabled}
                        loading={fh.fields.submit.data.loading}
                    />
                </Wrapper>
                <CommonError error={fh.form.commonError} />
            </Form>
        </div>
    )
}
