import FHTypes from '../types'


/**
 * Функция создаёт первоначальное объект Состояния формы
 * @param formConfig
 */
export default function getInitialState(formConfig: FHTypes.FormConfig): FHTypes.FormState {

    // Данные о полях формы
    let fields: FHTypes.FieldsStateObj = {}
    // Данные о форме
    let form: FHTypes.FormStateObj = {
        data: formConfig.form.initialData || null
    }

    // Проход по полям формы из объекта конфигурации для наполнения fields данными о полях
    for (let key in formConfig.fields) {
        fields[key] = {
            value: formConfig.fields[key].initialValue,
            // Эти значения временные чтобы TS не ругался
            fieldType: 'radio',
            valueCount: 'one',
            data: formConfig.fields[key].initialData || null
        }
    }

    return {
        fields,
        form
    }
}
