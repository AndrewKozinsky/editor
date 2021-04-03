import FHTypes from '../types'


/**
 * Функция возращает данные по полям
 * @param formState
 */
export default function getFields(formState: FHTypes.FormState): FHTypes.ReturnFields {
    // Формирование объекта с данными о полях
    const fields: FHTypes.ReturnFields = {}

    for(let key in formState.fields) {
        fields[key] = {
            value: formState.fields[key].value,
            data: formState.fields[key].data
        }
    }

    return fields
}





