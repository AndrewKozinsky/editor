import articleManager from 'articleManager/articleManager'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import { store } from 'store/rootReducer'
import articleActions from 'store/article/articleActions'
import { OuterOnChangeHandlerType } from 'common/formElements/outerOnChangeFn'
import attrPanelMsg from 'messages/attrsPanelMessages'
import { AdjInputsType } from '../AdjustInputs/AdjustInputs'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import { FieldGroupPropType } from 'common/formElements/FieldGroup/FieldGroup'
import { SelectPropType } from 'common/formElements/Select/Select'
import { TextInputPropType } from 'common/formElements/TextInput/TextInput'
import { OptionsType } from 'common/formElements/Select/SelectTypes'
import { getState } from 'utils/miscUtils'

/**
 * Функция возвращает объект конфигурации для генерирования полей ввода изменения атрибутов выделенного элемента
 * @param {Object} dComp — данные выделенного компонента
 * @param {Object} dElem — данные выделенного элемента
 * @param {Object} tElem — шаблон выделенного элемента
 */
export function getAttrsInputsConfig(dComp: ArticleTypes.Component, dElem: ArticleTypes.ComponentElem, tElem: TempCompTypes.Elem): AdjInputsType[] {
    if (!tElem.elemAttrs) return null

    return tElem.elemAttrs.map(elemAttr => {
        // Тип поля изменения тега
        const inputType: any = getInputType(elemAttr)

        // Данные атрибута
        const dElemAttrObj = dElem.dCompElemAttrs.find(dCompElemAttr => {
            return dCompElemAttr.tCompElemAttrId === elemAttr.elemAttrId
        })

        return {
            type: inputType,
            data: getInputData(dComp.dCompId, dElem.dCompElemId, elemAttr, inputType, dElemAttrObj)
        }
    })
}


/**
 * Функция возвращает тип поля ввода для объекта конфигурации генерирования полей ввода
 * @param {Object} tElemAttr — данные об атрибуте из шаблона элемента
 */
function getInputType(tElemAttr: TempCompTypes.ElemAttr): TempCompTypes.InputViewType {
    if (tElemAttr.elemAttrView) {
        return tElemAttr.elemAttrView
    }

    return Array.isArray(tElemAttr.elemAttrValues)
        ? 'radio' : 'text'
}

function getInputData(dCompId: ArticleTypes.Id, dElemId: ArticleTypes.Id, tElemAttr: TempCompTypes.ElemAttr, inputType: 'text', dElemAttrObj: ArticleTypes.Attrib): TextInputPropType
function getInputData(dCompId: ArticleTypes.Id, dElemId: ArticleTypes.Id, tElemAttr: TempCompTypes.ElemAttr, inputType: 'checkbox', dElemAttrObj: ArticleTypes.Attrib): FieldGroupPropType
function getInputData(dCompId: ArticleTypes.Id, dElemId: ArticleTypes.Id, tElemAttr: TempCompTypes.ElemAttr, inputType: 'radio', dElemAttrObj: ArticleTypes.Attrib): FieldGroupPropType
function getInputData(dCompId: ArticleTypes.Id, dElemId: ArticleTypes.Id, tElemAttr: TempCompTypes.ElemAttr, inputType: 'select', dElemAttrObj: ArticleTypes.Attrib): SelectPropType
/**
 * Функция возвращает данные, которые будут переданы в поле ввода изменения определённого атрибута для его отрисовки
 * @param {Number} dCompId — id данных выделенного компонента
 * @param {Number} dElemId — id данных выделенного элемента
 * @param {Object} tElemAttr — данные об атрибуте из шаблона элемента
 * @param {String} inputType — тип поля
 * @param {Object} dElemAttrObj — объект с данными об атрибуте элемента
 */
