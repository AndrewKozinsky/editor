const JSON5 = require('json5')
import { MiscTypes } from 'types/miscTypes'
import getArticleRequest from 'requests/editor/article/getArticleRequest'
import getSiteComponentsRequest from 'requests/editor/components/getSiteComponentsRequest'
// import getArticleRequest from 'requests/editor/article/getArticleRequest'
import StoreArticleTypes from './articleTypes'
import ArticleTypes, { emptyArticleData } from './codeType/articleCodeType'
// import getSiteTemplateRequest from 'requests/editor/siteTemplate/getSiteTemplateRequest'
// import {getComponentsFoldersRequest} from 'requests/editor/components/getComponentsFoldersRequest'
// import FilesTreeType from 'types/filesTree'
// import articleManager from 'editor/RightPart-2/articleManager/articleManager'
import {
    getFromLocalStorage,
    removeFromLocalStorage, setInLocalStorage
} from 'utils/MiscUtils'
import config from 'utils/config'
// import {CreateCompFnReturnType} from 'editor/RightPart-2/articleManager/insert'


const articleActions = {

    // Очистка статьи
    clearArticle() {
        // Remove editable article id in Local Storage
        removeFromLocalStorage(config.ls.editArticleId)

        return {
            type: StoreArticleTypes.CLEAR_ARTICLE
        }
    },

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
    }

    // Наполнение Хранилища данными для отрисовки статьи
    // fillArticle(
    //     siteId: number,
    //     siteTemplateId: number,
    //     articleId: number
    // ) {
    //     return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {
            // const articleMarksFromLS = getFromLocalStorage(config.ls.article)

            /*if (articleMarksFromLS?.articleId !== articleId) {
                // Save article data to localStorage to know what kind of article the editor has to open next time
                articleManager.supplementArtMarksInLocalStorage({
                    siteId,
                    incFilesId: siteTemplateId,
                    articleId: articleId,
                    openCompFoldersIds: []
                })
            }*/

            // dispatch( articleActions.setArticleMarks(siteId, articleId) )

            // Do request for a site templates components and set it in Store
            // dispatch( articleActions.requestSiteComponents(siteId) )

            // Do request for a site files template and set they in Store
            // dispatch( articleActions.requestIncFilesTemplate(siteId, incFilesTemplateId) )

            // Do request for the article and set it in Store
            // dispatch( articleActions.requestArticle(articleId) )

            // Do request for component templates array and set they in store
            // dispatch( articleActions.requestTempCompsFolders(siteId) )
        // }
    // },

    // Action sets article Id and article site id to the Store
    /*setArticleMarks(siteId: number, articleId: number) {
        return {
            type: StoreArticleTypes.SET_ARTICLE_MARKS,
            payload: { siteId, articleId }
        }
    },*/

    // Загрузка шаблонов компонентов сайта с сервера и установка в Хранилище
    /*requestSiteComponents(siteId: number) {
        return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {

            // Запрос на получение шаблонов компонентов сайта
            const response = await getSiteComponentsRequest(siteId)
            if (response.status !== 'success') return

            // Формированое массива компонентов для установки в Хранилище
            const tempComps: StoreArticleTypes.TempComps = response.data.components.map(
                (compObj: any) => {
                    return {
                        id: compObj.id,
                        name: compObj.name,
                        code: JSON5.parse( compObj.code )
                    }
                }
            )

            // Установка компонентов в Хранилище
            dispatch( articleActions.setTempComps(tempComps) )
        }
    },*/

    // Установка массива шаблонов компонентов
    /*setTempComps(payload: StoreArticleTypes.TempComps): StoreArticleTypes.SetTempCompAction {
        return {
            type: StoreArticleTypes.SET_TEMP_COMPS,
            payload
        }
    },*/

    // Request for included files template and setting it in Store
    /*requestIncFilesTemplate(siteId: number, incFilesTemplateId: string) {
        return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {

            // Request for an incFilesTemplate and get a response from a server
            const response = await getIncFilesTemplateRequest(siteId, incFilesTemplateId)
            if (response.status !== 'success') return

            if (response.data.template) {
                const codeInHead = response.data.template.codeInHead?.code || ''
                const codeBeforeEndBody = response.data.template.codeBeforeEndBody?.code || ''
                // Set code to Store
                dispatch( articleActions.setIncFilesTemplate( codeInHead, codeBeforeEndBody ))
            }
            else {
                // Set code to Store
                dispatch( articleActions.setIncFilesTemplate( '', '' ))
            }
        }
    },*/

    // Setting included files template in Store
    /*setIncFilesTemplate(inHead: string, beforeEndBody: string): StoreArticleTypes.SetIncFilesTemplateAction {
        return {
            type: StoreArticleTypes.SET_SITE_TEMPLATE,
            payload: {
                inHead,
                beforeEndBody
            }
        }
    },*/

    // Загрузка статьи с сервера и установка в Хранилище
    /*requestArticle(articleId: number) {
        return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {

            // Request for an article and response from a server
            const response = await getArticleRequest(articleId)
            if (response.status !== 'success') return

            let articleData = response.data.articles[0]
            if (!articleData) return

            // Convert string to an object
            let parsedArticle: ArticleTypes.Article = JSON5.parse( articleData.content )

            // If parsedArticle is null, then assign empty array to variable to allow work with an article
            if (!parsedArticle) parsedArticle = emptyArticleData

            // Set an article to Store
            dispatch( articleActions.setArticle( parsedArticle ))
        }
    },*/

    // Set an article after receiving the data. Action return history array with single article
    // setArticle(payload: ArticleTypes.Article): StoreArticleTypes.SetArticleAction {
    //     return {
            // type: StoreArticleTypes.SET_ARTICLE,
            // payload: [
                // {
                    // Articles
                    // article: payload,
                    // Hovered component/element coordinates
                    /*hoveredElem: {
                        type: null,
                        dataCompId: null,
                        dataElemId: null
                    },*/
                    // Selected component/element coordinates
                    /*selectedElem: {
                        type: null,
                        dataCompId: null,
                        dataElemId: null
                    }*/
                // }
            // ]
        // }
    // },

    // Request to template component folders and set they in Store
    /*requestTempCompsFolders(articleSiteId: number) {
        return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {

            // Запрос и ответ от сервера
            const response = await getComponentsFoldersRequest(articleSiteId)
            if (response.status !== 'success') return

            const foldersString = response.data.folders.content
            if (!foldersString) return

            // Convert string to an object
            // MAYBE BETTER USE ORDINARY JSON INSTEAD JSON6
            let parsedFolders: FilesTreeType.Items = JSON6.parse( foldersString )

            // Set component template folders in the Store
            dispatch( articleActions.setTempCompFolders(parsedFolders) )
        }
    },*/

    /**
     * Set component template folders is the Store
     * @param {Array} folders — component template folders array
     */
    /*setTempCompFolders( folders: null | FilesTreeType.Items ): StoreArticleTypes.SetTempCompFoldersAction {
        return {
            type: StoreArticleTypes.SET_TEMP_COMP_FOLDERS,
            payload: folders
        }
    },*/

    // Action sets links to IFrame window, document, head and body to Store
    /*setLinks(
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
    },*/

    /**
     * Set ids for hovered or selected component/element
     * @param {String} actionType — is component/element hovered or selected
     * @param {String} type — component/element type: null | 'component' | 'element' | 'textComponent'
     * @param {Number} dataCompId — component id
     * @param {Number} dataElemId — element id (It is null if component/element was hovered)
     */
    /*setHoveredElement(
        actionType: 'hover' | 'select',
        type: StoreArticleTypes.HoveredElementType,
        dataCompId: StoreArticleTypes.HoveredElementCompId,
        dataElemId: StoreArticleTypes.HoveredElementElemId
    ) {
        return {
            type: StoreArticleTypes.SET_HOVERED_ELEMENT,
            payload: { actionType, type, dataCompId, dataElemId }
        }
    },*/

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
}

export default articleActions