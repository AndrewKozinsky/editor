import FHTypes from '../types'
import makeImmutableObj from '../../makeImmutableCopy/makeImmutableCopy'
import getNickFormState from '../return-func/getNickFormState'


/**
 * Функция запускаемая при изменении Состояния формы
 * @param {Object} formConfig — объект конфигурации
 * @param {Object} formState — объект Состояния формы
 * @param {Function} setFormState — функция устанавливающая новое состояние формы
 * @param {Function} setCanRunStateChangeHandler — функция устанавливающая можно ли запускать обработчик изменения Состояния
 */
export default function stateChangeHandler(
    formConfig: FHTypes.FormConfig,
    formState: FHTypes.FormState,
    setFormState: FHTypes.SetFormState,
    setCanRunStateChangeHandler: FHTypes.SetCanRunStateChangeHandler
) {
    // Перебрать поля объекта Состояния
    for (let fieldName in formConfig.fields) {
        // Текущее поле
        const field = formConfig.fields[fieldName]

        // Если в поле есть подписка на событие изменения Состояния формы
        if (field.stateChange) {

            // Объект передаваемый в функцию запускаемую после обновления Состояния формы
            const formDetails: FHTypes.FormDetails = {
                // Данные по всем полям без лишних сведений
                formState: getNickFormState(formState),
                // Метод устанавливающий новое значение поля
                setFieldValue: getSetFieldData(formState, setFormState, setCanRunStateChangeHandler, 'value'),
                // Метод устанавливающий новые данные поля
                setFieldData: getSetFieldData(formState, setFormState, setCanRunStateChangeHandler, 'data'),
            }

            field.stateChange(formDetails)
        }
    }
}


/**
 * Функция устанавливающая любые данные поля
 * @param {Object} formState — состояние формы
 * @param {Function} setFormState — функция устанавливающая состояние формы
 * @param {Function} setCanRunStateChangeHandler — функция устанавливающая можно ли запускать обработчик изменения Состояния
 * @param {String} dataType — тип устанавливаемых данных: value — значение поля, data — данные поля
 */
function getSetFieldData(
    formState: FHTypes.FormState,
    setFormState: FHTypes.SetFormState,
    setCanRunStateChangeHandler: FHTypes.SetCanRunStateChangeHandler,
    dataType: 'value' | 'data'
) {
    return function (newData: FHTypes.FieldData, fieldName: string) {

        // Запретить вызов обработчика изменения Состояния чтобы не получилось циклического изменения состояния
        setCanRunStateChangeHandler(false)
        // Позволить вызов обработчика изменения Состояния через небольшое время
        setTimeout(() => {setCanRunStateChangeHandler(true)}, 50)

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
