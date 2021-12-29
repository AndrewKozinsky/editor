import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import actions from 'store/rootAction'
import useGetArticleSelectors from 'store/article/articleSelectors'
import useGetSettingsSelectors from 'store/settings/settingsSelectors'
import articleManager from '../../../articleManager/articleManager'


/** The hook returns is the Article menu button visible */
export function useIsButtonVisible() {
    // Current main tab
    const { mainTab } = useGetSettingsSelectors()
    // Open article id
    const { articleId } = useGetArticleSelectors()

    // Is Article menu button visible
    const [isVisible, setIsVisible] = useState(false)

    useEffect(function () {
        // Article menu button is visible if user is in an article tab and an article is open
        const isArticleVisible = mainTab === 1 && !!articleId
        setIsVisible(isArticleVisible)
    }, [mainTab, articleId])

    return isVisible
}

/**
 * The hook checks if I can make undo or redo history step
 * @param {Object} stepType — step direction: undo OR redo
 */
export function useIsHistoryBtnDisabled(stepType: 'undo' | 'redo') {
    const { history, historyCurrentIdx } = useGetArticleSelectors()

    // Is button disabled
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(function () {
        const canMakeStep = articleManager.canMakeHistoryStep(stepType, history, historyCurrentIdx)
        setIsDisabled(!canMakeStep)
    }, [history, historyCurrentIdx])

    return isDisabled
}

/**
 * The hook returns the a callback makes undo or redo step of article history
 * @param {Object} stepType — step direction: undo OR redo
 */
export function useMakeHistoryStep(stepType: 'undo' | 'redo') {
    const dispatch = useDispatch()

    return useCallback(function (){
        dispatch(actions.article.makeHistoryStep(stepType))
    }, [])
}

// TODO Что делает эта функция?
export function useIsDataBtnDisabled() {
    // Is button disabled
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(function () {

    }, [])

    return isDisabled
}

// TODO Что делает эта функция?
export function useShowData() {
    const dispatch = useDispatch()

    return useCallback(function (){

    }, [])
}
