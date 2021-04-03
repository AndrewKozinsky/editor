import FHTypes from '../types';

/**
 * Функция возращает объект с данными по полям без данных, которые не потребуются пользователю
 * @param {Object} formState — объект Состояния формы
 */
export default function getNickFormState(formState: FHTypes.FormState): FHTypes.NickFormState {
    const nickFormState: FHTypes.NickFormState = {}

    for(let fieldName in formState.fields) {
        const field = formState.fields[fieldName]

        nickFormState[fieldName] = {
            value: field.value,
            data: field.data
        }
    }

    return nickFormState
}