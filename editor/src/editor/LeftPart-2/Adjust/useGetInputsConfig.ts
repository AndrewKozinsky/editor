import { useEffect, useState } from 'react'
import articleManager from 'articleManager/articleManager'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import { FieldGroupPropType } from 'common/formElements/FieldGroup/FieldGroup'
import { SelectPropType } from 'common/formElements/Select/Select'
import { TextInputPropType } from 'common/formElements/TextInput/TextInput'
import { AdjTextInputsType } from './AdjustInputs'

// Тестовая функция. Потом нужно удалить.
export default function useGetInputsConfig() {
    const [config, setConfig] = useState<AdjTextInputsType[]>([])

    const flashedElemInfo = articleManager.hooks.getFlashedElemDataAndTemplate()

    useEffect(function () {
        setConfig([])
    }, [flashedElemInfo])

    return config
}


/** Функция возвращает объект конфигурации для генерирования полей ввода изменения атрибутов выделенного элемента */
/*export default function useGetInputsConfig() {
    const [config, setConfig] = useState<AdjTextInputsType[]>([])

    const flashedElemInfo = articleManager.hooks.getFlashedElemDataAndTemplate()

    useEffect(function () {
        const { dElem, tElem } = flashedElemInfo
        if (!dElem || !tElem) return

        const inputsConfig = getInputsConfig(dElem, tElem)

        // setConfig(inputsConfig)
    }, [flashedElemInfo])

    return config
}*/

/**
 * Функция возвращает объект конфигурации для генерирования полей ввода изменения атрибутов выделенного элемента
 * @param {Object} dElem — данные выделенного элемента
 * @param {Object} tElem — шаблон выделенного элемента
 */
/*function getInputsConfig(dElem: ArticleTypes.ComponentElem, tElem: TempCompTypes.Elem): AdjTextInputsType[] {
    if (!tElem.elemAttrs) return []

    // @ts-ignore
    return tElem.elemAttrs.map(elemAttr => {
        const inputType = getInputType(elemAttr)

        const dElemAttrObj = dElem.dCompElemAttrs.find(dCompElemAttr => {
            return dCompElemAttr.tCompElemAttrId === elemAttr.elemAttrId
        })

        return {
            type: inputType,
            data: getInputData(elemAttr, inputType, dElemAttrObj)
        }
    })
}*/

type InputTypes = 'radio' | 'checkbox' | 'select' | 'text'

/**
 * Функция возвращает тип поля ввода для объекта конфигурации генерирования полей ввода
 * @param {Object} tElemAttr — данные об атрибуте из шаблона элемента
 */
/*function getInputType(tElemAttr: TempCompTypes.ElemAttr): InputTypes {
    if (tElemAttr.elemAttrView === 'radio') {
        return 'radio'
    }
    else if (tElemAttr.elemAttrView === 'checkbox') {
        return 'checkbox'
    }
    else if (tElemAttr.elemAttrView === 'select') {
        return 'select'
    }
    else {
        return 'text'
    }
}*/

/**
 * Функция возвращает данные, которые будут переданы в поле ввода изменения определённого атрибута для его отрисовки
 * @param {Object} tElemAttr — данные об атрибуте из шаблона элемента
 * @param {String} inputType — тип поля
 * @param {Object} dElemAttrObj — объект с данными об атрибуте элемента
 */
/*function getInputData(
    tElemAttr: TempCompTypes.ElemAttr,
    inputType: InputTypes,
    dElemAttrObj: ArticleTypes.Attrib
): TextInputPropType | FieldGroupPropType | SelectPropType {
    // Текст в свойстве label и grayText у поля
    const { label, grayText } = getLabelAndGrayText(tElemAttr)
    // Значение свойства value у атрибута
    const value = getAttrCurrentValue(dElemAttrObj, inputType)

    if (inputType === 'text') {
        return {
            label,
            grayText,
            name: tElemAttr.elemAttrId, // В качестве имени поля будет выступать id атрибута
            value,
            onChange: onChangeHandler,
        }
    }
    else if (inputType === 'checkbox') {
        return {
            label,
            grayText,
            inputType: 'checkbox',
            groupName: tElemAttr.elemAttrId, // В качестве имени поля будет выступать id атрибута
            inputsArr: getInputItems(tElemAttr),
            value,
            onChange: onChangeHandler,
        }
    }
    else if (inputType === 'radio') {
        return {
            label,
            grayText,
            inputType: 'radio',
            groupName: tElemAttr.elemAttrId, // В качестве имени поля будет выступать id атрибута
            inputsArr: getInputItems(tElemAttr),
            value,
            onChange: onChangeHandler,
        }
    }
    else if (inputType === 'select') {
        return {
            label,
            grayText,
            name: tElemAttr.elemAttrId, // В качестве имени поля будет выступать id атрибута
            options: getInputItems(tElemAttr),
            value,
            onChange: onChangeHandler,
        }
    }
}*/

/**
 * Функция возвращает объект с данными что писать в названии поля ввода и значение серого текста (если его можно поставить)
 * @param {Object} tElemAttr — данные об атрибуте из шаблона элемента
 */
/*function getLabelAndGrayText(tElemAttr: TempCompTypes.ElemAttr) {
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
}*/

/**
 *
 * @param {ArticleTypes.Attrib} dElemAttrObj
 * @param {InputTypes} inputType
 * @returns {ArticleTypes.ComponentElemAttribValue | undefined}
 */
/*function getAttrCurrentValue(dElemAttrObj: ArticleTypes.Attrib, inputType: InputTypes) {
    if (inputType === 'text' || inputType === 'select') {
        return dElemAttrObj?.dCompElemAttrValue
            ? dElemAttrObj?.dCompElemAttrValue
            : ''
    }
    else if (inputType === 'checkbox' || inputType === 'radio') {
        return dElemAttrObj?.dCompElemAttrValue
            ? dElemAttrObj?.dCompElemAttrValue
            : []
    }
}*/

/**
 * Функция возвращает массив данных для генерирования флагов, переключателей или пунктов выпадающего списка
 * @param {Object} tElemAttr — данные об атрибуте из шаблона элемента
 */
/*function getInputItems(tElemAttr: TempCompTypes.ElemAttr,) {
    if (!tElemAttr?.elemAttrValues) return []

    return tElemAttr?.elemAttrValues.map(elemAttrValue => {
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
}*/

// TODO Что делает эта функция?
/*function onChangeHandler(data: {fieldName: string | number, fieldValue: (number | string)[]}) {
    console.log(data)
}*/
