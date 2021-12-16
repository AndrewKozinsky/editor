// import { store } from '../rootReducer'
const JSON5 = require('json5')
import TempCompTypes from './codeType/tempCompCodeType'
import { MiscTypes } from 'types/miscTypes'
import getArticleRequest from 'requests/editor/article/getArticleRequest'
import getSiteComponentsRequest from 'requests/editor/components/getSiteComponentsRequest'
import StoreArticleTypes from './articleTypes'
import ArticleTypes, { emptyArticleData } from './codeType/articleCodeType'
import getSiteTemplateRequest from 'requests/editor/siteTemplate/getSiteTemplateRequest'
// import articleManager from 'editor/RightPart-2/articleManager/articleManager'
import { removeFromLocalStorage, setInLocalStorage } from 'utils/MiscUtils'
import config from 'utils/config'
import { ArticleType } from 'requests/editor/article/articleServerResponseType'
import { getCompFolderRequest } from 'requests/editor/compFolders/getCompFolderRequest'
import DragFilesTreeType from 'libs/DragFilesTree/types'
import SiteTemplateTypes from './codeType/siteTemplateCodeType'
import actions from '../rootAction'
// import { CreateCompFnReturnType } from 'editor/RightPart-2/articleManager/insert'


const articleActions = {

    // Очистка статьи
    /*clearArticle() {
        // Remove editable article id in Local Storage
        removeFromLocalStorage(config.ls.editArticleId)

        return {
            type: StoreArticleTypes.CLEAR_ARTICLE
        }
    },*/

    /**
     * Установка id редактируемой статьи. После редактор загружает все данные.
     * @param {Number} articleId — id статьи
     */
    setArticleId(articleId: number): StoreArticleTypes.SetArticleIdAction {
        // Set editable article id in Local Storage
        setInLocalStorage(config.ls.editArticleId, articleId)

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

            // Request for an article and response from a server
            const response = await getArticleRequest(articleId)
            if (response.status !== 'success') return

            if (response.status === 'success') {
                let articleData = response.data.articles[0]
                dispatch( articleActions.setArticle( articleData ))
            }
        }
    },

    // Set an article after receiving the data. Action return history array with single article
    setArticle(articleFullData: ArticleType<ArticleTypes.Article>): StoreArticleTypes.SetArticleAction {
        return {
            type: StoreArticleTypes.SET_ARTICLE,
            payload: {
                // Article
                article: articleFullData.content,
                siteId: articleFullData.siteId,
                siteTemplateId: articleFullData.siteTemplateId
            }
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

    // Request for included files template and setting it in Store
    requestSiteTemplate(siteTemplateId: number) {
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

    // Setting included files template in Store
    setSiteTemplate(siteTemplate: SiteTemplateTypes.Template): StoreArticleTypes.SetSiteTemplateAction {
        return {
            type: StoreArticleTypes.SET_SITE_TEMPLATE,
            payload: siteTemplate
        }
    },


    // Request to template component folders and set they in Store
    requestTempCompsFolders(siteId: number) {
        return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {
            if (!siteId) return

            // Запрос и ответ от сервера
            const response = await getCompFolderRequest(siteId)
            if (response.status !== 'success') return

            const foldersObj = response.data.compFolders[0].content
            if (!foldersObj) return

            // Set component template folders in the Store
            dispatch( articleActions.setTempCompFolders(foldersObj) )
        }
    },
    /**
     * Set component template folders is the Store
     * @param {Array} folders — component template folders array
     */
    setTempCompFolders( folders: null | DragFilesTreeType.Items ): StoreArticleTypes.SetTempCompFoldersAction {
        return {
            type: StoreArticleTypes.SET_TEMP_COMP_FOLDERS,
            payload: folders
        }
    },

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

    /**
     * Экшен ставит данные для установки подсвечивающихся прямоугольников.
     * Но кроме этого в зависимости от переданных данных корректирует видимость подсвечивающихся прямоугольников.
     * Например если элемент подсвечен выделяющим прямоугольником, то при наведении мыши около него
     * не будет отрисовываться прямоугольник при наведении и так далее.
     * @param {String} actionType — тип действия
     * @param {Number} dataCompId — id компонента
     * @param {Number} dataElemId — id элемента
     */
    setFlashRectangles(
        actionType: StoreArticleTypes.FlashedElemType,
        dataCompId: StoreArticleTypes.FlashedElemId,
        dataElemId: StoreArticleTypes.FlashedElemId
    ) {
        return function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {
            const { history, historyCurrentIdx} = getState().article
            const currentArticle = history[historyCurrentIdx]

            // Если на элемент навели мышью...
            if (actionType === 'hover') {
                // Если навели на элемент, но он уже выделен...
                if (currentArticle.selectedElem.dataCompId === dataCompId && currentArticle.selectedElem.dataElemId === dataElemId) {
                    // Спрятать наводящую рамку
                    dispatch( actions.article.setFlashedElement(
                        'hover', null, null
                    ))
                }
                // В противном случае выделить элемент наводящей рамкой...
                else {
                    dispatch( actions.article.setFlashedElement(
                        'hover', dataCompId, dataElemId
                    ))
                }

                // Спрятать рамку вокруг наведённого компонента для перемещения
                dispatch( actions.article.setFlashedElement(
                    'moveHover', null, null
                ))
            }
            // Если элемент выделили...
            else if (actionType === 'select') {
                dispatch( actions.article.setFlashedElement(
                    'select', dataCompId, dataElemId
                ))
            }
            // Если на компонент навели мышью для перемещения...
            else if (actionType === 'moveHover') {
                // Если навели на элемент, но он уже выделен...
                if (currentArticle.moveSelectedComp.dataCompId === dataCompId) {
                    // Спрятать наводящую рамку
                    dispatch( actions.article.setFlashedElement(
                        'moveHover', null, null
                    ))
                }
                // Выделить элемент наводящей рамкой...
                else {
                    dispatch( actions.article.setFlashedElement(
                        'moveHover', dataCompId, dataElemId
                    ))
                }

                // Спрятать рамку вокруг наведённого элемента
                dispatch( actions.article.setFlashedElement(
                    'hover', null, null
                ))
            }
            // Если компонент выделили для перемещения...
            else if (actionType === 'moveSelect') {
                dispatch( actions.article.setFlashedElement(
                    'moveSelect', dataCompId, null
                ))

                // Если на этом элементе есть рамка наведения...
                if (currentArticle.moveHoveredComp.dataCompId === dataCompId) {
                    // Спрятать наводящую рамку
                    dispatch( actions.article.setFlashedElement(
                        'moveHover', null, null
                    ))
                }
            }
        }
    },

    /**
     * Set ids for hovered or selected or moved component/element
     * @param {String} actionType — is component/element hovered or selected
     * @param {Number} dataCompId — component id
     * @param {Number} dataElemId — element id (It is null if component/element was hovered)
     */
    setFlashedElement(
        actionType: 'hover' | 'select' | 'moveHover' | 'moveSelect',
        dataCompId: StoreArticleTypes.FlashedElemId,
        dataElemId: StoreArticleTypes.FlashedElemId
    ) {
        return {
            type: StoreArticleTypes.SET_FLASHED_ELEMENT,
            payload: { actionType, dataCompId, dataElemId }
        }
    },

    /**
     * Action forms a new history item
     * @param {Object} itemDetails —
     */
    /*createAndSetHistoryItem( itemDetails: CreateCompFnReturnType ) {
        return {
            type: StoreArticleTypes.CREATE_AND_SET_HISTORY_ITEM,
            payload: itemDetails
        }
    },*/

    /**
     * Action changes a current history step
     * @param {String} step — step direction: undo OR redo
     */
    /*makeHistoryStep( step: 'undo' | 'redo' ) {
        return {
            type: StoreArticleTypes.MAKE_HISTORY_STEP,
            payload: step
        }
    },*/

    /** Action set current historyCurrentIdx value to historyStepWhenWasSave to know what step the article was saved */
    /*setHistoryStepWhenArticleWasSaved() {
        return {
            type: StoreArticleTypes.SET_HISTORY_STEP_WHEN_ARTICLE_WAS_SAVED
        }
    },*/

    /**
     * Установка id редактируемой статьи. После редактор загружает все данные.
     * @param {Number} isPrepared — подготовлены ли данные статьи для соединения с шаблонами
     */
    setArticleDataPrepared(isPrepared: boolean): StoreArticleTypes.SetArticleDataPreparedAction {
        return {
            type: StoreArticleTypes.SET_ARTICLE_DATA_PREPARED,
            payload: isPrepared
        }
    },
}

export default articleActions