import FHTypes from '../types'


/**
 * Функция создаёт первоначальное объект Состояния формы
 * @param formConfig
 */
export default function getInitialState(formConfig: FHTypes.FormConfig): FHTypes.FormState {

    // При первоначальной инициализации поставить только значения полей
    // Данные о полях формы
    let fields: FHTypes.FieldsObj = {}

    // Проход по полям формы для наполнения fields данными о полях
    for (let key in formConfig.fields) {
        fields[key] = {
            value: formConfig.fields[key].initialValue,
            // Эти значения временные чтобы TS не ругался
            fieldType: 'radio',
            valueCount: 'one',
        }

        if (formConfig.fields[key].initialData) {
            fields[key].data = formConfig.fields[key].initialData
        }
    }

    return {
        fields
    }
}
