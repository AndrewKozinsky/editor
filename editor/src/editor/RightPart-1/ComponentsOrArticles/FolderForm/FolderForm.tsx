import React from 'react'
import Wrapper from 'common/Wrapper/Wrapper'
import TextInput from 'common/formElements/TextInput/TextInput'
import Button from 'common/formElements/Button/Button'
import Hr from 'common/misc/Hr/Hr'
import Form from 'common/formElements/Form/Form'
import useFormHandler from 'libs/formHandler/useFormHandler'
import getFormConfig from './formResources'
import { useGetAnotherFolderData } from './FolderForm-func'
import ModalContent from './deleteFolder'
import useGetShowModal from 'utils/hooksUtils'
import { FolderType } from '../types'
import { componentFolderFormMessages } from 'messages/componentFolderFormMessages'
import { articleFolderFormMessages } from 'messages/articleFolderFormMessages'


type FolderFormPropType = {
    type: FolderType // Тип списка папок: компоненты или статьи
}

/** Компонент формы редактирования папки */
export default function FolderForm(props: FolderFormPropType) {
    const { type } = props

    // FormHandler
    const fh = useFormHandler(getFormConfig(type), 'folder')
    // Изменение данных формы при выделении другой папки шаблонов компонентов или статей
    useGetAnotherFolderData(type, fh.formState, fh.setFormState)

    // Хук возвращает функцию открывающую модальное окно с подтверждением удаления папки
    const openDeleteTemplateConfirmation = useGetShowModal(<ModalContent type={type} />)

    // Подпись поля с названием папки
    let nameInputText = componentFolderFormMessages.folderNameInput
    if(type === 'articles') {
        nameInputText = articleFolderFormMessages.folderNameInput
    }

    // Подпись кнопки отправки
    let submitBtnText = componentFolderFormMessages.submitBtnTextSave
    if(type === 'articles') {
        submitBtnText = articleFolderFormMessages.submitBtnTextSave
    }

    // Подпись кнопке удаления
    let deleteBtnText = componentFolderFormMessages.deleteFolderBtnText
    if(type === 'articles') {
        deleteBtnText = articleFolderFormMessages.deleteFolderBtnText
    }

    return (
        <Form name='folder' formHandlers={fh.formHandlers}>
            <Wrapper b={15}>
                <TextInput
                    label={nameInputText}
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
                    text={submitBtnText}
                    icon='btnSignSave'
                    name='submit'
                    disabled={fh.fields.submit.data.disabled}
                    loading={fh.fields.submit.data.loading}
                />
                <Button
                    type='button'
                    text={deleteBtnText}
                    icon='btnSignTrash'
                    onClick={openDeleteTemplateConfirmation}
                />
            </Wrapper>
        </Form>
    )
}
