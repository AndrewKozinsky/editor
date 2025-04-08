const JSON5 = require('json5')
import articleManager from '../../articleManager/articleManager'
import MetaType from 'editor/RightPart-1/ArticleSection/ArtForm/Meta/MetaType'
import TempCompTypes from './codeType/tempCompCodeType'
import { MiscTypes } from 'types/miscTypes'
import getArticleRequest from 'requests/editor/article/getArticleRequest'
import { ArticleType } from 'requests/editor/article/articleServerResponseType'
import getSiteComponentsRequest from 'requests/editor/components/getSiteComponentsRequest'
import StoreArticleTypes from './articleTypes'
import ArticleTypes from './codeType/articleCodeType'
import getSiteTemplateRequest from 'requests/editor/siteTemplate/getSiteTemplateRequest'
import { getCompFolderRequest } from 'requests/editor/compFolders/getCompFolderRequest'
import SiteTemplateTypes from './codeType/siteTemplateCodeType'
import { isCursorInTheSameElem } from './article-func'
import TempCompsTreeType from 'editor/LeftPart-2/TempComps/TempCompsTree/types'
import StoreSitesTypes from '../site/sitesTypes'
import localStorageProxyActions from '../localStorageProxy/localStorageProxyActions'
import fireEvent from '../../event/fireEvent'


