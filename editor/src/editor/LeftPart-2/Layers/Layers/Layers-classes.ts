import { makeCN } from 'utils/stringUtils'
import LayersConfigType from '../LayersPanel/LayersConfigType'
import './Layers.scss'

const CN = 'layer'

/** Функция возвращающая классы для элементов */
export default function makeClasses(config: LayersConfigType.Layer) {
    return {
        root: CN,
        wrapper: getWrapper(config),
        innerWrapper: CN + '__inner-wrapper',

        collapseEmpty: CN + '__collapse-empty',
        collapse: getCollapse(config),
        collapseIcon: getCollapseIcon(config),

        typeIcon: getTypeIcon(config),
        text: getText(config),

        circles: CN + '__circles',
        moveCircle: getMoveCircle(config),
        selectCircle: getSelectedCircle(config),

        hiddenLayerSign: CN + '__hidden-layer-sign',

        rightPart: getRightPart(config),
        rightPartBtn: getRightPartBtn(config),
        rightPartBtnIcon: getRightPartBtnIcon(config),
    }
}

function getWrapper(config: LayersConfigType.Layer) {
    const wrCls = CN + '__wrapper'
    const classes = [wrCls]

    if (config.selected) {
        classes.push(wrCls + '--select')
    }
    else if (config.hovered) {
        classes.push(wrCls + '--hover')
    }

    if (config.moveSelected) {
        classes.push(wrCls + '--move-select')
    }
    else if (config.moveHovered) {
        classes.push(wrCls + '--move-hover')
    }

    if (config.hidden || config.parentLayerHidden) {
        classes.push(wrCls + '--hidden')
    }

    return makeCN(classes)
}

function getCollapse(config: LayersConfigType.Layer) {
    const cls = CN + '__collapse'
    const classes = [cls]

    if (config.collapsed) {
        classes.push(cls + '--rotate')
    }

    if (config.selected) {
        classes.push(cls + '--select')
    }
    else if (config.hovered) {
        classes.push(cls + '--hover')
    }

    if (config.moveSelected) {
        classes.push(cls + '--move-select')
    }
    else if (config.moveHovered) {
        classes.push(cls + '--move-hover')
    }

    return makeCN(classes)
}

function getCollapseIcon(config: LayersConfigType.Layer) {
    const cls = CN + '__collapse-icon'
    const classes = [cls]

    if (config.selected || config.moveSelected) {
        classes.push(cls + '--white')
    }

    return makeCN(classes)
}

function getTypeIcon(config: LayersConfigType.Layer) {
    const cls = CN + '__type-icon'
    const classes = [cls]

    if (config.selected || config.moveSelected) {
        classes.push(cls + '--white')
    }

    return makeCN(classes)
}

function getText(config: LayersConfigType.Layer) {
    const cls = CN + '__text'
    const classes = [cls]

    if (['component', 'text'].includes(config.type)) {
        classes.push(cls + '--bold')
    }
    if (config.selected || config.moveSelected) {
        classes.push(cls + '--white')
    }

    return makeCN(classes)
}

function getMoveCircle(config: LayersConfigType.Layer) {
    const classes = [CN + '__circle']

    if (config.hasMovedChild && config.collapsed) {
        classes.push(CN + '__move-circle')
    }

    return makeCN(classes)
}

function getSelectedCircle(config: LayersConfigType.Layer) {
    const classes = [CN + '__circle']

    if (config.hasSelectedChild && config.collapsed) {
        classes.push(CN + '__select-circle')
    }

    return makeCN(classes)
}

function getRightPart(config: LayersConfigType.Layer) {
    const cls = CN + '__right-part'
    const classes = [cls]

    if (config.selected) {
        classes.push(cls + '--select')
    }
    else if (config.hovered) {
        classes.push(cls + '--hover')
    }

    if (config.moveSelected) {
        classes.push(cls + '--move-select')
    }
    else if (config.moveHovered) {
        classes.push(cls + '--move-hover')
    }

    return makeCN(classes)
}

function getRightPartBtn(config: LayersConfigType.Layer) {
    const cls = CN + '__right-part-btn'
    const classes = [cls]


    if (config.selected) {
        classes.push(cls + '--select')
    }
    else if (config.hovered) {
        classes.push(cls + '--hover')
    }

    if (config.moveSelected) {
        classes.push(cls + '--move-select')
    }
    else if (config.moveHovered) {
        classes.push(cls + '--move-hover')
    }

    return makeCN(classes)
}

function getRightPartBtnIcon(config: LayersConfigType.Layer) {
    const cls = CN + '__right-part-btn-icon'
    const classes = [cls]

    if (config.selected || config.moveSelected) {
        classes.push(cls + '--white')
    }

    return makeCN(classes)
}
