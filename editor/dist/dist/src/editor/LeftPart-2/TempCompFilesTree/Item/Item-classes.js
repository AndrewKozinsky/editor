import { makeCN } from 'utils/StringUtils';
import './Item.scss';
// Корневой класс
const CN = 'temp-comp-ft-item';
/** Функция возвращающая классы для элементов */
export default function makeClasses(itemData) {
    return {
        root: CN,
        inner: CN + '__inner',
        triangleBtn: getTriangleBtnClasses(itemData),
        folderSign: CN + '__folder-sign',
        circles: CN + '__circles',
        afterCircle: getAfterCircleClasses(itemData),
        insideCircle: getInsideCircleClasses(itemData),
        rightPart: CN + '__right-part',
        afterBtn: getAfterBtnClasses(itemData),
        insideBtn: getInsideBtnClasses(itemData),
    };
}
/**
 * Функция возвращает классы кнопки сворачивания/разворачивания папки.
 * Если передан файл, то возвращает классы для невидимого элемента.
 * @param {Object} itemData — данные папки или файла
 */
export function getTriangleBtnClasses(itemData) {
    if (!itemData)
        return '';
    if (itemData.type === 'file') {
        return CN + `__btn-triangle--for-file`;
    }
    else if (itemData.type === 'folder') {
        const classes = [
            CN + `__btn`,
            CN + `__btn-triangle`
        ];
        // Если папка открыта
        if (itemData.open) {
            classes.push(CN + `__btn-triangle--open`);
        }
        // Если в папке нет данных, то сделать кнопку невидимой
        if (!itemData.content || !itemData.content.length) {
            classes.push(CN + `__btn-triangle--invisible`);
        }
        return makeCN(classes);
    }
}
// TODO Что делает эта функция?
function getAfterCircleClasses(itemData) {
    if (!itemData)
        return '';
    let afterClasses = [CN + `__circle`];
    if (itemData.afterButtonAllowed) {
        afterClasses.push(CN + `__circle--visible`);
    }
    return makeCN(afterClasses);
}
// TODO Что делает эта функция?
function getInsideCircleClasses(itemData) {
    if (!itemData)
        return '';
    let insideClasses = [CN + `__circle`];
    if (itemData.insideButtonAllowed) {
        insideClasses.push(CN + `__circle--visible`);
    }
    return makeCN(insideClasses);
}
// TODO Что делает эта функция?
function getAfterBtnClasses(itemData) {
    if (!itemData)
        return '';
    let classes = [CN + `__btn`, CN + `__right-btn`];
    if (!itemData.afterButtonAllowed) {
        classes.push(CN + `__right-btn--invisible`);
    }
    return makeCN(classes);
}
// TODO Что делает эта функция?
function getInsideBtnClasses(itemData) {
    if (!itemData)
        return '';
    let classes = [CN + `__btn`, CN + `__right-btn`];
    if (!itemData.insideButtonAllowed) {
        classes.push(CN + `__right-btn--invisible`);
    }
    return makeCN(classes);
}
//# sourceMappingURL=Item-classes.js.map
//# sourceMappingURL=Item-classes.js.map