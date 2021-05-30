import React from 'react'
import Wrapper from 'src/common/Wrapper/Wrapper'
import TextInput from 'src/common/formElements/TextInput/TextInput'
import Hr from 'src/common/misc/Hr/Hr'
import Form from 'src/common/formElements/Form/Form'
import {useSelector} from 'react-redux'
import {AppState} from 'src/store/rootReducer'
import useFormHandler from 'src/libs/formHandler/useFormHandler'
import getFormConfig from './formResources'
import Button from 'src/common/formElements/Button/Button'
import messages from '../messages'
import {
    useGetAnotherTemplate,
    useGetDeleteTemplateVisibilityStatus,
    useGetSubmitButtonText
} from './IncFilesTemplateForm-func'
import useGetDeleteTemplate from './deleteTemplate'

export default function IncFilesTemplateForm() {

    // id выделенного шаблона подключаемых файлов
    const {currentTemplateId} = useSelector((store: AppState) => store.sites.incFilesTemplatesSection)

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // FormHandler
    const fh = useFormHandler(getFormConfig(lang), 'incFilesTemplate')
    // Изменение данных формы при выделении другого шаблона подключаемых файлов
    useGetAnotherTemplate(fh.formState, fh.setFormState)

    // Текст на кнопке отправки
    const submitButtonText = useGetSubmitButtonText(lang)

    // Если id текущего шаблона равен null, то ни выделен ни новый сайт, ни текущий,
    // поэтому ничего не отрисовывать.
    if (currentTemplateId === null) return null

    return (
        <Form name='incFilesTemplate' formHandlers={fh.formHandlers}>
            <Wrapper>
                <TextInput
                    label={ messages.IncFilesTemplateSection.templateNameInput[lang] }
                    name='name'
                    value={fh.fields.name.value[0]}
                    onChange={fh.onChangeFieldHandler}
                    placeholder={messages.IncFilesTemplateSection.templateNamePlaceholder[lang]}
                    error={fh.fields.name.data.error}
                    disabled={fh.fields.name.data.disabled}
                />
            </Wrapper>
            <Wrapper t={15}>
                <TextInput
                    label={ messages.IncFilesTemplateSection.headInput[lang] }
                    inputType='textarea'
                    name='head'
                    value={fh.fields.head.value[0]}
                    onChange={fh.onChangeFieldHandler}
                    error={fh.fields.head.data.error}
                    disabled={fh.fields.head.data.disabled}
                />
            </Wrapper>
            <Wrapper t={15}>
                <TextInput
                    label={ messages.IncFilesTemplateSection.bodyInput[lang] }
                    inputType='textarea'
                    name='body'
                    value={fh.fields.body.value[0]}
                    onChange={fh.onChangeFieldHandler}
                    error={fh.fields.body.data.error}
                    disabled={fh.fields.body.data.disabled}
                />
            </Wrapper>
            <Wrapper t={15} align={'right'}>
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

/** Кнопка удаления шаблона подключаемых файлов */
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
            text={messages.IncFilesTemplateSection.deleteSiteBtnText[lang]}
            icon='btnSignTrash'
            onClick={openDeleteTemplateConfirmation}
        />
    )
}
