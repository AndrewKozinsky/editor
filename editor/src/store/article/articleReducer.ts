// import articleManager from 'editor/RightPart-2/articleManager/articleManager'
import { act } from 'react-dom/test-utils'
import StoreArticleTypes from './articleTypes'
import DragFilesTreeType from 'libs/DragFilesTree/types'
import TempCompTypes from './codeType/tempCompCodeType'
import SiteTemplateTypes from './codeType/siteTemplateCodeType'
import ArticleTypes from './codeType/articleCodeType'

export type ArticleReducerType = {
    // Статус статьи: clear (данных нет), loading (загрузка данных),
    // prepareData (подготовка данных статьи в соответствии с текущим шаблоном)
    // и readyData (данные готовы для сборки статьи)
    articleId: null | number
    siteId: null | number
    siteTemplateId: null | number
    // Текущие стили сайта
    siteTemplate: null | SiteTemplateTypes.Template
    // Components template folders
    tempCompsFolders: null | DragFilesTreeType.Items
    // Components templates array
    tempComps: null | TempCompTypes.TempComps
    // Данные о последней нажатой клавише
    pressedKey: StoreArticleTypes.PressedKey
    $links: StoreArticleTypes.LinksObj
    // History steps array
    history: StoreArticleTypes.HistoryItems,
    // Current history point
    historyCurrentIdx: number
    // A history step when the article was saved
    // historyStepWhenWasSave: number
    articleDataPrepared: boolean
}

// Article reducer state example
const stateExample: ArticleReducerType = {
    articleId: 2,
    siteId: 10,
    siteTemplateId: 4,
    siteTemplate: null,
    tempCompsFolders: null,
    tempComps: [{
        id: 9,
        content: {
            name: 'Banner',
            html: '<div class="banner" data-em-id="banner"><div><div data-em-id="cell"></div></div></div>'
        }
    }],
    pressedKey: {
        code: null,
        altKey: false,
        ctrlKey: false,
        shiftKey: false
    },
    $links: {
        $window:   window,
        $document: window.document,
        $head:     window.document.head,
        $body:     <HTMLBodyElement>window.document.body
    },
    history: [
        {
            article: <ArticleTypes.Article>{},
            hoveredElem: {
                dataCompId: 1,
                dataElemId: 1
            },
            selectedElem: {
                dataCompId: 1,
                dataElemId: 1
            },
            moveHoveredComp: {
                dataCompId: 1,
            },
            moveSelectedComp: {
                dataCompId: 1,
            },
            selectedTextComp: {
                dataCompId: null,
            },
        },
    ],
    historyCurrentIdx: 0,
    // historyStepWhenWasSave: 0,
    articleDataPrepared: false
}

// Initial values
const initialState: ArticleReducerType = {
    articleId: null,
    siteId: null,
    siteTemplateId: null,
    siteTemplate: null,
    tempCompsFolders: null,
    tempComps: null,
    pressedKey: {
        code: null,
        altKey: false,
        ctrlKey: false,
        shiftKey: false
    },
    $links: {
        $window: null,
        $document: null,
        $head: null,
        $body: null
    },
    history: [],
    historyCurrentIdx: 0,
    // historyStepWhenWasSave: 0,
    articleDataPrepared: false
}

/*function clearArticle(
    state: ArticleReducerType, action: StoreArticleTypes.ClearArticleAction
): ArticleReducerType {
    // Do not touch the document's links
    const newState = Object.assign(
        initialState,
        {$links: state.$links}
    )

    return newState
}*/

