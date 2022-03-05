import { useCallback } from 'react'
import { OuterOnChangeHandlerType } from 'common/formElements/outerOnChangeFn'
import { useDispatch } from 'react-redux'
import makeImmutableObj from 'libs/makeImmutableCopy/makeImmutableCopy'
import sitesActions from 'store/site/sitesActions'
import MetaType from './MetaType'


export function getInputView(inputData: MetaType.Input): MetaType.InputViewType {
    if (inputData.view) return inputData.view

    return inputData.values ? 'radio' : 'text'
}

/**
 * Хук возвращает обработчик изменения поля ввода
 * @param {Array} metaItems — предопределённые значения полей
 * @param {Number} inputId — id поля ввода
 */
export function useGetOnChangeInputHandler(metaItems: MetaType.Items, inputId: number) {
    const dispatch = useDispatch()

    return useCallback(function (fieldData: OuterOnChangeHandlerType.FieldsData) {
        // Найти и копировать данные поля ввода
        const thisInputData = metaItems.find(inputData => inputData.id === inputId)
        const thisInputDataCopy = Object.assign({}, thisInputData) as MetaType.Input

        // Поставить новое значение value
        thisInputDataCopy.value = fieldData.fieldValue

        // Создать новый массив элементов метаданных
        const newMetaItems = makeImmutableObj(metaItems, thisInputData, thisInputDataCopy)

        // Обновить массив элементов метаданных в Хранилище
        dispatch(sitesActions.setArticleMeta(newMetaItems))
    }, [metaItems])
}