function getInputData(
    dCompId: ArticleTypes.Id,
    dElemId: ArticleTypes.Id,
    tElemAttr: TempCompTypes.ElemAttr,
    inputType: TempCompTypes.InputViewType,
    dElemAttrObj: ArticleTypes.Attrib
): TextInputPropType | FieldGroupPropType | SelectPropType {
    // Текст в свойстве label и grayText у поля
    const { label, grayText } = getLabelAndGrayText(tElemAttr)
    // Значение свойства value у атрибута
    const value = getInputValue(dElemAttrObj, inputType)

    if (inputType === 'text') {
        return {
            label,
            grayText,
            name: tElemAttr.elemAttrId, // В качестве имени поля будет выступать id атрибута
            value,
            onChange: onChangeHandler(dCompId, dElemId, inputType),
        } as TextInputPropType
    }
    else if (inputType === 'checkbox') {
        return {
            label,
            grayText,
            inputType: 'checkbox',
            groupName: tElemAttr.elemAttrId, // В качестве имени поля будет выступать id атрибута
            inputsArr: getInputItems(tElemAttr, inputType),
            value,
            onChange: onChangeHandler(dCompId, dElemId, inputType),
        } as FieldGroupPropType
    }
    else if (inputType === 'radio') {
        return {
            label,
            grayText,
            inputType: 'radio',
            groupName: tElemAttr.elemAttrId, // В качестве имени поля будет выступать id атрибута
            inputsArr: getInputItems(tElemAttr, inputType),
            value,
            onChange: onChangeHandler(dCompId, dElemId, inputType),
        } as FieldGroupPropType
    }
    else if (inputType === 'select') {
        return {
            label,
            grayText,
            name: tElemAttr.elemAttrId, // В качестве имени поля будет выступать id атрибута
            options: getInputItems(tElemAttr, inputType),
            value,
            onChange: onChangeHandler(dCompId, dElemId, inputType),
        } as SelectPropType
    }
}

/**
 * Функция возвращает объект с данными что писать в названии поля ввода и значение серого текста (если его можно поставить)
 * @param {Object} tElemAttr — данные об атрибуте из шаблона элемента
 */
function getLabelAndGrayText(tElemAttr: TempCompTypes.ElemAttr) {
    const attrName = tElemAttr.elemAttrName
    const attrAltName = tElemAttr.elemAttrAlt

    if (!attrAltName) {
        return {
            label: attrName,
            grayText: ''
        }
    }
    return {
        label: attrAltName,
        grayText: attrName
    }
}

/**
 * Функция возвращает выбранное value атрибута. Это может быть или строка или массив строк
 * @param {Object} dElemAttrObj — данные атрибута
 * @param {String} inputType — тип поля
 * @returns {ArticleTypes.ComponentElemAttribValue | undefined}
 */
function getInputValue(dElemAttrObj: ArticleTypes.Attrib, inputType: TempCompTypes.InputViewType) {

    if (inputType === 'text' || inputType === 'select') {
        return dElemAttrObj?.dCompElemAttrValue
            ? dElemAttrObj?.dCompElemAttrValue
            : ''
    }
    else if (inputType === 'checkbox') {
        return dElemAttrObj?.dCompElemAttrValue
            ? dElemAttrObj?.dCompElemAttrValue
            : []
    }
    else if (inputType === 'radio') {
        return dElemAttrObj?.dCompElemAttrValue?.length
            ? dElemAttrObj?.dCompElemAttrValue
            : [''] // Если нет значений атрибута, то поставить в значение Not selected
    }
}

/**
 * Функция возвращает массив данных для генерирования флагов, переключателей или пунктов выпадающего списка
 * @param {Object} tElemAttr — данные об атрибуте из шаблона элемента
 * @param {String} inputType — тип поля
 */
function getInputItems(tElemAttr: TempCompTypes.ElemAttr, inputType: TempCompTypes.InputViewType): OptionsType {
    if (!tElemAttr?.elemAttrValues) return []

    const options: OptionsType = tElemAttr.elemAttrValues.map(elemAttrValue => {
        let label = '', grayText = ''

        if (elemAttrValue.elemAttrValueAlt) {
            label = elemAttrValue.elemAttrValueAlt
            grayText = elemAttrValue.elemAttrValueValue
        }
        else {
            label = elemAttrValue.elemAttrValueValue
        }

        return {
            label,
            value: elemAttrValue.elemAttrValueId,
            grayText
        }
    })

    if (['select', 'radio'].includes(inputType)) {
        options.unshift({
            label: attrPanelMsg.notSelected,
            value: '',
        })
    }

    return options
}

/**
 * Обработчик изменения поля изменения атрибута
 * @param {Number} dCompId — id данных выделенного компонента
 * @param {Number} dElemId — id данных выделенного элемента
 * @param {String} inputType — тип поля
 */
function onChangeHandler(dCompId: ArticleTypes.Id, dElemId: ArticleTypes.Id, inputType: TempCompTypes.InputViewType) {
    return function (data: OuterOnChangeHandlerType.FieldsData) {
        const { history, historyCurrentIdx } = getState().article
        const historyItem = history[historyCurrentIdx]

        // Для текстового поля нужно взять первый элемент массива значений,
        // для всех остальных взять весь массив
        let fieldValue: string | string[] = data.fieldValue
        if (inputType === 'text') fieldValue = data.fieldValue[0]

        const compsAndMaxCompId = articleManager.changeElemAttr(
            historyItem.article, dCompId, dElemId, data.fieldName, fieldValue
        )

        store.dispatch(articleActions.createAndSetHistoryItem(
            compsAndMaxCompId
        ))
    }
}