// Установка id редактируемой статьи. После редактор загружает все данные.
function setArticleId(
    state: ArticleReducerType, action: StoreArticleTypes.SetArticleIdAction
): ArticleReducerType {
    return {
        ...state,
        articleId: action.payload,
    }
}

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
                hoveredElem: {
                    dataCompId: null,
                    dataElemId: null
                },
                // Selected component/element coordinates
                selectedElem: {
                    dataCompId: null,
                    dataElemId: null
                },
                moveHoveredComp: {
                    dataCompId: null,
                },
                moveSelectedComp: {
                    dataCompId: null,
                },
                selectedTextComp: {
                    dataCompId: null,
                },
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
function setFlashedElement(state: ArticleReducerType, action: StoreArticleTypes.SetFlashedElementAction): ArticleReducerType {
    // Get history array and current article idx
    const { history, historyCurrentIdx } = state
    // Current article
    let article = history[historyCurrentIdx]

    // Hovered/selected element coordinates
    const flashedElem = {
        dataCompId: action.payload.dataCompId,
        dataElemId: action.payload.dataElemId
    }
    const movedComp = {
        dataCompId: action.payload.dataCompId,
    }

    // Update hovered/selected/move element coordinates in article
    if (action.payload.actionType === 'hover') {
        article = {
            ...article,
            hoveredElem: flashedElem
        }
    }
    else if (action.payload.actionType === 'select') {
        article = {
            ...article,
            selectedElem: flashedElem
        }
    }
    else if (action.payload.actionType === 'moveHover') {
        article = {
            ...article,
            moveHoveredComp: movedComp
        }
    }
    else if (action.payload.actionType === 'moveSelect') {
        article = {
            ...article,
            moveSelectedComp: movedComp
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

// The function set current historyCurrentIdx value to historyStepWhenWasSave to know what step the article was saved
function setArticleDataPrepared(state: ArticleReducerType, action: StoreArticleTypes.SetArticleDataPreparedAction): ArticleReducerType {
    return {
        ...state,
        articleDataPrepared: action.payload
    }
}

// Функция устанавливает id выделенного текстового компонента
function setTextCompId(state: ArticleReducerType, action: StoreArticleTypes.SetTextCompIdAction): ArticleReducerType {
    // Get history array and current article idx
    const { history, historyCurrentIdx } = state
    // Current article
    let article = history[historyCurrentIdx]

    // Hovered/selected element coordinates
    const selectedTextComp = {
        ...article.selectedTextComp,
        dataCompId: action.payload,
    }

    article = {
        ...article,
        selectedTextComp
    }

    // Set the new article to history array
    const updatedHistoryArr = [...history]
    updatedHistoryArr[historyCurrentIdx] = article

    return {
        ...state,
        history: updatedHistoryArr
    }
}

// Функция устанавливает id выделенного текстового компонента
function setPressedKey(state: ArticleReducerType, action: StoreArticleTypes.SetPressedKeyAction): ArticleReducerType {
    return {
        ...state,
        pressedKey: action.payload
    }
}

// Функция обновляет текущую статью
function updateCurrentArticle(state: ArticleReducerType, action: StoreArticleTypes.UpdateCurrentArticleAction): ArticleReducerType {
    const { history, historyCurrentIdx } = state

    // Set the new article to history array
    const updatedHistoryArr = [...history]
    updatedHistoryArr[historyCurrentIdx] = action.payload

    return {
        ...state,
        history: updatedHistoryArr
    }
}


// Редьюсер Store.article
export default function articleReducer(
    state = initialState, action: StoreArticleTypes.ArticleAction
): ArticleReducerType {

    switch (action.type) {
        // case StoreArticleTypes.CLEAR_ARTICLE:
        //     return clearArticle(state, action)
        case StoreArticleTypes.SET_ARTICLE_ID:
            return setArticleId(state, action)
        case StoreArticleTypes.SET_ARTICLE:
            return setArticle(state, action)
        case StoreArticleTypes.SET_TEMP_COMPS:
            return setTempComps(state, action)
        case StoreArticleTypes.SET_SITE_TEMPLATE:
            return setSiteTemplate(state, action)
        case StoreArticleTypes.SET_LINKS:
            return setLinks(state, action)
        case StoreArticleTypes.SET_FLASHED_ELEMENT:
            return setFlashedElement(state, action)
        case StoreArticleTypes.SET_TEMP_COMP_FOLDERS:
            return setTempCompFolders(state, action)
        // case StoreArticleTypes.CREATE_AND_SET_HISTORY_ITEM:
        //     return createAndSetHistoryItem(state, action)
        // case StoreArticleTypes.MAKE_HISTORY_STEP:
        //     return makeHistoryStep(state, action)
        // case StoreArticleTypes.SET_HISTORY_STEP_WHEN_ARTICLE_WAS_SAVED:
        //     return setHistoryStepWhenArticleWasSaved(state, action)
        case StoreArticleTypes.SET_ARTICLE_DATA_PREPARED:
            return setArticleDataPrepared(state, action)
        case StoreArticleTypes.SET_PRESSED_KEY:
            return setPressedKey(state, action)
        case StoreArticleTypes.SET_TEXT_COMP_ID:
            return setTextCompId(state, action)
        case StoreArticleTypes.UPDATE_CURRENT_ARTICLE:
            return updateCurrentArticle(state, action)
        default:
            // @ts-ignore
            const x: never = null
            return state
    }
}
