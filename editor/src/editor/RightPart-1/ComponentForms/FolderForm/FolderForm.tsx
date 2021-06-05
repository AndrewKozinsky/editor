import React from 'react'
import {useSelector} from 'react-redux'
import {AppState} from 'store/rootReducer'
import Wrapper from 'common/Wrapper/Wrapper'
import TextInput from 'common/formElements/TextInput/TextInput'
import Button from 'common/formElements/Button/Button'
import Hr from 'common/misc/Hr/Hr'
import Form from 'common/formElements/Form/Form'
import useFormHandler from 'libs/formHandler/useFormHandler'
import getFormConfig from './formResources'
import messages from '../../messages'
import { useGetAnotherFolderData } from './FolderForm-func'
import useGetDeleteFolder from './deleteFolder'

export default function FolderForm() {

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // FormHandler
    const fh = useFormHandler(getFormConfig(lang), 'folder')
    // Изменение данных формы при выделении другой папки шаблонов компонентов
    useGetAnotherFolderData(fh.formState, fh.setFormState)

    // Хук возвращает функцию открывающую модальное окно с подтверждением удаления папки
    const openDeleteTemplateConfirmation = useGetDeleteFolder()

    return (
        <Form name='folder' formHandlers={fh.formHandlers}>
            <Wrapper b={15}>
                <TextInput
                    label={messages.ComponentFolderForm.folderNameInput[lang]}
                    name='name'
                    value={fh.fields.name.value[0]}
                    onChange={fh.onChangeFieldHandler}
                    error={fh.fields.name.data.error}
                    disabled={fh.fields.name.data.disabled}
                />
            </Wrapper>
            <Wrapper>
                <Hr />
            </Wrapper>
            <Wrapper t={10} align={'right'} gap={10}>
                <Button
                    type='submit'
                    text={messages.ComponentFolderForm.submitBtnTextSave[lang]}
                    icon='btnSignSave'
                    name='submit'
                    disabled={fh.fields.submit.data.disabled}
                    loading={fh.fields.submit.data.loading}
                />
                <Button
                    type='button'
                    text={messages.ComponentFolderForm.deleteFolderBtnText[lang]}
                    icon='btnSignTrash'
                    onClick={openDeleteTemplateConfirmation}
                />
            </Wrapper>
        </Form>
    )
}
