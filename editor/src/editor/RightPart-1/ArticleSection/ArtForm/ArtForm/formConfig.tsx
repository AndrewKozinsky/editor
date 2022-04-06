import React from 'react'
import * as yup from 'yup'
import { store } from 'store/rootReducer'
import sitesActions from 'store/site/sitesActions'
import FCType from 'libs/FormConstructor/FCType'
import articleFormMsg from 'messages/articleFormMessages'
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods'
import putArtFolderRequest from 'requests/editor/artFolders/putArtFolderRequest'
import { updateArticleRequest } from 'requests/editor/article/updateArticleRequest'
import bridge from '../../../../../bridge/bridge'
import DeleteArticleButton from '../DeleteArticleButton/DeleteArticleButton'
import { getState } from 'utils/miscUtils'

/** Функция возвращает конфигурацию формы входа в сервис */
const artFormConfig: FCType.Config = {
    fields: {
        name: {
            fieldType: 'text',
            schema: (fields) => {
                return yup.string()
                    .required(articleFormMsg.articleNameRequired)
                    .max(100, articleFormMsg.articleNameIsTooLong)
            },
            fieldData: {
                label: articleFormMsg.articleNameInput,
                autoFocus: true
            }
        },
        siteTemplateId: {
            fieldType: 'select',
            fieldData: {
                label: articleFormMsg.defaultTemplateInput,
                options: [],
            }
        },
    },
    bottom: {
        submit: {
            text: articleFormMsg.submitBtnText,
            icon: 'btnSignSave'
        },
        elems: [<DeleteArticleButton key={2} />],
        hr: true
    },
    async requestFn(readyFieldValues, outerFns, formDetails) {

        // Массив папок и файлов из Хранилища
        const folders = getState().sites.artFolderSection.artFolder

        // id главной папки в базе данных
        const { artFolderId } = getState().sites.artFolderSection

        // id выбранной папки
        const { currentArtItemId } = getState().sites.articleSection

        // Название статьи и id выбранного шаблона сайта
        const articleName = readyFieldValues.name.toString()
        let articleTemplateId = readyFieldValues.siteTemplateId === null
            ? null
            : parseInt(readyFieldValues.siteTemplateId?.toString())


        // Изменить название статьи на введённое и обновить папки в Хранилище
        const { newItems } = filesTreePublicMethods.changeItemName(
            folders, currentArtItemId, articleName
        )
        store.dispatch(sitesActions.setArtFolder({
            folders: newItems
        }))

        // Подготовить массив папок и файлов для сохранения на сервере
        const preparedFolders = filesTreePublicMethods.prepareItemsToSaveInServer(newItems)

        // Сохранить папки на сервере
        await putArtFolderRequest(artFolderId, preparedFolders)

        // Обновить статью на сервере
        return await updateArticleRequest(
            currentArtItemId, {name: articleName, siteTemplateId: articleTemplateId}
        )
    },
    afterSubmit(response, outerFns, formDetails) {
        if (!formDetails.readyFieldValues.siteTemplateId) return
        // Обновить id шаблона сайта у редактируемой статьи если указали другой.
        bridge.updateSiteTemp(
            formDetails.readyFieldValues.siteTemplateId.toString()
        )
    }
}

export default artFormConfig
