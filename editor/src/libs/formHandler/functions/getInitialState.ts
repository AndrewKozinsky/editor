import {useEffect} from 'react'
import {
    FieldsObjType,
    // FieldTypeType,
    formConfigType,
    StateType,
    // ValueType,
    // ValueTypeType
} from '../types'


export default function getInitialState(formConfig: formConfigType): StateType {

    // При первоначальной инициализации поставить только значения полей
    // Данные о полях формы
    let fields: FieldsObjType = {}

    // Проход по полям формы для наполнения fields данными о полях
    for (let key in formConfig.fields) {
        fields[key] = {
            value: formConfig.fields[key].initialValue || [''],
            // Эти значения временные чтобы TS не ругался
            fieldType: 'radio',
            valueCount: 'one'
        }
    }

    return {
        fields
    }
}
