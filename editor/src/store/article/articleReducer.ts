import TempCompTypes from './codeType/tempCompCodeType'
import SiteTemplateTypes from './codeType/siteTemplateCodeType'
import ArticleTypes from './codeType/articleCodeType'
import TempCompFilesTreeType from 'editor/LeftPart-2/TempCompFilesTree/types'
import articleManager from 'articleManager/articleManager'
import StoreArticleTypes from './articleTypes'

export type ArticleReducerType = {
    articleId: null | number
    siteId: null | number

    // id шаблона сайта
    siteTemplateId: null | TempCompTypes.Id
    // Шаблон сайта
    siteTemplate: null | SiteTemplateTypes.Template
    // Хеш версии шаблона сайта. При изменении значения шаблон сайта будет заново скачан.
    // Если ноль, то шаблоны сайта нужно стереть из IFrame-а.
    siteTemplateVersionHash: number
    // Хеш загружен ли шаблон сайта. После загрузки это значение увеличивается и хук
    // заново поставит шаблон сайта в IFrame.
    siteTemplateDownloadHash: number

    // Components template folders
    tempCompsFolders: null | TempCompFilesTreeType.Items
    tempCompsFoldersVersionHash: number
    // Components templates array
    tempComps: null | TempCompTypes.TempComps
    // Хеш загруженных компонентов. Если на вкладке сайты/шаблоны будет изменён шаблон какого-то компонента,
    // который есть в статье, то запускается экшен скачивания всего набора компонентов (ну или одного)
    // После скачивания увеличивается значение tempCompsHash. Это сигнал для сценария корректировки данных статьи
    // скорректировать данные чтобы не было конфликтов.
    tempCompsVersionHash: number
    // Хеш загружены ли шаблоны компонентов. После загрузки это значение увеличивается чтобы хук
    // корректировки данных статьи знал когда можно приводить код шаблонов и данных статьи к одному формату
    tempCompsDownloadHash: number

    // Данные по тексту и координатам текстового курсора в текстовом компоненте
    focusTextProof: StoreArticleTypes.FocusTextProof

    // Ссылки на window, document IFrame-а
    $links: StoreArticleTypes.LinksObj

    // History steps array
    history: StoreArticleTypes.HistoryItems,
    // Current history point
    historyCurrentIdx: number
    // A history step when the article was saved
    historyStepWhenWasSave: number
}

// Article reducer state example
const stateExample: ArticleReducerType = {
    articleId: 2,
    siteId: 10,

    siteTemplateId: 4,
    siteTemplate: null,
    siteTemplateVersionHash: 0,
    siteTemplateDownloadHash: 0,

    tempCompsFolders: null,
    tempCompsFoldersVersionHash: 0,
    tempComps: [{
        id: 9,
        content: {
            html: '<div class="banner" data-em-id="banner"><div><div data-em-id="cell"></div></div></div>'
        }
    }],
    tempCompsVersionHash: 0,
    tempCompsDownloadHash: 0,

    focusTextProof: {
        text: null,
        cursorStart: null,
        cursorEnd: null
    },

    $links: {
        $window:   window,
        $document: window.document,
        $head:     window.document.head,
        $body:     <HTMLBodyElement>window.document.body
    },

    // History steps array
    history: [
        {
            article: <ArticleTypes.Article>{},
            hoveredElem: {
                tagType: null,
                dataCompId: 1,
                dataElemId: 1
            },
            selectedElem: {
                tagType: null,
                dataCompId: 1,
                dataElemId: 1
            },
            moveHoveredComp: {
                tagType: null,
                dataCompId: 1,
                dataElemId: 1
            },
            moveSelectedComp: {
                tagType: null,
                dataCompId: 1,
                dataElemId: 1
            },
        },
    ],
    // Current history point
    historyCurrentIdx: 0,
    // A history step when the article was saved
    historyStepWhenWasSave: 0,
}

// Initial values
const initialState: ArticleReducerType = {
    articleId: null,
    siteId: null,

    siteTemplateId: null,
    siteTemplate: null,
    siteTemplateVersionHash: 0,
    siteTemplateDownloadHash: 0,

    tempCompsFolders: null,
    tempCompsFoldersVersionHash: 0,
    tempComps: [],
    tempCompsVersionHash: 0,
    tempCompsDownloadHash: 0,

    focusTextProof: {
        text: null,
        cursorStart: null,
        cursorEnd: null
    },

    $links: {
        $window: null,
        $document: null,
        $head: null,
        $body: null
    },

    history: [],
    // Current history point
    historyCurrentIdx: 0,
    // A history step when the article was saved
    historyStepWhenWasSave: 0,
}

