// @ts-ignore
import JSON6 from 'json-6'
import { MiscTypes } from 'types/miscTypes'
import getSiteComponentsRequest from 'requests/editor/components/getSiteComponentsRequest'
import getArticleRequest from 'requests/editor/article/getArticleRequest'
import StoreArticleTypes from './articleTypes'
import ArticleTypes from './codeType/articleCodeType'
import getIncFilesTemplateRequest from 'requests/editor/incFiles/getIncFilesTemplateRequest'
import {setInLocalStorage} from '../../utils/MiscUtils'


const articleActions = {

    // Наполнение Хранилища данными для отрисовки статьи
    fillArticle(siteId: string, incFilesTemplateId: string, articleUuId?: string) {
        return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {
            const articleDataForLS = {
                siteId,
                incFilesId: incFilesTemplateId,
                articleId: articleUuId
            }
            setInLocalStorage('article', articleDataForLS)

            // Do request for a site templates components and set it in Store
            dispatch( articleActions.requestSiteComponents(siteId) )

            // Do request for a site files template and set it in Store
            dispatch( articleActions.requestIncFilesTemplate(siteId, incFilesTemplateId) )

            // Do request for the article and set it in Store
            dispatch( articleActions.requestArticle(articleUuId) )
        }
    },

    // Загрузка шаблонов компонентов сайта с сервера и установка в Хранилище
    requestSiteComponents(siteId: string) {
        return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {

            // Запрос на получение шаблонов компонентов сайта
            const response = await getSiteComponentsRequest(siteId)
            if (response.status !== 'success') return

            // Формированое массива компонентов для установки в Хранилище
            const tempComps: StoreArticleTypes.TempComps = response.data.components.map(
                (compObj: any) => {
                    // debugger
                    return {
                        uuid: compObj.uuid,
                        name: compObj.name,
                        code: JSON6.parse( compObj.code )
                    }
                }
            )

            // Установка компонентов в Хранилище
            dispatch( articleActions.setTempComps(tempComps) )
        }
    },

    // Установка массива шаблонов компонентов
    setTempComps(payload: StoreArticleTypes.TempComps): StoreArticleTypes.SetTempCompAction {
        return {
            type: StoreArticleTypes.SET_TEMP_COMPS,
            payload
        }
    },

    // Request for included files template and setting it in Store
    requestIncFilesTemplate(siteId: string, incFilesTemplateId: string) {
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
    },

    // Setting included files template in Store
    setIncFilesTemplate(inHead: string, beforeEndBody: string): StoreArticleTypes.SetIncFilesTemplateAction {
        return {
            type: StoreArticleTypes.SET_INC_FILES_TEMPLATE,
            payload: {
                inHead,
                beforeEndBody
            }
        }
    },

    // Загрузка шаблонов компонентов сайта с сервера и установка в Хранилище
    requestArticle(articleUuId: string) {
        return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {

            // Request for an article and response from a server
            const response = await getArticleRequest(articleUuId)
            if (response.status !== 'success') return

            let articleData = response.data.article
            if (!articleData) return

            // Convert string to an object
            let parsedArticle: ArticleTypes.Article = JSON6.parse( articleData.code )
            // If parsedArticle is null, then assign empty array to variable to allow work with article
            if (!parsedArticle) parsedArticle = []

            // Set an article to Store
            dispatch( articleActions.setArticle( parsedArticle ))
        }
    },

    // Установка массива шаблонов компонентов
    setArticle(payload: ArticleTypes.Article): StoreArticleTypes.SetArticleAction {
        return {
            type: StoreArticleTypes.SET_ARTICLE,
            payload
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


}

export default articleActions