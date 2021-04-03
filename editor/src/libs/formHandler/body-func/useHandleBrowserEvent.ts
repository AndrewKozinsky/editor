import makeImmutableObj from 'src/libs/makeImmutableCopy/makeImmutableCopy'
import getNickFormState from '../return-func/getNickFormState'
import FHTypes from '../types'


/**
 * Функция запускаемая после браузерного события
 * @param {Object} browserEvent — объект с данными о произошедшем событии
 * @param {Object} formConfig — конфигурацию формы переданная программистом
 * @param {Object} formState — состояние формы
 * @param {Function} setFormState — установка состояния формы
 */
export default function useHandleBrowserEvent(
    browserEvent: FHTypes.BrowserEventState,
    formConfig: FHTypes.FormConfig,
    formState: FHTypes.FormState,
    setFormState: FHTypes.SetFormState
) {
    // Имя поля и имя произошедшего события
    const {fieldName, eventName} = browserEvent
    if (!fieldName) return


    // Если в formConfig у поля есть обработка определённого события...
    // @ts-ignore
    if (formConfig.fields[fieldName][eventName]) {

        // Объект передаваемый в функцию устанавливающую данные поля
        const setDataFnArgs: FHTypes.FormDetails = {
            // Состояние формы
            formState: getNickFormState(formState),
            // Метод устанавливающий новое значение поля
            setFieldValue: getSetFieldData(formState, setFormState, 'value'),
            // Метод устанавливающий новые данные поля
            setFieldData: getSetFieldData(formState, setFormState, 'data'),
        }

        // Запуск функции, которая должна запускаться после определённого события
        // @ts-ignore
        formConfig.fields[fieldName][eventName](setDataFnArgs)
    }
}



/**
 * Функция устанавливающая любые данные поля
 * @param {Object} formState — состояние формы
 * @param {Function} setFormState — функция устанавливающая состояние формы
 * @param {String} dataType — тип устанавливаемых данных: value — значение поля, data — данные поля
 */
function getSetFieldData(
    formState: FHTypes.FormState,
    setFormState: FHTypes.SetFormState,
    dataType: 'value' | 'data'
) {
    return function (newData: FHTypes.FieldData, fieldName: string) {

        const field = formState.fields[fieldName]
        let newField = {}
        if (dataType === 'value') {
            newField = {...field, value: newData}
        }
        else if (dataType === 'data') {
            newField = {...field, data: newData}
        }

        const newState: FHTypes.FormState = makeImmutableObj(formState, field, newField);

        setFormState(newState)
    }
}

