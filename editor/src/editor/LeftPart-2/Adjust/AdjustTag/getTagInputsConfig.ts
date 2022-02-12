import ArticleTypes from 'store/article/codeType/articleCodeType'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import { store } from 'store/rootReducer'
import { FieldGroupPropType } from 'common/formElements/FieldGroup/FieldGroup'
import { SelectPropType } from 'common/formElements/Select/Select'
import { TextInputPropType } from 'common/formElements/TextInput/TextInput'
import { OuterOnChangeHandlerType } from 'common/formElements/outerOnChangeFn'
import articleManager from 'articleManager/articleManager'
import attrPanelMsg from 'messages/attrsPanelMessages'
import articleActions from 'store/article/articleActions'
import { getState } from 'utils/miscUtils'
import { AdjInputsType } from '../AdjustInputs/AdjustInputs'

/**
 * Функция возвращает объект конфигурации для генерирования полей ввода изменения тега выделенного элемента
 * @param {Object} dComp — данные выделенного компонента
 * @param {Object} dElem — данные выделенного элемента
 * @param {Object} tElem — шаблон выделенного элемента
 */
export function getTagInputsConfig(dComp: ArticleTypes.Component, dElem: ArticleTypes.ComponentElem, tElem: TempCompTypes.Elem): AdjInputsType[] {
    if (!tElem.elemTags) return null

    // Тип поля изменения тега
    const inputType: any = getInputType(tElem.elemTags)

    return [{
        type: inputType,
        data: getInputData(dComp.dCompId, dElem.dCompElemId, tElem.elemTags, inputType, dElem.dCompElemTag)
    }]
}


/**
 * Функция возвращает тип поля ввода для объекта конфигурации генерирования полей ввода
 * @param {Object} tElemTags — данные о доступных тегах
 */
function getInputType(tElemTags: TempCompTypes.ElemTags): TempCompTypes.InputViewType {
    if (tElemTags.elemTagsView) {
        return tElemTags.elemTagsView
    }

    return Array.isArray(tElemTags.elemTagsValues)
        ? 'radio' : 'text'
}

// Перегрузка функции getInputData
function getInputData(dCompId: ArticleTypes.Id, dElemId: ArticleTypes.Id, tElemTags: TempCompTypes.ElemTags, inputType: 'text', currentTagValue: ArticleTypes.Tag): TextInputPropType
function getInputData(dCompId: ArticleTypes.Id, dElemId: ArticleTypes.Id, tElemTags: TempCompTypes.ElemTags, inputType: 'checkbox', currentTagValue: ArticleTypes.Tag): FieldGroupPropType
function getInputData(dCompId: ArticleTypes.Id, dElemId: ArticleTypes.Id, tElemTags: TempCompTypes.ElemTags, inputType: 'radio', currentTagValue: ArticleTypes.Tag): FieldGroupPropType
function getInputData(dCompId: ArticleTypes.Id, dElemId: ArticleTypes.Id, tElemTags: TempCompTypes.ElemTags, inputType: 'select', currentTagValue: ArticleTypes.Tag): SelectPropType
/**
 * Функция возвращает данные, которые будут переданы в поле ввода изменения определённого атрибута для его отрисовки
 * @param {Number} dCompId — id данных выделенного компонента
 * @param {Number} dElemId — id данных выделенного элемента
 * @param {Object} tElemTags — данные об изменении тега из шаблона элемента
 * @param {String} inputType — тип поля
 * @param {String} currentTagValue — или название тега, или id из массива вариантов возможных тегов ('1' OR 'div')
 */
function getInputData(
    dCompId: ArticleTypes.Id,
    dElemId: ArticleTypes.Id,
    tElemTags: TempCompTypes.ElemTags,
    inputType: TempCompTypes.InputViewType,
    currentTagValue: ArticleTypes.Tag
): TextInputPropType | FieldGroupPropType | SelectPropType {
    // Текст в свойстве label у поля изменения тега
    const label = 'Тег'
    // Значение тега
    const value = getInputValue(tElemTags, inputType, currentTagValue)

    if (inputType === 'text') {
        return {
            label,
            name: 'tag', // Атрибута name в поле изменения тега
            value: value,
            onChange: onChangeHandler(dCompId, dElemId),
        } as TextInputPropType
    }
    else if (inputType === 'radio') {
        return {
            label,
            inputType: 'radio',
            groupName: 'tag', // Атрибута name в поле изменения тега
            inputsArr: getInputItems(tElemTags),
            value: [value],
            onChange: onChangeHandler(dCompId, dElemId),
        } as FieldGroupPropType
    }
    else if (inputType === 'select') {
        return {
            label,
            name: 'tag', // Атрибута name в поле изменения тега
            options: getInputItems(tElemTags),
            value,
            onChange: onChangeHandler(dCompId, dElemId),
        } as SelectPropType
    }
}

/**
 * Функция возвращает или конкретное значение тега (если его написали в текстовом поле)
 * или id выбранного тега (если выбирали из списка переключателей или выпадающего списка)
 * @param {Object} tElemTags — информация о тегах компонента из шаблона элемента
 * @param {String} inputType — тип поля ввода использованное для ввода или выбора тега
 * @param {String} currentTag — или название тега, или id из массива вариантов возможных тегов ('1' OR 'div')
 */
function getInputValue(
    tElemTags: TempCompTypes.ElemTags,
    inputType: TempCompTypes.InputViewType,
    currentTag: ArticleTypes.Tag
) {
    if (!currentTag) return ''

    if (inputType === 'text') {
        // Вернуть конкретное значение тега
        return currentTag
    }
    else if (inputType === 'radio' || inputType === 'select') {
        // Найти и вернуть id выбранного тега
        const foundedElemTag = tElemTags.elemTagsValues.find(tElemTag => {
            return tElemTag.elemTagValueId === currentTag
        })

        return foundedElemTag?.elemTagValueId
    }
}

/**
 * Функция возвращает массив данных для генерирования флагов, или пунктов выпадающего списка с выбором тега
 * @param {Object} tTagObj — данные о возможных тегах из шаблона элемента
 */
function getInputItems(tTagObj: TempCompTypes.ElemTags) {
    const options = tTagObj.elemTagsValues.map(elemTagValue => {
        return {
            label: elemTagValue.elemTagValueName,
            value: elemTagValue.elemTagValueId,
        }
    })

    // Пункт если ничего не выбрано
    options.unshift({
        label: attrPanelMsg.notSelected,
        value: '',
    })

    return options
}

/**
 * Обработчик изменения поля изменения тега
 * @param {Number} dCompId — id данных выделенного компонента
 * @param {Number} dElemId — id данных выделенного элемента
 */
function onChangeHandler(dCompId: ArticleTypes.Id, dElemId: ArticleTypes.Id) {
    return function (data: OuterOnChangeHandlerType.FieldsData) {
        const { history, historyCurrentIdx } = getState().article
        const historyItem = history[historyCurrentIdx]

        const compsAndMaxCompId = articleManager.changeElemTag(
            historyItem.article, dCompId, dElemId, data.fieldValue[0]
        )

        store.dispatch(articleActions.createAndSetHistoryItem(
            compsAndMaxCompId
        ))
    }
}