const articleActions = {
    // Action sets links to IFrame window, document, head and body to Store
    setLinks(
        $window: StoreArticleTypes.WindowLink,
        $document: StoreArticleTypes.DocumentLink,
        $head: StoreArticleTypes.HeadLink,
        $body: StoreArticleTypes.BodyLink
    ): StoreArticleTypes.SetLinksAction {
        return {
            type: StoreArticleTypes.SET_LINKS,
            payload: {
                $window,
                $document,
                $head,
                $body
            }
        }
    },

    // Установка id редактируемой статьи (обёрточный экшен)
    setArticleIdOuter(articleId: null | number) {
        return function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {
            // Поставить id выбранной главной вкладки в Store.localStorageProxy чтобы это сохранилось в LocalStorage
            dispatch( localStorageProxyActions.setEdit({propName: 'articleId', propValue: articleId }))
            dispatch( articleActions.setArticleId( articleId ))
        }
    },

    /**
     * Установка id редактируемой статьи. После редактор загружает все данные.
     * @param {Number} articleId — id статьи
     */
    setArticleId(articleId: null | number): StoreArticleTypes.SetArticleIdAction {
        return {
            type: StoreArticleTypes.SET_ARTICLE_ID,
            payload: articleId
        }
    },

    /**
     * Загрузка статьи с сервера и установка в Хранилище
     * @param {Number} articleId — id статьи
     */
    requestArticle(articleId: number) {
        return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {
            if (!articleId) return

            // Request for an article and response from a server
            const response = await getArticleRequest(articleId)

            if (response.status !== 'success' || !response.data.articles[0]) {
                // Закрыть статью
                fireEvent({event: 'closeArticle'})
                return
            }

            if (response.status === 'success') {
                let articleData = response.data.articles[0]
                dispatch( articleActions.setArticle( articleData ))
            }
        }
    },

    // Set an article after receiving the data. Action return history array with single article
    setArticle(articleFullData: ArticleType<ArticleTypes.Article, null | MetaType.Items>): StoreArticleTypes.SetArticleAction {
        return {
            type: StoreArticleTypes.SET_ARTICLE,
            payload: {
                // Article
                article: articleFullData.content,
                name: articleFullData.name,
                siteId: articleFullData.siteId,
                siteTemplateId: articleFullData.siteTemplateId
            }
        }
    },

    changeSiteTemplateId(siteTemplateId: number): StoreArticleTypes.ChangeSiteTemplateIdAction {
        return {
            type: StoreArticleTypes.CHANGE_SITE_TEMPLATE_ID,
            payload: siteTemplateId
        }
    },

    // Увеличение хеша версии шаблона сайта.
    // После этого хук запустит скачивание нового шаблона сайта.
    // Затем удалит старые стили/сценарии и поставит новые.
    changeSiteTemplateVersionHash(): StoreArticleTypes.ChangeSiteTemplateVersionHashAction {
        return {
            type: StoreArticleTypes.CHANGE_SITE_TEMPLATE_VERSION_HASH,
        }
    },

    // Request for included files template and setting it in Store
    requestSiteTemplate(siteTemplateId: StoreSitesTypes.CurrentSiteTemplateId) {
        return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {
            if (!siteTemplateId) return

            // Request for an siteTemplate and get a response from a server
            const response = await getSiteTemplateRequest(siteTemplateId)
            if (response.status !== 'success') return

            dispatch( articleActions.setSiteTemplate(
                JSON5.parse(response.data.siteTemplates[0].content)
            ))
        }
    },

    // Установка в Хранилище шаблона сайта редактируемой статьи
    setSiteTemplate(siteTemplate: SiteTemplateTypes.Template): StoreArticleTypes.SetSiteTemplateAction {
        return {
            type: StoreArticleTypes.SET_SITE_TEMPLATE,
            payload: siteTemplate
        }
    },

    // Увеличение хеша версии папок шаблонов компонентов. После редактор загрузит их и поставить в Хранилище.
    changeTempCompsFoldersVersionHash(): StoreArticleTypes.ChangeTempCompsFoldersVersionHashAction {
        return {
            type: StoreArticleTypes.CHANGE_TEMP_COMPS_FOLDERS_VERSION_HASH,
        }
    },

    // Увеличение хеша версии шаблонов компонентов. После редактор загрузит их и поставит в Хранилище.
    changeTempCompsVersionHash(): StoreArticleTypes.ChangeTempCompsVersionHashAction {
        return {
            type: StoreArticleTypes.CHANGE_TEMP_COMPS_VERSION_HASH,
        }
    },

    /**
     * Request to template component folders and set they in Store
     * @param {number} siteId — id сайта к которому принадлежат папки с шаблонами компонентов
     */
    requestTempCompsFolders(siteId: number) {
        return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {
            if (!siteId) return

            // Запрос и ответ от сервера
            const response = await getCompFolderRequest(siteId)
            if (response.status !== 'success') return

            const foldersObj = response.data.compFolders[0].content || []

            // Set component template folders in the Store
            dispatch( articleActions.setTempCompFolders(foldersObj) )
        }
    },

    /**
     * Set component template folders is the Store
     * @param {Array} folders — component template folders array
     */
    setTempCompFolders( folders: null | TempCompsTreeType.Items ): StoreArticleTypes.SetTempCompFoldersAction {
        return {
            type: StoreArticleTypes.SET_TEMP_COMP_FOLDERS,
            payload: folders
        }
    },

    // Загрузка шаблонов компонентов сайта с сервера и установка в Хранилище
    requestSiteComponents(siteId: number) {
        return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {

            // Запрос на получение шаблонов компонентов сайта
            const response = await getSiteComponentsRequest(siteId)
            if (response.status !== 'success') return

            // Формирование массива компонентов для установки в Хранилище
            const tempComps: TempCompTypes.TempComps = response.data.components.map(
                function(compObj) {
                    const parsedContent: TempCompTypes.Content = JSON5.parse(compObj.content)

                    return {
                        id: compObj.id,
                        content: parsedContent
                    }
                }
            )

            // Установка компонентов в Хранилище
            dispatch( articleActions.setTempComps(tempComps) )
        }
    },

    // Установка массива шаблонов компонентов
    setTempComps(payload: TempCompTypes.TempComps): StoreArticleTypes.SetTempCompAction {
        return {
            type: StoreArticleTypes.SET_TEMP_COMPS,
            payload
        }
    },

    /**
     * Экшен ставит данные для установки подсвечивающихся прямоугольников.
     * Но кроме этого в зависимости от переданных данных корректирует видимость подсвечивающихся прямоугольников.
     * Например, если элемент подсвечен выделяющим прямоугольником, то при наведении мыши около него
     * не будет отрисовываться прямоугольник при наведении и так далее.
     * @param {String} actionType — тип действия
     * @param {String} tagType —
     * @param {Number} dataCompId — id компонента
     * @param {Number} dataElemId — id элемента
     */
    setFlashRectangles(
        actionType: StoreArticleTypes.FlashedElemType,
        tagType: StoreArticleTypes.FlashedTagType,
        dataCompId: StoreArticleTypes.FlashedElemId,
        dataElemId: StoreArticleTypes.FlashedElemId
    ) {
        return function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {
            const { history, historyCurrentIdx} = getState().article
            const currentArticle = history[historyCurrentIdx]

            // Ничего не делать если нет статьи или курсор мыши находится на уже подсвеченном элементе
            if (
                !currentArticle ||
                isCursorInTheSameElem(actionType, dataCompId, dataElemId, currentArticle)
            ) return

            // Если на элемент навели мышью...
            if (actionType === 'hover') {
                // Если навели на элемент, но он уже выделен...
                if (
                    currentArticle.selectedElem.dataCompId && currentArticle.selectedElem.dataCompId === dataCompId &&
                    currentArticle.selectedElem.dataElemId === dataElemId ||
                    currentArticle.moveSelectedComp.dataCompId === dataCompId &&
                    currentArticle.moveSelectedComp.dataElemId === dataElemId
                ) {
                    // Спрятать наводящую рамку
                    dispatch( articleActions.setFlashedElement(
                        'hover', tagType, null, null
                    ))
                }
                // В противном случае выделить элемент наводящей рамкой...
                else {
                    dispatch( articleActions.setFlashedElement(
                        'hover', tagType, dataCompId, dataElemId
                    ))
                }

                // Спрятать рамку вокруг наведённого компонента для перемещения
                dispatch( articleActions.setFlashedElement(
                    'moveHover', null, null, null
                ))
            }
            // Если элемент выделили...
            else if (actionType === 'select') {
                dispatch( articleActions.setFlashedElement(
                    'select', tagType, dataCompId, dataElemId
                ))

                if (currentArticle.hoveredElem.dataCompId === dataCompId) {
                    dispatch( articleActions.setFlashedElement(
                        'hover', null, null, null
                    ))
                }

                // Если выделили компонент выделенный для перемещения, то очистить выделение для перемещения
                if (currentArticle.moveSelectedComp.dataCompId === dataCompId && !dataElemId) {
                    dispatch( articleActions.setFlashedElement(
                        'moveSelect', null, null, null
                    ))
                }
            }
            // Если на компонент навели мышью для перемещения...
            else if (actionType === 'moveHover') {
                // Если навели на элемент, но он уже выделен...
                if (currentArticle.moveSelectedComp.dataCompId === dataCompId) {
                    // Спрятать наводящую рамку
                    dispatch( articleActions.setFlashedElement(
                        'moveHover', tagType, null, null
                    ))
                }
                // Выделить элемент наводящей рамкой...
                else {
                    dispatch( articleActions.setFlashedElement(
                        'moveHover', tagType, dataCompId, dataElemId
                    ))
                }

                // Спрятать рамку вокруг наведённого элемента
                dispatch( articleActions.setFlashedElement(
                    'hover', tagType, null, null
                ))
            }
            // Если компонент выделили для перемещения...
            else if (actionType === 'moveSelect') {
                dispatch( articleActions.setFlashedElement(
                    'moveSelect', tagType, dataCompId, dataElemId
                ))

                // Если выделен элемент, который выделили для перемещения, то убрать выделение
                if (
                    currentArticle.selectedElem.dataCompId === dataCompId &&
                    currentArticle.selectedElem.dataElemId === dataElemId
                ) {
                    dispatch( articleActions.setFlashedElement(
                        'select', null, null, null
                    ))
                }

                // Если на этом элементе есть рамка наведения...
                if (currentArticle.moveHoveredComp.dataCompId === dataCompId) {
                    // Спрятать рамку вокруг элемента наведённого для перемещения
                    dispatch( articleActions.setFlashedElement(
                        'moveHover', tagType, null, null
                    ))
                }
            }
        }
    },

    /**
     * Set ids for hovered or selected or moved component/element
     * @param {String} actionType — is component/element hovered or selected
     * @param {String} tagType — тип выделенного элемента
     * @param {Number} dataCompId — component id
     * @param {Number} dataElemId — element id (It is null if component/element was hovered)
     */
    setFlashedElement(
        actionType: 'hover' | 'select' | 'moveHover' | 'moveSelect',
        tagType: StoreArticleTypes.FlashedTagType,
        dataCompId?: StoreArticleTypes.FlashedElemId,
        dataElemId?: StoreArticleTypes.FlashedElemId
    ) {
        return {
            type: StoreArticleTypes.SET_FLASHED_ELEMENT,
            payload: { actionType, tagType, dataCompId, dataElemId }
        }
    },

    /**
     * Action forms a new history item
     * @param {Object} itemDetails — данные для вставки нового элемента в массив статей
     */
    createAndSetHistoryItem( itemDetails: StoreArticleTypes.CreateNewHistoryItem ) {
        return {
            type: StoreArticleTypes.CREATE_AND_SET_HISTORY_ITEM,
            payload: itemDetails
        }
    },

    /**
     * Замена последнего объекта истории на переданный
     * @param {Object} itemDetails — данные для обновления текущего элемента в массиве статей
     * @param {Boolean} setIsArticleSaved — булево значение сообщающее нужно ли поставить флаг, что статья считается сохраненной после этих исправлений.
     */
    updateCurrentHistoryItem( itemDetails: StoreArticleTypes.CreateNewHistoryItem, setIsArticleSaved: boolean ) {
        return {
            type: StoreArticleTypes.UPDATE_CURRENT_HISTORY_ITEM,
            payload: {
                itemDetails,
                setIsArticleSaved
            }
        }
    },

    /**
     * Action changes a current history step
     * @param {String} step — step direction: undo OR redo
     */
    makeHistoryStep( step: 'undo' | 'redo' ) {
        return {
            type: StoreArticleTypes.MAKE_HISTORY_STEP,
            payload: step
        }
    },

    /** Экшен ставит флаг isArticleSaved в true чтобы зафиксировать, что на данном этапе статья считается сохранённой */
    setArticleIsSaved() {
        return {
            type: StoreArticleTypes.SET_ARTICLE_IS_SAVED
        }
    },

    // Очистка статьи
    clearArticle() {
        return {
            type: StoreArticleTypes.CLEAR_ARTICLE
        }
    },

    /* Экшен ставит значение флага скорректированы ли данные статьи (чтобы данные соответствовали шаблонам) */
    setIsArtDataCorrect(isCorrect: boolean) {
        return {
            type: StoreArticleTypes.SET_IS_ART_DATA_CORRECT,
            payload: isCorrect
        }
    },
}

export default articleActions