/** Установка ссылок на элементы IFrame-а. */
function setLinks(state: ArticleReducerType, action: StoreArticleTypes.SetLinksAction): ArticleReducerType {
    return {
        ...state,
        $links: action.payload
    }
}

/** Установка id редактируемой статьи. После редактор загружает все данные. */
function setArticleId(
    state: ArticleReducerType, action: StoreArticleTypes.SetArticleIdAction
): ArticleReducerType {
    return {
        ...state,
        articleId: action.payload,
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
                    tagType: null,
                    dataCompId: null,
                    dataElemId: null
                },
                // Selected component/element coordinates
                selectedElem: {
                    tagType: null,
                    dataCompId: null,
                    dataElemId: null
                },
                moveHoveredComp: {
                    tagType: null,
                    dataCompId: null,
                    dataElemId: null
                },
                moveSelectedComp: {
                    tagType: null,
                    dataCompId: null,
                    dataElemId: null
                }
            }
        ]
    }
}

/** Установка id шаблона сайта */
function changeSiteTemplateId(state: ArticleReducerType, action: StoreArticleTypes.ChangeSiteTemplateIdAction): ArticleReducerType {
    return {
        ...state,
        siteTemplateId: action.payload
    }
}

/** Увеличение хеша версии шаблона сайта. После редактор загружает шаблон сайта и ставит в IFrame. */
function changeSiteTemplateVersionHash(state: ArticleReducerType): ArticleReducerType {
    return {
        ...state,
        siteTemplateVersionHash: state.siteTemplateVersionHash + 1
    }
}

/** Installing a site template */
function setSiteTemplate(
    state: ArticleReducerType, action: StoreArticleTypes.SetSiteTemplateAction
): ArticleReducerType {
    return {
        ...state,
        siteTemplate: action.payload,
        siteTemplateDownloadHash: state.siteTemplateDownloadHash + 1
    }
}

/** Увеличение хеша версии папок шаблонов компонентов. После редактор загрузит их и поставит в Хранилище. */
function changeTempCompsFoldersVersionHash(state: ArticleReducerType): ArticleReducerType {
    return {
        ...state,
        tempCompsFoldersVersionHash: state.tempCompsFoldersVersionHash + 1
    }
}

/** Увеличение хеша версии папок шаблонов компонентов. После редактор загрузит их и поставит в Хранилище. */
function changeTempCompsVersionHash(state: ArticleReducerType): ArticleReducerType {
    return {
        ...state,
        tempCompsVersionHash: state.tempCompsVersionHash + 1
    }
}

/** Установка папок шаблонов компонентов */
function setTempCompFolders(
    state: ArticleReducerType, action: StoreArticleTypes.SetTempCompFoldersAction
): ArticleReducerType {
    return {
        ...state,
        tempCompsFolders: action.payload,
    }
}

