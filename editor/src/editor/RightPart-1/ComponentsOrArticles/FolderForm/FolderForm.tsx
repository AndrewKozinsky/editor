// import React from 'react'
// import {useSelector} from 'react-redux'
// import {AppState} from 'store/rootReducer'
// import Wrapper from 'common/Wrapper/Wrapper'
// import TextInput from 'common/formElements/TextInput/TextInput'
// import Button from 'common/formElements/Button/Button'
// import Hr from 'common/misc/Hr/Hr'
// import Form from 'common/formElements/Form/Form'
// import useFormHandler from 'libs/formHandler/useFormHandler'
// import getFormConfig from './formResources'
// import messages from '../../messages'
// import { useGetAnotherFolderData } from './FolderForm-func'
// import ModalContent from './deleteFolder'
// import useGetShowModal from 'utils/hooksUtils'
// import { FolderType } from '../types'


/*type FolderFormPropType = {
    type: FolderType // Тип списка папок: компоненты или статьи
}*/

/** Компонент формы редактирования папки */
/*export default function FolderForm(props: FolderFormPropType) {
    const { type } = props

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // FormHandler
    const fh = useFormHandler(getFormConfig(lang, type), 'folder')
    // Изменение данных формы при выделении другой папки шаблонов компонентов
    useGetAnotherFolderData(type, fh.formState, fh.setFormState)

    // Хук возвращает функцию открывающую модальное окно с подтверждением удаления папки
    const openDeleteTemplateConfirmation = useGetShowModal(<ModalContent type={type} />)

    // Подпись поля с названием папки
    let nameInputText = messages.ComponentFolderForm.folderNameInput[lang]
    if(type === 'articles') {
        nameInputText = messages.ArticlesFolderForm.folderNameInput[lang][lang]
    }

    // Подпись кнопке отправки
    let submitBtnText = messages.ComponentFolderForm.submitBtnTextSave[lang]
    if(type === 'articles') {
        submitBtnText = messages.ArticlesFolderForm.submitBtnTextSave[lang]
    }

    // Подпись кнопке удаления
    let deleteBtnText = messages.ComponentFolderForm.deleteFolderBtnText[lang]
    if(type === 'articles') {
        deleteBtnText = messages.ArticlesFolderForm.deleteFolderBtnText[lang]
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
}*/
