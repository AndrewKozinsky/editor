import React from 'react'
import {useSelector} from 'react-redux'
import {AppState} from 'src/store/rootReducer'
import Wrapper from 'src/common/Wrapper/Wrapper'
import TextInput from 'src/common/formElements/TextInput/TextInput'
import Hr from 'src/common/misc/Hr/Hr'
import Form from 'src/common/formElements/Form/Form'
import useFormHandler from 'src/libs/formHandler/useFormHandler'
import getFormConfig from './formResources'
import Button from 'src/common/formElements/Button/Button'
import messages from '../../messages'
import {
    // useGetAnotherTemplate,
    useGetDeleteTemplateVisibilityStatus,
    useGetSubmitButtonText
} from './ComponentForm-func'
import useGetDeleteTemplate from './deleteTemplate'

export default function ComponentForm() {

    // id выделенного шаблона подключаемых файлов
    // const {currentTemplateId} = useSelector((store: AppState) => store.sites.incFilesTemplatesSection)

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // FormHandler
    const fh = useFormHandler(getFormConfig(lang), 'component')
    // Изменение данных формы при выделении другого шаблона подключаемых файлов
    // useGetAnotherTemplate(fh.formState, fh.setFormState)

    // Текст на кнопке отправки
    const submitButtonText = useGetSubmitButtonText(lang)

    // Если id текущего шаблона равен null, то ни выделен ни новый сайт, ни текущий,
    // поэтому ничего не отрисовывать.
    // if (currentTemplateId === null) return null

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
                    text={submitButtonText}
                    icon={fh.fields.submit.data.icon}
                    name='submit'
                    disabled={fh.fields.submit.data.disabled}
                    loading={fh.fields.submit.data.loading}
                />
                <DeleteTemplateButton />
            </Wrapper>
        </Form>
    )
}

/** Кнопка удаления шаблона компонента */
function DeleteTemplateButton() {
    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Хук возвращает функцию открывающую модальное окно с подтверждением удаления шаблона
    const openDeleteTemplateConfirmation = useGetDeleteTemplate()

    // Нужно ли показывать кнопку удаления сайта
    const isDeleteSiteButtonVisible = useGetDeleteTemplateVisibilityStatus()
    if (!isDeleteSiteButtonVisible) return null

    return (
        <Button
            type='button'
            text={messages.ComponentTemplateForm.deleteComponentBtnText[lang]}
            icon='btnSignTrash'
            onClick={openDeleteTemplateConfirmation}
        />
    )
}
