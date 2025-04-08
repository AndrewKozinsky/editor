import { useEffect, useState } from 'react'
import articleManager from 'articleManager/articleManager'
import useGetArticleSelectors from 'store/article/articleSelectors'
import fireEvent from '../../../../event/fireEvent'

/**
 * Хук возвращает булево значение заблокирована ли одна из кнопок перемещения компонента
 * @param {String} direction — направление перемещения: inside (внутрь выделенного элемента),
 * left и right (левее или правее выделенного компонента)
 */
export function useIsMoveBtnDisabled(direction: 'inside' | 'left' | 'right'): boolean {
    const [disabled, setDisabled] = useState(true)

    const historyItem = articleManager.hooks.getCurrentHistoryItem()
    const { tempComps } = useGetArticleSelectors()

    useEffect(function () {
        // Кнопка заблокирована если статья не загружена
        if (!historyItem) {
            setDisabled(true)
            return
        }
        const { selectedElem, moveSelectedComp } = historyItem
        const { dComps } = historyItem.article

        let canComponentMove

        if (direction === 'inside') {
            canComponentMove = articleManager.canComponentPutInElement(
                tempComps, dComps, selectedElem, moveSelectedComp.dataCompId
            )
        }
        else if (['left', 'right'].includes(direction)) {
            canComponentMove = articleManager.canMoveCompMoveToLeftOrRight(
                direction, tempComps, dComps, selectedElem, moveSelectedComp.dataCompId
            )
        }

        setDisabled(!canComponentMove)
    }, [historyItem, tempComps])

    return disabled
}


/**
 * Функция запускает событие перемещения компонента при нажатии на кнопку «Переместить элемент»
 * @param {String} direction — направление перемещения: inside (внутрь выделенного элемента),
 * left и right (левее или правее выделенного компонента)
 */
export function moveItem(direction: 'inside' | 'left' | 'right') {
    fireEvent({
        event: 'moveSelectedItem',
        direction
    })
}

