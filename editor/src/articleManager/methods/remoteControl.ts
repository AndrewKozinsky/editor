import actions from 'store/rootAction'
import { store } from 'store/rootReducer'

const remoteControl = {
    updateSiteTemp: updateSiteTemp,
    updateTempCompFolders: updateTempCompFolders,
    updateTempComps: updateTempComps
}

export default remoteControl

/**
 *
 * @param {string} newSiteTemplateId
 */
function updateSiteTemp(newSiteTemplateId: string) {
    // Получение id статьи и шаблона сайта в редактируемой статье
    const editArtId = store.getState().article.articleId
    const editArtSiteTempId = store.getState().article.siteTemplateId

    // Получение id статьи и шаблона сайта в форме, которая только что была отправлена
    const artIdInSiteSection = store.getState().sites.articleSection.currentArtItemId
    const siteTempIdInSiteSection = parseInt(newSiteTemplateId)

    // Если изменили id шаблона сайта через отправленную форму и он отличается от того, который указан в редактируемой статье...
    if (editArtId === artIdInSiteSection && editArtSiteTempId !== siteTempIdInSiteSection) {
        // ... то обновить версию шаблона сайта чтобы хук скачал новую версию шаблона и поставил в <head> и <body>
        store.dispatch(actions.article.changeSiteTemplateId(siteTempIdInSiteSection))
    }
}


/**
 * Функция обновляет хеш версии папок шаблонов компонентов в статье,
 * чтобы запустить скачивание обновлённого списка папок в редактируемой статье.
 * Функция запускается если на вкладке «Сайты» обновили список папок компонентов у сайта,
 * которому принадлежит редактируемая статья.
 */
function updateTempCompFolders() {
    // id сайта у редактируемой статьи
    const editedArtSiteId = store.getState().article.siteId
    // id сайта
    const { currentSiteId } = store.getState().sites

    if (editedArtSiteId === currentSiteId) {
        // ...то изменить хеш списка папок компонентов чтобы хук загрузил новый список папок
        store.dispatch(actions.article.changeTempCompsFoldersVersionHash())
    }
}

/**
 * Функция обновляет хеш версии шаблонов компонентов в статье,
 * чтобы запустить скачивание обновлённого списка шаблонов компонентов в редактируемой статье.
 * Функция запускается если на вкладке «Сайты» обновили шаблон компонента у сайта,
 * которому принадлежит редактируемая статья.
 */
function updateTempComps() {
    // id сайта у редактируемой статьи
    const editedArtSiteId = store.getState().article.siteId
    // id сайта
    const { currentSiteId } = store.getState().sites

    if (editedArtSiteId === currentSiteId) {
        // ...то изменить хеш списка папок компонентов чтобы хук загрузил новый список папок
        store.dispatch(actions.article.changeTempCompsVersionHash())
    }
}