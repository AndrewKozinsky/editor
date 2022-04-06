import { makeCN } from 'utils/stringUtils'
import TempCompsTreeType from '../types'
import './Item.scss'


// Корневой класс
const CN = 'temp-comp-ft-item'

/** Функция возвращающая классы для элементов */
export default function makeClasses(itemData: TempCompsTreeType.Item, btnInsideAllowed?: boolean) {
    return {
        root: CN,
        inner: CN + '__inner',
        name: CN + '__name',
        triangleBtn: getTriangleBtnClasses(itemData),
        folderSign: CN + '__folder-sign',
        circles: CN + '__circles',
        afterCircle: getAfterCircleClasses(itemData),
        insideCircle: getInsideCircleClasses(itemData, btnInsideAllowed),
        rightPart: CN + '__right-part',
        afterBtn: getAfterBtnClasses(itemData),
        insideBtn: getInsideBtnClasses(itemData, btnInsideAllowed),
    }
}


/**
 * Функция возвращает классы кнопки сворачивания/разворачивания папки.
 * Если передан файл, то возвращает классы для невидимого элемента.
 * @param {Object} itemData — данные папки или файла
 */
export function getTriangleBtnClasses(itemData?: TempCompsTreeType.Item): string {
    if (!itemData) return ''

    if (itemData.type === 'file') {
        return CN + `__btn-triangle--for-file`
    }
    else if (itemData.type === 'folder') {
        const classes  = [
            CN + `__btn`,
            CN + `__btn-triangle`
        ]

        // Если папка открыта
        if (itemData.open) {
            classes.push(CN + `__btn-triangle--open`)
        }

        // Если в папке нет данных, то сделать кнопку невидимой
        if (!itemData.content || !itemData.content.length) {
            classes.push(CN + `__btn-triangle--invisible`)
        }

        return makeCN(classes)
    }
}

function getAfterCircleClasses(itemData?: TempCompsTreeType.Item): string {
    if (!itemData || itemData.type === 'folder') return ''

    let afterClasses = [
        CN + `__circle`,
        CN + `__circle--visible`
    ]

    return makeCN(afterClasses)
}

function getInsideCircleClasses(itemData: TempCompsTreeType.Item, btnInsideAllowed?: boolean): string {
    if (!itemData || itemData.type === 'folder') return ''

    let insideClasses = [CN + `__circle`]
    if (btnInsideAllowed) {
        insideClasses.push(CN + `__circle--visible`)
    }

    return makeCN(insideClasses)
}

function getAfterBtnClasses(itemData?: TempCompsTreeType.Item) {
    if (!itemData || itemData.type === 'folder') return ''

    let classes = [CN + `__btn`, CN + `__right-btn`]

    return makeCN(classes)
}

function getInsideBtnClasses(itemData: TempCompsTreeType.Item, btnInsideAllowed?: boolean) {
    if (!itemData || itemData.type === 'folder') return ''

    let classes = [CN + `__btn`, CN + `__right-btn`]
    if (!btnInsideAllowed) {
        classes.push(CN + `__right-btn--invisible`)
    }

    return makeCN(classes)
}
