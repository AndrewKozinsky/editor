import React from 'react'
import useGetMessages from 'messages/fn/useGetMessages'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
// import { useGetEditArticleBtnHandler } from './ArticleForm-func'
import { articleFormMessages } from 'messages/articleFormMessages'
import getFormConfig from './formConfig'
import {useFillSiteTemplatesSelect, useGetArtDataFromServerAndSetInStore, useSetAnotherFormData } from './ArtForm-func'
import EditArticleSection from '../EditArticleSection/EditArticleSection'

export default function ArtForm() {
    // Сообщения формы
    const articleFormMsg = useGetMessages(articleFormMessages)

    // Объекты конфигурации и состояния формы
    const config = getFormConfig(articleFormMsg)
    const formState = useFormConstructorState(config)

    // Скачать данные статьи с сервера и поставить в Хранилище
    useGetArtDataFromServerAndSetInStore()
    // Хук наполняет выпадающий список шаблона сайта в форме существующими значениями
    useFillSiteTemplatesSelect(formState)
    // Хук изменяет значения полей формы при переключении статей
    useSetAnotherFormData(formState)

    return (
        <>
            <FormConstructor config={config} state={formState} />
            <EditArticleSection />
        </>

    )
}

/*export default function ArticleForm() {
    // FormHandler
    const fh = useFormHandler(getFormConfig(), 'article')

    // Изменение данных формы при выделении другой статьи
    useGetAnotherArticle(fh.formState, fh.setFormState)

    // Можно ли показывать выпадающий список с выбором шаблона подключаемых сайтов и список элементов
    const {isSelectVisible, selectOptions} = useManageTemplatesSelect(fh)

    // Хук возвращает функцию открывающую модальное окно с подтверждением удаления шаблона
    const openDeleteTemplateConfirmation = useGetShowModal(<DeleteItemModal type='article' />)

    // Edit Article button handler
    const onEditArticleBtnHandler = useGetEditArticleBtnHandler()

    return (
        <Form name='article' formHandlers={fh.formHandlers}>
            <Wrapper>
                <TextInput
                    label={articleFormMessages.articleNameInput}
                    name='name'
                    value={fh.fields.name.value[0]}
                    onChange={fh.onChangeFieldHandler}
                    error={fh.fields.name.data.error}
                    disabled={fh.fields.name.data.disabled}
                />
            </Wrapper>
            {isSelectVisible && <Wrapper t={15}>
                <Select
                    label={ articleFormMessages.defaultTemplateInput }
                    name='incFilesTemplateId'
                    value={fh.fields.incFilesTemplateId.value[0]}
                    onChange={fh.onChangeFieldHandler}
                    options={selectOptions}
                />
            </Wrapper>}
            <Wrapper t={15}>
                <Hr />
            </Wrapper>
            <Wrapper t={10} align={'right'} gap={10}>
                <Button
                    type='submit'
                    text={articleFormMessages.submitBtnText}
                    icon='btnSignSave'
                    name='submit'
                    disabled={fh.fields.submit.data.disabled}
                    loading={fh.fields.submit.data.loading}
                />
                <Button
                    type='button'
                    text={articleFormMessages.deleteArticleBtnText}
                    icon='btnSignTrash'
                    onClick={openDeleteTemplateConfirmation}
                />
                <Button
                    type='button'
                    color='accent'
                    text={articleFormMessages.editArticleBtnText}
                    icon='btnSignEdit'
                    onClick={onEditArticleBtnHandler}
                />
            </Wrapper>
        </Form>
    )
}*/
