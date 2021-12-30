import React from 'react'
import FCType from 'libs/FormConstructor/FCType'
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import deleteSiteRequest from 'requests/editor/sites/deleteSiteRequest'
import articleManager from 'articleManager/articleManager'
import { removeFromLocalStorage } from 'src/utils/miscUtils'

/**
 * Функция возвращает конфигурацию кнопки-формы удаления сайта
 * @param {Object} siteSectionMsg — объект с текстами ошибок
 */
export default function getConfig(siteSectionMsg: any) {
    const config: FCType.Config = {
        bottom: {
            submit: {
                text: siteSectionMsg.deleteSiteBtnText,
                color: 'accent'
            },
        },
        async requestFn() {
            const { currentSiteId } = store.getState().sites
            return await deleteSiteRequest(currentSiteId)
        },
        afterSubmit(response, outerFns, formDetails) {
            if (response.status === 'success') {
                afterSuccessSiteDeleting()
            }
        },
    }

    return config
}

/** Функция срабатывающая после удаления сайта */
function afterSuccessSiteDeleting() {
    const deletedSiteId = store.getState().sites.currentSiteId
    const articleSiteId = store.getState().article.siteId

    // Очистить редактируемую статью если удалили сайт, к которому она относится
    if (deletedSiteId === articleSiteId) {
        articleManager.clearArticle()
    }

    // Закрыть модальное окно
    store.dispatch(actions.modal.closeModal())

    // Скачать новый список сайтов и поставить в Хранилище
    store.dispatch(actions.sites.requestSites())

    // Обнулить id выбранного сайта
    store.dispatch(actions.sites.setCurrentSiteId(null))

    // Удалить данные из LocalStorage потому что они относятся к удаляемому сайту
    const siteDataInLS = ['editorComponentType', 'editorArtOpenedFolders', 'editorCompOpenedFolders', 'editorArticleType', 'editorComponentId', 'editorSiteId', 'editorSiteTemplateId']
    siteDataInLS.forEach(function (propName) {
        removeFromLocalStorage(propName)
    })
}