import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import FieldGroup from 'common/formElements/FieldGroup/FieldGroup'
import messages from '../messages';
import {AppState} from 'store/rootReducer'
import actions from '../../../store/rootAction';


export default function LanguageSection() {

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    const onChangeHandler = useGetOnChangeHandler()

    return (
        <FieldGroup
            label={messages.LanguageSection.langRadiosHeader[lang]}
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


function useGetOnChangeHandler() {
    const dispatch = useDispatch()

    return function (e: React.BaseSyntheticEvent) {
        const value = e.target.value

        dispatch(actions.settings.setEditorLanguage(value))
    }
}