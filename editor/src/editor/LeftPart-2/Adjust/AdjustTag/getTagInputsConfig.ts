import ArticleTypes from 'store/article/codeType/articleCodeType'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import { FieldGroupPropType } from 'common/formElements/FieldGroup/FieldGroup'
import { SelectPropType } from 'common/formElements/Select/Select'
import { TextInputPropType } from 'common/formElements/TextInput/TextInput'
import { TagAdjInputsType } from '../AdjustInputs/AdjustInputs'

/**
 * Функция возвращает объект конфигурации для генерирования полей ввода изменения тега выделенного элемента
 * @param {Object} dElem — данные выделенного элемента
 * @param {Object} tElem — шаблон выделенного элемента
 */
/*export function getTagInputsConfig(dElem: ArticleTypes.ComponentElem, tElem: TempCompTypes.Elem): TagAdjInputsType[] {
    if (!tElem.elemTags) return null

    // Тип поля изменения тега (text, radio, select)
    const inputType = getInputType(tElem.elemTags)

    return [{
        type: inputType,
        data: getInputData(tElem.elemTags, inputType, dElem.dCompElemTag)
    }]
}*/


/**
 * Функция возвращает тип поля ввода для объекта конфигурации генерирования полей ввода
 * @param {Object} tElemTags — данные о доступных тегах
 */
/*function getInputType(tElemTags: TempCompTypes.ElemTags): 'select' | 'text' | 'radio' {
    if (tElemTags.elemTagsView) {
        return tElemTags.elemTagsView as 'select' | 'text' | 'radio'
    }

    return Array.isArray(tElemTags.elemTagsValues)
        ? 'radio' : 'text'
}*/

/**
 * Функция возвращает данные, которые будут переданы в поле ввода изменения определённого атрибута для его отрисовки
 * @param {Object} tElemTags — данные об изменении тега из шаблона элемента
 * @param {String} inputType — тип поля
 * @param {String} currentTagValue — или название тега, или id из массива вариантов возможных тегов ('1' OR 'div')
 */
/*function getInputData(
    tElemTags: TempCompTypes.ElemTags,
    inputType: TempCompTypes.InputType,
    currentTagValue: ArticleTypes.Tag
) {
    // Текст в свойстве label у поля изменения тега
    const label = 'Тег'
    // Значение тега
    const value = getInputValue(tElemTags, inputType, currentTagValue)

    if (inputType === 'text') {
        const res: TextInputPropType = {
            label,
            name: 'tag', // Атрибута name в поле изменения тега
            value: value,
            onChange: onChangeHandler,
        }
        return res
    }
    else if (inputType === 'radio') {
        const res: FieldGroupPropType = {
            label,
            inputType: 'radio',
            groupName: 'tag', // Атрибута name в поле изменения тега
            inputsArr: getInputItems(tElemTags),
            value: [value],
            onChange: onChangeHandler,
        }
        return res
    }
    else if (inputType === 'select') {
        const res: SelectPropType = {
            label,
            name: 'tag', // Атрибута name в поле изменения тега
            options: getInputItems(tElemTags),
            value,
            onChange: onChangeHandler,
        }

        return res
    }
}*/

/**
 * Функция возвращает или конкретное значение тега (если его написали в текстовом поле)
 * или id выбранного тега (если выбирали из списка переключателей или выпадающего списка)
 * @param {Object} tElemTags — информация о тегах компонента из шаблона элемента
 * @param {String} inputType — тип поля ввода использованное для ввода или выбора тега
 * @param {String} currentTag — или название тега, или id из массива вариантов возможных тегов ('1' OR 'div')
 */
/*function getInputValue(
    tElemTags: TempCompTypes.ElemTags,
    inputType: TempCompTypes.InputType,
    currentTag: ArticleTypes.Tag
) {
    if (inputType === 'text') {
        // Вернуть конкретное значение тега
        return currentTag || ''
    }
    else if (inputType === 'radio' || inputType === 'select') {
        // Найти и вернуть id выбранного тега
        const foundedElemTag = tElemTags.elemTagsValues.find(tElemTag => {
            return tElemTag.elemTagValueId === currentTag
        })

        return foundedElemTag.elemTagValueId
    }
}*/

/**
 * Функция возвращает массив данных для генерирования флагов, или пунктов выпадающего списка с выбором тега
 * @param {Object} tTagObj — данные о возможных тегах из шаблона элемента
 */
/*function getInputItems(tTagObj: TempCompTypes.ElemTags) {
    return tTagObj.elemTagsValues.map(elemTagValue => {
        return {
            label: elemTagValue.elemTagValueName,
            value: elemTagValue.elemTagValueId,
        }
    })
}*/

// TODO Что делает эта функция?
/*function onChangeHandler(data: {fieldName: string | number, fieldValue: string[]}) {
    console.log(data)
}*/
