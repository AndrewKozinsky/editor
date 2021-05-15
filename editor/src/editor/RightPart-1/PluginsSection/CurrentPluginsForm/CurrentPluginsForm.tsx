import React from 'react'
import Wrapper from 'common/Wrapper/Wrapper'
import TextInput from 'common/formElements/TextInput/TextInput'
import Hr from 'common/misc/Hr/Hr'
import Form from 'common/formElements/Form/Form'
import {useSelector} from 'react-redux'
import {AppState} from 'store/rootReducer'
import useFormHandler from 'libs/formHandler/useFormHandler'
import getFormConfig from './formResources'
import Button from 'common/formElements/Button/Button'
import messages from '../../messages'
import {useGetAnotherTemplate, useGetDeletePluginVisibilityStatus, useGetSubmitButtonText} from './CurrentPluginsForm-func'
import useGetDeletePlugin from './deletePlugin'

export default function CurrentPluginsForm() {

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // FormHandler
    const fh = useFormHandler(getFormConfig(lang), 'plugin')
    // Изменение данных формы при выделении другого шаблона подключаемых файлов
    useGetAnotherTemplate(fh.formState, fh.setFormState)

    // Текст на кнопке отправки
    const submitButtonText = useGetSubmitButtonText(lang)

    return (
        <Form name='plugin' formHandlers={fh.formHandlers}>
            <Wrapper>
                <TextInput
                    label={ messages.PluginsSection.templateNameInput[lang] }
                    name='name'
                    value={fh.fields.name.value[0]}
                    onChange={fh.onChangeFieldHandler}
                    placeholder={messages.PluginsSection.templateNamePlaceholder[lang]}
                    error={fh.fields.name.data.error}
                    disabled={fh.fields.name.data.disabled}
                />
            </Wrapper>
            <Wrapper t={15}>
                <TextInput
                    label={ messages.PluginsSection.headInput[lang] }
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
                    label={ messages.PluginsSection.bodyInput[lang] }
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
                <DeletePluginButton />
            </Wrapper>
        </Form>
    )
}

/** Кнопка удаления шаблона подключаемых файлов */
function DeletePluginButton() {
    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Хук возвращает функцию открывающую модальное окно с подтверждением удаления шаблона
    const openDeletePluginConfirmation = useGetDeletePlugin()

    // Нужно ли показывать кнопку удаления сайта
    const isDeleteSiteButtonVisible = useGetDeletePluginVisibilityStatus()
    if (!isDeleteSiteButtonVisible) return null

    return (
        <Button
            type='button'
            text={messages.PluginsSection.deleteSiteBtnText[lang]}
            icon='btnSignTrash'
            onClick={openDeletePluginConfirmation}
        />
    )
}