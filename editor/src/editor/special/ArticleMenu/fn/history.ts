import { useCallback, useEffect, useState } from 'react'
import articleManager from 'articleManager/articleManager'
import useGetArticleSelectors from 'store/article/articleSelectors'
import fireEvent from '../../../../event/fireEvent'

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
    return useCallback(function () {
        // Запустить события перемещения по истории если это возможно
        fireEvent({
            event: 'makeHistoryStep',
            direction: stepType,
        })
    }, [])
}
