import React from 'react'
import {useSelector} from 'react-redux'
import {AppState} from 'store/rootReducer'
import Wrapper from 'common/Wrapper/Wrapper'
import Button from 'common/formElements/Button/Button'
import TextInput from 'common/formElements/TextInput/TextInput'
import Hr from 'common/misc/Hr/Hr'
import useFormHandler from 'libs/formHandler/useFormHandler'
import getFormConfig from './formResources'
import messages from '../../messages'
import Form from 'common/formElements/Form/Form'
// import { useGetAnotherComponent } from './ComponentForm-func'
import { ModalContent } from './deleteComponent'
import useGetShowModal from 'utils/hooksUtils'

export default function ComponentForm() {

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // FormHandler
    const fh = useFormHandler(getFormConfig(lang), 'component')

    // Изменение данных формы при выделении другого шаблона подключаемых файлов
    // useGetAnotherComponent(fh.formState, fh.setFormState)

    // Хук возвращает функцию открывающую модальное окно с подтверждением удаления шаблона
    const openDeleteTemplateConfirmation = useGetShowModal(<ModalContent />)

    return (
        <Form name='component' formHandlers={fh.formHandlers}>
            <Wrapper>
                <TextInput
                    label={messages.ComponentTemplateForm.componentNameInput[lang]}
                    name='name'
                    value={fh.fields.name.value[0]}
                    onChange={fh.onChangeFieldHandler}
                    placeholder={messages.ComponentTemplateForm.componentNamePlaceholder[lang]}
                    error={fh.fields.name.data.error}
                    disabled={fh.fields.name.data.disabled}
                />
            </Wrapper>
            <Wrapper t={15}>
                <TextInput
                    label={ messages.ComponentTemplateForm.componentCodeInput[lang] }
                    inputType='textarea'
                    name='code'
                    value={fh.fields.code.value[0]}
                    onChange={fh.onChangeFieldHandler}
                    error={fh.fields.code.data.error}
                    disabled={fh.fields.code.data.disabled}
                />
            </Wrapper>
            <Wrapper t={15}>
                <Hr />
            </Wrapper>
            <Wrapper t={10} align={'right'} gap={10}>
                <Button
                    type='submit'
                    text={messages.ComponentTemplateForm.submitBtnText[lang]}
                    icon='btnSignSave'
                    name='submit'
                    disabled={fh.fields.submit.data.disabled}
                    loading={fh.fields.submit.data.loading}
                />
                <Button
                    type='button'
                    text={messages.ComponentTemplateForm.deleteComponentBtnText[lang]}
                    icon='btnSignTrash'
                    onClick={openDeleteTemplateConfirmation}
                />
            </Wrapper>
        </Form>
    )
}
