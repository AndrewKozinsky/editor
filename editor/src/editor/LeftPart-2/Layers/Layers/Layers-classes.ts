import { makeCN } from 'utils/stringUtils'
import LayersConfigType from '../LayersPanel/LayersConfigType'
import './Layers.scss'

const CN = 'layer'

/** Функция возвращающая классы для элементов */
export default function makeClasses(config: LayersConfigType.Layer) {
    return {
        root: getRoot(config),

        nameWrapper: getNameWrapper(config),
        text: getText(config),
        hiddenLayerSign: CN + '__hidden-layer-sign',

        rightPart: getRightPart(config),
        rightPartBtn: getRightPartBtn(config),
        rightPartBtnIcon: getRightPartBtnIcon(config),
    }
}

function getRoot(config: LayersConfigType.Layer) {
    const classes = [CN]

    if (config.hidden || config.parentLayerHidden) {
        classes.push(CN + '--hidden')
    }

    return makeCN(classes)
}

function getNameWrapper(config: LayersConfigType.Layer) {
    const wrCls = CN + '__name-wrapper'
    const classes = [wrCls]

    if (['rootElement', 'text'].includes(config.type)) {
        if (config.selected) {
            classes.push(wrCls + '--comp-select')
        }
        else if (config.hovered) {
            classes.push(wrCls + '--comp-hover')
        }
        else if (config.moveSelected) {
            classes.push(wrCls + '--comp-move-select')
        }
        else if (config.moveHovered) {
            classes.push(wrCls + '--comp-move-hover')
        }
    }
    else if (config.type === 'element') {
        if (config.selected) {
            classes.push(wrCls + '--elem-select')
        }
        else if (config.hovered) {
            classes.push(wrCls + '--elem-hover')
        }
    }

    return makeCN(classes)
}

function getText(config: LayersConfigType.Layer) {
    const cls = CN + '__text'
    const classes = [cls]

    if (['rootElement', 'text'].includes(config.type)) {
        classes.push(cls + '--bold')

        if (config.selected || config.moveSelected) {
            classes.push(cls + '--white')
        }
    }

    return makeCN(classes)
}

function getRightPart(config: LayersConfigType.Layer) {
    const cls = CN + '__right-part'
    const classes = [cls]

    return makeCN(classes)
}

function getRightPartBtn(config: LayersConfigType.Layer) {
    const cls = CN + '__right-part-btn'
    const classes = [cls]

    return makeCN(classes)
}

function getRightPartBtnIcon(config: LayersConfigType.Layer) {
    const cls = CN + '__right-part-btn-icon'
    const classes = [cls]

    return makeCN(classes)
}
