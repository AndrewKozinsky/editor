import React from 'react'
import { useDispatch } from 'react-redux'
import FieldGroup from 'common/formElements/FieldGroup/FieldGroup'
import actions from 'store/rootAction'
import useGetSettingsSelectors from 'store/settings/settingsSelectors'
import { languageSectionMessages } from 'messages/languageSectionMessages'
import useGetMessages from 'messages/fn/useGetMessages'


export default function LanguageSection() {
    // Язык интерфейса
    const { editorLanguage } = useGetSettingsSelectors()

    // Обработчик выбора другого языка
    const onChangeHandler = useGetOnChangeHandler()

    const languageSectionMsg = useGetMessages(languageSectionMessages)

    return (
        <FieldGroup
            label={languageSectionMsg.langRadiosHeader}
            inputType='radio'
            groupName='language'
            value={[editorLanguage]}
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
