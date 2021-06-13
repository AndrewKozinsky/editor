import React, { useEffect, useState } from 'react'
// import {useSelector} from 'react-redux'
// import LeftPart1 from '../../LeftPart-1/LeftPart-1'
// import LeftPart2 from '../../LeftPart-2/LeftPart-2'
// import LeftPart3 from '../../LeftPart-3/LeftPart-3'
// import RightPart1 from '../../RightPart-1/RightPart-1/RightPart-1'
// import RightPart2 from '../../RightPart-2/RightPart-2'
// import RightPart3 from '../../RightPart-3/RightPart-3/RightPart-3'
// import {AppState} from '../../../store/rootReducer'
// import { MiscTypes } from 'types/miscTypes'

type EditorPartProviderPropType = {
    position: 'left' | 'right'
}

/**
 * Компонент возвращает компоненты, которые должны быть показаны
 * в левой или правой части редактора в зависимости от выбранной вкладки
 */
export default function EditorPartProvider(props: EditorPartProviderPropType) {
    // С какой стороны отрисовывать часть редактора
    // const { position } = props

    // Номер активной вкладки
    // const { mainTab } = useSelector((store: AppState) => store.settings)

    // Возвращаемые компоненты
    // const [partComponents, setPartComponents] = useState(<></>)

    /*useEffect(function () {

        // Список всех компонентов во всех вкладках
        const components: MiscTypes.ObjStringKeyAnyVal = {
            left0: LeftPart1,
            left1: LeftPart2,
            left2: LeftPart3,
            right0: RightPart1,
            right1: RightPart2,
            right2: RightPart3
        }

        // Составление массива из трёх элементов. Элемент, который соответствует вкладке задаётся видимость.
        const parts = [0, 1, 2].map(i => {
            const Component = position === 'left'
                ? components['left' + i]
                : components['right' + i]

            return <Component display={i === mainTab} key={i} />
        })

        // Поставить элементы в Местное состояние чтобы компонент их вернул
        setPartComponents( <>{parts}</> )
    }, [mainTab])*/

    // return partComponents
    return <p>EditorPartProvider</p>
}
