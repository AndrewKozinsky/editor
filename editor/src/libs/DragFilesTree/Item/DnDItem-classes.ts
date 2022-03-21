import { makeCN } from 'utils/stringUtils'
import DragFilesTreeType from '../types'
import './Item.scss'

const CN = 'ft-item'
const PlaceArrCN = 'ft-place-arrow'

export default function makeClasses(itemData: DragFilesTreeType.Item) {
    return {
        root: CN,
        innerWrapper: getInnerWrapperClasses(itemData),
        loaderWrapper: CN + '__loader-wrapper',
        loader: CN + '__loader',
        rightPart: CN + '__right-part',
        rightBtn: getRightBtnClasses(),
        folderSign: CN + '__folder-sign',
        triangleBtn: getTriangleBtnClasses(itemData),
        placeArrow: getPlaceArrow(itemData),
        placeArrowPointer: PlaceArrCN + `__pointer`,
        placeArrowLine: PlaceArrCN + `__line`
    }
}


/**
 * Функция возвращает классы кнопки сворачивания/разворачивания папки.
 * @param {Object} itemData — данные папки
 */
function getInnerWrapperClasses(itemData: DragFilesTreeType.Item) {
    const classes  = [`${CN}__inner`]

    // Добавить обводку если нужно показать метку inside
    if (itemData.placeMark === 'inside') {
        classes.push(`${CN}__inner-round-flash`)
    }

    // Добавить дополнительный класс если это выделенная папка
    if (itemData.active) {
        classes.push(`${CN}__inner-active`)
    }

    if (itemData.type === 'file' && itemData.loading) {
        classes.push(`${CN}--loading`)
    }

    return makeCN(classes)
}

function getRightBtnClasses() {
    return makeCN([CN + '__btn', CN + '__right-btn'])
}

/**
 * Функция возвращает классы кнопки сворачивания/разворачивания папки.
 * Если передан файл, то возвращает классы для невидимого элемента.
 * @param {Object} itemData — данные папки или файла
 */
function getTriangleBtnClasses(itemData: DragFilesTreeType.Item) {

    if (itemData.type === 'file') {
        return `${CN}__btn-triangle--for-file`
    }
    else if (itemData.type === 'folder') {
        const classes  = [`${CN}__btn`, `${CN}__btn-triangle`]

        // Если папка открыта
        if (itemData.open) {
            classes.push(`${CN}__btn-triangle--open`)
        }

        // Если в папке нет данных, то сделать кнопку невидимой
        if (!itemData.content || !itemData.content.length) {
            classes.push(`${CN}__btn-triangle--invisible`)
        }

        return makeCN(classes)
    }
}

/**
 * Функция возвращает классы для стрелки указывающей местоположение перетаскиваемого элемента после сброса
 * @param {Object} itemData — данные папки или файла
 */
function getPlaceArrow(itemData: DragFilesTreeType.Item) {
    const classes = [PlaceArrCN]
    if (itemData.placeMark === 'before') classes.push(PlaceArrCN + '--before')
    if (itemData.placeMark === 'after') classes.push(PlaceArrCN + '--after')

    return makeCN(classes)
}
