import React from 'react'
import TempCompList from '../TempComps/TempCompList/TempCompList'
import BottomButtons from '../BottomButtons/BottomButtons'
import Adjust from '../Adjust/AdjustPanel/AdjustPanel'
import LayersPanel from '../Layers/LayersPanel/LayersPanel'
import './LeftPart-2.scss'

type LeftPart3PropType = {
    display?: boolean
}

/** Левая часть второй главной вкладки */
export default function LeftPart2(props: LeftPart3PropType) {
    const {
        display // Показывать ли обёртку
    } = props

    const CN = 'left-part-2'
    const style = display ? {} : {display: 'none'}

    return (
        <div className={CN} style={style}>
            <div className={`${CN}__top`}>
                <TempCompList />
                <Adjust />
                <LayersPanel />
            </div>
            <div className={`${CN}__bottom`} >
                <BottomButtons />
            </div>
        </div>
    )
}