/** Installing of components array */
function setTempComps(
    state: ArticleReducerType, action: StoreArticleTypes.SetTempCompAction
): ArticleReducerType {
    return {
        ...state,
        tempComps: action.payload,
        tempCompsDownloadHash: state.tempCompsDownloadHash + 1
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
        tagType: action.payload.tagType,
        dataCompId: action.payload.dataCompId,
        dataElemId: action.payload.dataElemId
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
            moveHoveredComp: flashedElem
        }
    }
    else if (action.payload.actionType === 'moveSelect') {
        article = {
            ...article,
            moveSelectedComp: flashedElem
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

// Редьюсер ставит новую версию статьи в массив истории
function createAndSetHistoryItem(
    state: ArticleReducerType, action: StoreArticleTypes.CreateAndSetHistoryItemAction
): ArticleReducerType {
    const historyArr = createHistoryArr()

    return {
        ...state,
        history: historyArr,
        historyStepWhenWasSave: getSaveStep(),
        historyCurrentIdx: historyArr.length - 1
    }

    function createHistoryArr() {
        const historyArrCopy =  [...state.history]

        historyArrCopy.push(
            createHistoryItem()
        )

        return historyArrCopy
    }

    function createHistoryItem(): StoreArticleTypes.HistoryItem {
        const currentHistoryItem = state.history[state.historyCurrentIdx]

        return {
            article: articleManager.createArticle(
                action.payload.maxCompId,
                action.payload.components
            ),
            hoveredElem: currentHistoryItem.hoveredElem,
            selectedElem: currentHistoryItem.selectedElem,
            moveHoveredComp: currentHistoryItem.moveHoveredComp,
            moveSelectedComp: currentHistoryItem.moveSelectedComp,
        }
    }

    function getSaveStep() {
        return state.historyStepWhenWasSave > state.history.length
            ? state.historyStepWhenWasSave - 1
            : state.historyStepWhenWasSave
    }
}

// The function changes a current history step
function makeHistoryStep(state: ArticleReducerType, action: StoreArticleTypes.MakeHistoryStepAction): ArticleReducerType {
    let newStepNum = state.historyCurrentIdx

    if (action.payload === 'undo' && state.historyCurrentIdx - 1 !== -1) {
        newStepNum--
    }
    else if (action.payload === 'redo' && state.historyCurrentIdx + 1 < state.history.length) {
        newStepNum++
    }

    return {
        ...state,
        historyCurrentIdx: newStepNum
    }
}

// The function set current historyCurrentIdx value to historyStepWhenWasSave to know what step the article was saved
function setHistoryStepWhenArticleWasSaved(state: ArticleReducerType, action: StoreArticleTypes.SetHistoryStepWhenArticleWasSavedAction): ArticleReducerType {
    return {
        ...state,
        historyStepWhenWasSave: state.historyCurrentIdx
    }
}

/* Функция очищает статью от данных */
function clearArticle(state: ArticleReducerType): ArticleReducerType {
    return Object.assign(
        initialState,
        { $links: state.$links } // Do not touch the document's links
    )
}

/* Функция очищает статью от данных */
function updateFocusTextProof(state: ArticleReducerType, action: StoreArticleTypes.UpdateFocusTextProofAction): ArticleReducerType {
    const newFocusTextProof = Object.assign(state.focusTextProof, action.payload)

    return {
        ...state,
        focusTextProof: newFocusTextProof
    }
}


// Редьюсер Store.article
export default function articleReducer(
    state = initialState, action: StoreArticleTypes.ArticleAction
): ArticleReducerType {

    switch (action.type) {
        case StoreArticleTypes.SET_LINKS:
            return setLinks(state, action)
        case StoreArticleTypes.SET_ARTICLE_ID:
            return setArticleId(state, action)
        case StoreArticleTypes.SET_ARTICLE:
            return setArticle(state, action)
        case StoreArticleTypes.SET_SITE_TEMPLATE:
            return setSiteTemplate(state, action)
        case StoreArticleTypes.CHANGE_SITE_TEMPLATE_ID:
            return changeSiteTemplateId(state, action)
        case StoreArticleTypes.CHANGE_SITE_TEMPLATE_VERSION_HASH:
            return changeSiteTemplateVersionHash(state)
        case StoreArticleTypes.CHANGE_TEMP_COMPS_FOLDERS_VERSION_HASH:
            return changeTempCompsFoldersVersionHash(state)
        case StoreArticleTypes.CHANGE_TEMP_COMPS_VERSION_HASH:
            return changeTempCompsVersionHash(state)
        case StoreArticleTypes.SET_TEMP_COMP_FOLDERS:
            return setTempCompFolders(state, action)
        case StoreArticleTypes.SET_TEMP_COMPS:
            return setTempComps(state, action)
        case StoreArticleTypes.SET_FLASHED_ELEMENT:
            return setFlashedElement(state, action)
        case StoreArticleTypes.CREATE_AND_SET_HISTORY_ITEM:
            return createAndSetHistoryItem(state, action)
        case StoreArticleTypes.MAKE_HISTORY_STEP:
            return makeHistoryStep(state, action)
        case StoreArticleTypes.SET_HISTORY_STEP_WHEN_ARTICLE_WAS_SAVED:
            return setHistoryStepWhenArticleWasSaved(state, action)
        case StoreArticleTypes.CLEAR_ARTICLE:
            return clearArticle(state)
        case StoreArticleTypes.UPDATE_FOCUS_TEXT_PROOF:
            return updateFocusTextProof(state, action)
        default:
            // @ts-ignore
            const x: never = null
            return state
    }
}
