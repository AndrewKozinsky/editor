import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import FieldGroup from 'common/formElements/FieldGroup/FieldGroup'
import {AppState} from 'store/rootReducer'
import actions from 'store/rootAction'
import { languageSectionMessages } from 'messages/languageSectionMessages'


export default function LanguageSection() {

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Обработчик выбора другого языка
    const onChangeHandler = useGetOnChangeHandler()

    return (
        <FieldGroup
            label={languageSectionMessages.langRadiosHeader}
            inputType='radio'
            groupName='language'
            value={[lang]}
            onChange={onChangeHandler}
            inputsArr={
                [
                    { value: 'eng', label: 'English' },
                    { value: 'rus', label: 'Русский' }
                ]
            }
        />
    )
}

/** Хук возвращает функцию-обработчик выбора другого языка */
function useGetOnChangeHandler() {
    const dispatch = useDispatch()

    return function (e: React.BaseSyntheticEvent) {
        const value = e.target.value

        dispatch(actions.settings.setEditorLanguage(value))
    }
}
