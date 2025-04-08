import React from 'react'
import SvgIcon from 'common/icons/SvgIcon'
import { onMouseLeaveHandler } from '../LayersPanel/getLayersConfigFns'
import LayersConfigType from '../LayersPanel/LayersConfigType'
import makeClasses from './Layers-classes'

type LayersPropType = {
    config: LayersConfigType.Layers
}

/** Компонент слоёв */
export default function Layers(props: LayersPropType) {
    const { config } = props

    return (
        <div onMouseLeave={onMouseLeaveHandler}>
            {config.map((layerConfig, i) => {
                return <Layer config={layerConfig} key={i} />
            })}
        </div>
    )
}


type LayerPropType = {
    config: LayersConfigType.Layer
}

/** Компонент отдельного слоя */
function Layer(props: LayerPropType) {
    const { config } = props

    const CN = makeClasses(config)
    const paddingStyle = {paddingLeft: config.offset * 10}

    return (
        <div
            className={CN.root}
            style={paddingStyle}
            onClick={config.onClickHandler}
            onMouseEnter={config.onMouseEnterHandler}
        >
            <span className={CN.nameWrapper}>
                <span className={CN.text}>{config.name}</span>
            </span>
            <HiddenLayerSign config={config} />
            <RightPart config={config} />
        </div>
    )
}

/** Значок скрытого слоя */
function HiddenLayerSign(props: LayerPropType) {
    const { config } = props

    const CN = makeClasses(config)

    return config.hidden
        ? <SvgIcon type='layerHidden' extraClass={CN.hiddenLayerSign} />
        : null
}

/** Правая часть слоя с кнопкой изменения видимости */
function RightPart(props: LayerPropType) {
    const { config } = props

    const CN = makeClasses(config)

    let Icon = config.hidden
        ? <SvgIcon type='layerHidden' extraClass={CN.rightPartBtnIcon} />
        : <SvgIcon type='layerVisible' extraClass={CN.rightPartBtnIcon} />

    return (
        <div className={CN.rightPart}>
            <button className={CN.rightPartBtn} onClick={config.showHideHandler}>
                {Icon}
            </button>
        </div>
    )
}
