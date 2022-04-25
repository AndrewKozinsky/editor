import articleManager from 'articleManager/articleManager'
import { store } from 'store/rootReducer'
import articleActions from 'store/article/articleActions'
import DragFilesTreeType from 'libs/DragFilesTree/types'
import { getState } from 'utils/miscUtils'
import fireEvent from '../../event/fireEvent'

/**
 * Функция обновляет хеш версии папок шаблонов компонентов в статье,
 * чтобы запустить скачивание обновлённого списка папок в редактируемой статье.
 * Функция запускается если на вкладке «Сайты» обновили список папок компонентов у сайта,
 * которому принадлежит редактируемая статья.
 */
export function updateTempCompFolders() {
    // id сайта у редактируемой статьи
    const editedArtSiteId = getState().article.siteId
    // id сайта
    const { currentSiteId } = getState().sites

    if (editedArtSiteId === currentSiteId) {
        // ...то изменить хеш списка папок компонентов чтобы хук загрузил новый список папок
        store.dispatch(articleActions.changeTempCompsFoldersVersionHash())
    }
}

/**
 * Функция обновляет хеш версии шаблонов компонентов в статье,
 * чтобы запустить скачивание обновлённого списка шаблонов компонентов в редактируемой статье.
 * Функция запускается если на вкладке «Сайты» обновили шаблон компонента у сайта,
 * которому принадлежит редактируемая статья.
 */
export function updateTempComps() {
    // id сайта у редактируемой статьи
    const editedArtSiteId = getState().article.siteId
    // id сайта
    const { currentSiteId } = getState().sites

    if (editedArtSiteId === currentSiteId) {
        // ...то изменить хеш списка папок компонентов чтобы хук загрузил новый список папок
        store.dispatch(articleActions.changeTempCompsVersionHash())
    }
}

/**
 * Функция вычисляет id редактируемой статьи и сравнивает его с переданным someArtId
 * Если они совпадают, то редактируемая статья будет очищена
 * @param {number} someArtId — id удаляемой статьи
 */
export function clearEditableArticle(someArtId: DragFilesTreeType.FileItemId) {
    const editArticleId = getState().article.articleId

    if (editArticleId == someArtId) {
        // Закрыть статью
        fireEvent({event: 'closeArticle'})
    }
}

/**
 *
 * @param {string} newSiteTemplateId
 */
export function updateSiteTemp(newSiteTemplateId: string) {
    // Получение id статьи и шаблона сайта в редактируемой статье
    const editArtId = getState().article.articleId
    const editArtSiteTempId = getState().article.siteTemplateId

    // Получение id статьи и шаблона сайта в форме, которая только что была отправлена
    const artIdInSiteSection = getState().sites.articleSection.currentArtItemId
    const siteTempIdInSiteSection = parseInt(newSiteTemplateId)

    // Если изменили id шаблона сайта через отправленную форму и он отличается от того, который указан в редактируемой статье...
    if (editArtId === artIdInSiteSection && editArtSiteTempId !== siteTempIdInSiteSection) {
        // ... то обновить версию шаблона сайта чтобы хук скачал новую версию шаблона и поставил в <head> и <body>
        store.dispatch(articleActions.changeSiteTemplateId(siteTempIdInSiteSection))
    }
}
