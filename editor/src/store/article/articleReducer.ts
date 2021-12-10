// import articleManager from 'editor/RightPart-2/articleManager/articleManager'
import StoreArticleTypes from './articleTypes'
import DragFilesTreeType from '../../libs/DragFilesTree/types'
import TempCompTypes from './codeType/tempCompCodeType'
import SiteTemplateTypes from './codeType/siteTemplateCodeType'
// import ArticleTypes from './codeType/articleCodeType'

export type ArticleReducerType = {
    articleId: null | number
    siteId: null | number
    siteTemplateId: null | number
    // Текущие стили сайта
    siteTemplate: null | SiteTemplateTypes.Template
    // Components template folders
    tempCompsFolders: null | DragFilesTreeType.Items
    // Components templates array
    tempComps: null | TempCompTypes.TempComps
    $links: StoreArticleTypes.LinksObj
    // History steps array
    history: StoreArticleTypes.HistoryItems,
    // Current history point
    historyCurrentIdx: number
    // A history step when the article was saved
    // historyStepWhenWasSave: number
}

// Article reducer state example
/*const stateExample: ArticleReducerType = {
    tempComps: [{
        id: 9,
        name: 'Banner',
        code: <TempCompTypes.TempComp>{}
    }],
    siteTemplate: null,
    $links: {
        $window:   window,
        $document: window.document,
        $head:     window.document.head,
        $body:     <HTMLBodyElement>window.document.body
    },
    history: [
        {
            article: <ArticleTypes.Article>{},
            lastId: 32,
            hoveredElem: {
                type: 'element',
                dataCompId: 5,
                dataElemId: 2
            },
            // Selected component/element coordinates
            selectedElem: {
                type: null
                dataCompId: null,
                dataElemId: null
            }
        },
        {...}
    ],
    historyCurrentIdx: 0
    historyStepWhenWasSave: 0
}*/

// Initial values
const initialState: ArticleReducerType = {
    articleId: null,
    siteId: null,
    siteTemplateId: null,
    siteTemplate: null,
    tempCompsFolders: null,
    tempComps: null,
    $links: {
        $window: null,
        $document: null,
        $head: null,
        $body: null
    },
    history: [],
    historyCurrentIdx: 0,
    // historyStepWhenWasSave: 0
}

function clearArticle(
    state: ArticleReducerType, action: StoreArticleTypes.ClearArticleAction
): ArticleReducerType {
    // Do not touch the document's links
    const newState = Object.assign(
        initialState,
        {$links: state.$links}
    )

    return newState
}

// Установка id редактируемой статьи. После редактор загружает все данные.
function setArticleId(
    state: ArticleReducerType, action: StoreArticleTypes.SetArticleIdAction
): ArticleReducerType {
    return {
        ...state,
        articleId: action.payload,
    }
}

// Sets article id and article site id
/*function setArticleMarks(
    state: ArticleReducerType, action: StoreArticleTypes.SetArticleMarksAction
): ArticleReducerType {
    return {
        ...state,
        articleId: action.payload.articleId,
        articleSiteId: action.payload.siteId,
    }
}*/

// Installing of components array
function setTempComps(
    state: ArticleReducerType, action: StoreArticleTypes.SetTempCompAction
): ArticleReducerType {
    return {
        ...state,
        tempComps: action.payload
    }
}

// Installing a site styles
function setSiteTemplate(
    state: ArticleReducerType, action: StoreArticleTypes.SetSiteTemplateAction
): ArticleReducerType {
    return {
        ...state,
        siteTemplate: action.payload
    }
}

// Installing an article code and other things
function setArticle(state: ArticleReducerType, action: StoreArticleTypes.SetArticleAction): ArticleReducerType {
    return {
        ...state,
        siteId: action.payload.siteId,
        siteTemplateId: action.payload.siteTemplateId || null,
        history: [
            {
                article: action.payload.article,
                hoveredElem: action.payload.hoveredElem,
                selectedElem: action.payload.selectedElem,
                moveHoveredElem: action.payload.moveHoveredElem,
                moveSelectedElem: action.payload.moveSelectedElem
            }
        ]
    }
}

// Installing an article code
function setLinks(state: ArticleReducerType, action: StoreArticleTypes.SetLinksAction): ArticleReducerType {
    return {
        ...state,
        $links: action.payload
    }
}

