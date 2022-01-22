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
    const paddingStyle = {paddingLeft: config.offset * 14}

    return (
        <div
            className={CN.root}
            style={paddingStyle}
            onClick={config.onClickHandler}
            onMouseEnter={config.onMouseEnterHandler}
        >
            <div className={CN.wrapper}>
                <CollapseButton config={config} />
                <div className={CN.innerWrapper}>
                    <TypeIcon config={config} />
                    <p className={CN.text}>{config.name}</p>
                    <Circles config={config} />
                    <HiddenLayerSign config={config} />
                    <RightPart config={config} />
                </div>
            </div>
        </div>
    )
}

/** Значок типа слоя */
function TypeIcon(props: LayerPropType) {
    const { config } = props

    const CN = makeClasses(config)

    if (config.type === 'rootElement') {
        return <SvgIcon type='layerComp' baseClass='-icon-fill' extraClass={CN.typeIcon} />
    }
    else if (config.type === 'text') {
        return <SvgIcon type='layerText' baseClass='-icon-fill' extraClass={CN.typeIcon} />
    }
    else {
        return null
    }
}

/** Кнопка сворачивания слоя */
function CollapseButton(props: LayerPropType) {
    const { config } = props

    const CN = makeClasses(config)

    if (!config.hasChildren) {
        return <div className={CN.collapseEmpty} />
    }

    return (
        <button className={CN.collapse} onClick={config.collapseHandler}>
            <SvgIcon type='layerCollapse' extraClass={CN.collapseIcon} />
        </button>
    )
}

/** Круги появляющиеся если слой свёрнут и он содержит выделенные слои */
function Circles(props: LayerPropType) {
    const { config } = props

    const CN = makeClasses(config)

    return (
        <div className={CN.circles}>
            <div className={CN.moveCircle} />
            <div className={CN.selectCircle} />
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
