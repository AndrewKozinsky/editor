import StoreArticleTypes from './articleTypes';
import articleManager from 'articleManager/articleManager';
// Article reducer state example
const stateExample = {
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
                name: 'Banner',
                html: '<div class="banner" data-em-id="banner"><div><div data-em-id="cell"></div></div></div>'
            }
        }],
    tempCompsVersionHash: 0,
    tempCompsDownloadHash: 0,
    $links: {
        $window: window,
        $document: window.document,
        $head: window.document.head,
        $body: window.document.body
    },
    pressedKey: {
        code: null,
        altKey: false,
        ctrlKey: false,
        shiftKey: false
    },
    // History steps array
    history: [
        {
            article: {},
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
    // Current history point
    historyCurrentIdx: 0,
    // A history step when the article was saved
    historyStepWhenWasSave: 0,
};
// Initial values
const initialState = {
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
    $links: {
        $window: null,
        $document: null,
        $head: null,
        $body: null
    },
    pressedKey: {
        code: null,
        altKey: false,
        ctrlKey: false,
        shiftKey: false
    },
    history: [],
    // Current history point
    historyCurrentIdx: 0,
    // A history step when the article was saved
    historyStepWhenWasSave: 0,
};
/** Установка ссылок на элементы IFrame-а. */
function setLinks(state, action) {
    return Object.assign(Object.assign({}, state), { $links: action.payload });
}
/** Функция устанавливает id выделенного текстового компонента */
function setPressedKey(state, action) {
    return Object.assign(Object.assign({}, state), { pressedKey: action.payload });
}
/** Установка id редактируемой статьи. После редактор загружает все данные. */
function setArticleId(state, action) {
    return Object.assign(Object.assign({}, state), { articleId: action.payload });
}
// Installing an article code and other things
function setArticle(state, action) {
    return Object.assign(Object.assign({}, state), { siteId: action.payload.siteId, siteTemplateId: action.payload.siteTemplateId || null, history: [
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
                    dataCompId: null,
                },
                moveSelectedComp: {
                    dataCompId: null,
                },
                selectedTextComp: {
                    dataCompId: null,
                },
            }
        ] });
}
/** Установка id шаблона сайта */
function changeSiteTemplateId(state, action) {
    return Object.assign(Object.assign({}, state), { siteTemplateId: action.payload });
}
/** Увеличение хеша версии шаблона сайта. После редактор загружает шаблон сайта и ставит в IFrame. */
function changeSiteTemplateVersionHash(state) {
    return Object.assign(Object.assign({}, state), { siteTemplateVersionHash: state.siteTemplateVersionHash + 1 });
}
/** Installing a site template */
function setSiteTemplate(state, action) {
    return Object.assign(Object.assign({}, state), { siteTemplate: action.payload, siteTemplateDownloadHash: state.siteTemplateDownloadHash + 1 });
}
/** Увеличение хеша версии папок шаблонов компонентов. После редактор загрузит их и поставит в Хранилище. */
function changeTempCompsFoldersVersionHash(state) {
    return Object.assign(Object.assign({}, state), { tempCompsFoldersVersionHash: state.tempCompsFoldersVersionHash + 1 });
}
/** Увеличение хеша версии папок шаблонов компонентов. После редактор загрузит их и поставит в Хранилище. */
function changeTempCompsVersionHash(state) {
    return Object.assign(Object.assign({}, state), { tempCompsVersionHash: state.tempCompsVersionHash + 1 });
}
/** Установка папок шаблонов компонентов */
function setTempCompFolders(state, action) {
    return Object.assign(Object.assign({}, state), { tempCompsFolders: action.payload });
}
/** Installing of components array */
function setTempComps(state, action) {
    return Object.assign(Object.assign({}, state), { tempComps: action.payload, tempCompsDownloadHash: state.tempCompsDownloadHash + 1 });
}
// Set ids for hovered or selected component/element
function setFlashedElement(state, action) {
    // Get history array and current article idx
    const { history, historyCurrentIdx } = state;
    // Current article
    let article = history[historyCurrentIdx];
    // Hovered/selected element coordinates
    const flashedElem = {
        tagType: action.payload.tagType,
        dataCompId: action.payload.dataCompId,
        dataElemId: action.payload.dataElemId
    };
    const movedComp = {
        dataCompId: action.payload.dataCompId,
    };
    // Update hovered/selected/move element coordinates in article
    if (action.payload.actionType === 'hover') {
        article = Object.assign(Object.assign({}, article), { hoveredElem: flashedElem });
    }
    else if (action.payload.actionType === 'select') {
        article = Object.assign(Object.assign({}, article), { selectedElem: flashedElem });
    }
    else if (action.payload.actionType === 'moveHover') {
        article = Object.assign(Object.assign({}, article), { moveHoveredComp: movedComp });
    }
    else if (action.payload.actionType === 'moveSelect') {
        article = Object.assign(Object.assign({}, article), { moveSelectedComp: movedComp });
    }
    // Set the new article to history array
    const updatedHistoryArr = [...history];
    updatedHistoryArr[historyCurrentIdx] = article;
    return Object.assign(Object.assign({}, state), { history: updatedHistoryArr });
}
// Функция устанавливает id выделенного текстового компонента
function setTextCompId(state, action) {
    // Get history array and current article idx
    const { history, historyCurrentIdx } = state;
    // Current article
    let article = history[historyCurrentIdx];
    // Hovered/selected element coordinates
    const selectedTextComp = Object.assign(Object.assign({}, article.selectedTextComp), { dataCompId: action.payload });
    article = Object.assign(Object.assign({}, article), { selectedTextComp });
    // Set the new article to history array
    const updatedHistoryArr = [...history];
    updatedHistoryArr[historyCurrentIdx] = article;
    return Object.assign(Object.assign({}, state), { history: updatedHistoryArr });
}
// Редьюсер ставит новую версию статьи в массив истории
function createAndSetHistoryItem(state, action) {
    const historyArr = createHistoryArr();
    return Object.assign(Object.assign({}, state), { history: historyArr, historyStepWhenWasSave: getSaveStep(), historyCurrentIdx: historyArr.length - 1 });
    function createHistoryArr() {
        const historyArrCopy = [...state.history];
        historyArrCopy.push(createHistoryItem());
        return historyArrCopy;
    }
    function createHistoryItem() {
        const currentHistoryItem = state.history[state.historyCurrentIdx];
        return {
            article: articleManager.createArticle(action.payload.maxCompId, action.payload.components),
            hoveredElem: currentHistoryItem.hoveredElem,
            selectedElem: currentHistoryItem.selectedElem,
            moveHoveredComp: currentHistoryItem.moveHoveredComp,
            moveSelectedComp: currentHistoryItem.moveSelectedComp,
            selectedTextComp: currentHistoryItem.selectedTextComp
        };
    }
    function getSaveStep() {
        return state.historyStepWhenWasSave > state.history.length
            ? state.historyStepWhenWasSave - 1
            : state.historyStepWhenWasSave;
    }
}
// The function changes a current history step
function makeHistoryStep(state, action) {
    let newStep = state.historyCurrentIdx;
    if (action.payload === 'undo' && state.historyCurrentIdx - 1 !== -1) {
        newStep--;
    }
    else if (action.payload === 'redo' && state.historyCurrentIdx + 1 < state.history.length) {
        newStep++;
    }
    return Object.assign(Object.assign({}, state), { historyCurrentIdx: newStep });
}
// The function set current historyCurrentIdx value to historyStepWhenWasSave to know what step the article was saved
function setHistoryStepWhenArticleWasSaved(state, action) {
    return Object.assign(Object.assign({}, state), { historyStepWhenWasSave: state.historyCurrentIdx });
}
/* Функция обновляет текущую статью */
function updateCurrentArticle(state, action) {
    const { history, historyCurrentIdx } = state;
    // Set the new article to history array
    const updatedHistoryArr = [...history];
    updatedHistoryArr[historyCurrentIdx] = action.payload;
    return Object.assign(Object.assign({}, state), { history: updatedHistoryArr });
}
/* Функция очищает статью от данных */
function clearArticle(state) {
    return Object.assign(initialState, { $links: state.$links } // Do not touch the document's links
    );
}
// Редьюсер Store.article
export default function articleReducer(state = initialState, action) {
    switch (action.type) {
        case StoreArticleTypes.SET_LINKS:
            return setLinks(state, action);
        case StoreArticleTypes.SET_PRESSED_KEY:
            return setPressedKey(state, action);
        case StoreArticleTypes.SET_ARTICLE_ID:
            return setArticleId(state, action);
        case StoreArticleTypes.SET_ARTICLE:
            return setArticle(state, action);
        case StoreArticleTypes.SET_SITE_TEMPLATE:
            return setSiteTemplate(state, action);
        case StoreArticleTypes.CHANGE_SITE_TEMPLATE_ID:
            return changeSiteTemplateId(state, action);
        case StoreArticleTypes.CHANGE_SITE_TEMPLATE_VERSION_HASH:
            return changeSiteTemplateVersionHash(state);
        case StoreArticleTypes.CHANGE_TEMP_COMPS_FOLDERS_VERSION_HASH:
            return changeTempCompsFoldersVersionHash(state);
        case StoreArticleTypes.CHANGE_TEMP_COMPS_VERSION_HASH:
            return changeTempCompsVersionHash(state);
        case StoreArticleTypes.SET_TEMP_COMP_FOLDERS:
            return setTempCompFolders(state, action);
        case StoreArticleTypes.SET_TEMP_COMPS:
            return setTempComps(state, action);
        case StoreArticleTypes.SET_FLASHED_ELEMENT:
            return setFlashedElement(state, action);
        case StoreArticleTypes.SET_TEXT_COMP_ID:
            return setTextCompId(state, action);
        case StoreArticleTypes.CREATE_AND_SET_HISTORY_ITEM:
            return createAndSetHistoryItem(state, action);
        case StoreArticleTypes.MAKE_HISTORY_STEP:
            return makeHistoryStep(state, action);
        case StoreArticleTypes.SET_HISTORY_STEP_WHEN_ARTICLE_WAS_SAVED:
            return setHistoryStepWhenArticleWasSaved(state, action);
        case StoreArticleTypes.UPDATE_CURRENT_ARTICLE:
            return updateCurrentArticle(state, action);
        case StoreArticleTypes.CLEAR_ARTICLE:
            return clearArticle(state);
        default:
            // @ts-ignore
            const x = null;
            return state;
    }
}
//# sourceMappingURL=articleReducer.js.map
//# sourceMappingURL=articleReducer.js.map