// Set ids for hovered or selected component/element
function setHoveredElement(state: ArticleReducerType, action: StoreArticleTypes.SetHoveredElementAction): ArticleReducerType {
    // Get history array and current article idx
    const { history, historyCurrentIdx } = state
    // Current article
    let article = history[historyCurrentIdx]

    // Hovered/selected/move element coordinates
    const hoveredElem = {
        type: action.payload.type,
        dataCompId: action.payload.dataCompId,
        dataElemId: action.payload.dataElemId
    }

    // Update hovered/selected/move element coordinates in article
    if (action.payload.actionType === 'hover') {
        article = {
            ...article,
            hoveredElem: hoveredElem
        }
    }
    else if (action.payload.actionType === 'select') {
        article = {
            ...article,
            selectedElem: hoveredElem
        }
    }
    else if (action.payload.actionType === 'moveHover') {
        article = {
            ...article,
            moveHoveredElem: hoveredElem
        }
    }
    else if (action.payload.actionType === 'moveSelect') {
        article = {
            ...article,
            moveSelectedElem: hoveredElem
        }
    }

    // Set the new article to history array
    const updatedHistoryArr = [...history]
    updatedHistoryArr[historyCurrentIdx] = article

    return {
        ...state,
        history: updatedHistoryArr
    }
}

// Installing an article code
function setTempCompFolders(state: ArticleReducerType, action: StoreArticleTypes.SetTempCompFoldersAction): ArticleReducerType {
    return {
        ...state,
        tempCompsFolders: action.payload,
    }
}

//
/*function createAndSetHistoryItem(state: ArticleReducerType, action: StoreArticleTypes.CreateAndSetHistoryItemAction): ArticleReducerType {

    const historyArr = createHistoryArr()

    return {
        ...state,
        history: historyArr,
        historyStepWhenWasSave: getSaveStep(),
        historyCurrentIdx: historyArr.length - 1
    }


    function createHistoryArr() {
        const historyArrCopy =  [...state.history]
        historyArrCopy.length = state.historyCurrentIdx + 1
        historyArrCopy.push(
            createHistoryItem()
        )

        return historyArrCopy
    }

    function createHistoryItem() {
        const currentHistoryItem = state.history[state.historyCurrentIdx]

        const historyItem: StoreArticleTypes.HistoryItem = {
            article: createArticle(),
            hoveredElem: currentHistoryItem.hoveredElem,
            selectedElem: currentHistoryItem.selectedElem
        }

        return historyItem
    }

    function createArticle() {
        const newArticle = articleManager.createArticle()
        newArticle.dMeta.dMaxCompId = action.payload.maxCompId
        newArticle.dComps = action.payload.components

        return newArticle
    }

    function getSaveStep() {
        let newHistoryStepWhenWasSave = state.historyStepWhenWasSave
        if (newHistoryStepWhenWasSave > state.history.length) {
            newHistoryStepWhenWasSave = -1
        }

        return newHistoryStepWhenWasSave
    }
}*/

// The function changes a current history step
/*function makeHistoryStep(state: ArticleReducerType, action: StoreArticleTypes.MakeHistoryStepAction): ArticleReducerType {
    let newStep = state.historyCurrentIdx

    if (action.payload === 'undo' && state.historyCurrentIdx - 1 !== -1) {
        newStep--
    }
    else if (action.payload === 'redo' && state.historyCurrentIdx + 1 < state.history.length) {
        newStep++
    }

    return {
        ...state,
        historyCurrentIdx: newStep
    }
}*/

// The function set current historyCurrentIdx value to historyStepWhenWasSave to know what step the article was saved
/*function setHistoryStepWhenArticleWasSaved(state: ArticleReducerType, action: StoreArticleTypes.SetHistoryStepWhenArticleWasSavedAction): ArticleReducerType {
    return {
        ...state,
        historyStepWhenWasSave: state.historyCurrentIdx
    }
}*/


// Редьюсер Store.article
export default function articleReducer(
    state = initialState, action: StoreArticleTypes.ArticleAction
): ArticleReducerType {

    switch (action.type) {
        case StoreArticleTypes.CLEAR_ARTICLE:
            return clearArticle(state, action)
        case StoreArticleTypes.SET_ARTICLE_ID:
            return setArticleId(state, action)
        case StoreArticleTypes.SET_ARTICLE:
            return setArticle(state, action)
        // case StoreArticleTypes.SET_ARTICLE_MARKS:
        //     return setArticleMarks(state, action)
        case StoreArticleTypes.SET_TEMP_COMPS:
            return setTempComps(state, action)
        case StoreArticleTypes.SET_SITE_TEMPLATE:
            return setSiteTemplate(state, action)
        case StoreArticleTypes.SET_LINKS:
            return setLinks(state, action)
        case StoreArticleTypes.SET_HOVERED_ELEMENT:
            return setHoveredElement(state, action)
        case StoreArticleTypes.SET_TEMP_COMP_FOLDERS:
            return setTempCompFolders(state, action)
        // case StoreArticleTypes.CREATE_AND_SET_HISTORY_ITEM:
        //     return createAndSetHistoryItem(state, action)
        // case StoreArticleTypes.MAKE_HISTORY_STEP:
        //     return makeHistoryStep(state, action)
        // case StoreArticleTypes.SET_HISTORY_STEP_WHEN_ARTICLE_WAS_SAVED:
        //     return setHistoryStepWhenArticleWasSaved(state, action)
        default:
            // @ts-ignore
            const x: never = null
            return state
    }
}
