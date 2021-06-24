import StoreArticleTypes from './articleTypes'
import ArticleTypes from './codeType/articleCodeType'

export type ArticleReducerType = {
    // Components templates array
    tempComps: null | StoreArticleTypes.TempComps
    // Article object
    article: null | ArticleTypes.Article
    // Code with
    incFiles: {
        inHead: null | string
        beforeEndBody: null | string
    }
    $links: StoreArticleTypes.LinksObj
}


// Изначальные значения
const initialState: ArticleReducerType = {
    tempComps: null,
    article: null,
    incFiles: {
        inHead: null,
        beforeEndBody: null
    },
    $links: {
        $window: null,
        $document: null,
        $head: null,
        $body: null
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

// Installing an included files string with code
function setIncFilesTemplate(
    state: ArticleReducerType, action: StoreArticleTypes.SetIncFilesTemplateAction
): ArticleReducerType {
    return {
        ...state,
        incFiles: action.payload
    }
}

// Installing an article code
function setArticle(state: ArticleReducerType, action: StoreArticleTypes.SetArticleAction): ArticleReducerType {
    return {
        ...state,
        article: action.payload
    }
}

// Installing an article code
function setLinks(state: ArticleReducerType, action: StoreArticleTypes.SetLinksAction): ArticleReducerType {
    return {
        ...state,
        $links: action.payload
    }
}


// Редьюсер Store.article
export default function articleReducer(
    state = initialState, action: StoreArticleTypes.ArticleAction
): ArticleReducerType {

    switch (action.type) {
        case StoreArticleTypes.SET_TEMP_COMPS:
            return setTempComps(state, action)
        case StoreArticleTypes.SET_INC_FILES_TEMPLATE:
            return setIncFilesTemplate(state, action)
        case StoreArticleTypes.SET_ARTICLE:
            return setArticle(state, action)
        case StoreArticleTypes.SET_LINKS:
            return setLinks(state, action)
        default:
            // @ts-ignore
            const x: never = null
            return state
    }
}
