import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import FieldGroup from 'common/formElements/FieldGroup/FieldGroup'
import messages from '../messages'
import {AppState} from 'store/rootReducer'
import actions from 'store/rootAction'


export default function SizeSection() {

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)
    const size = useSelector((store: AppState) => store.settings.editorSize)

    const onChangeHandler = useGetOnChangeHandler()

    return (
        <FieldGroup
            label={messages.SizeSection.sizeRadiosHeader[lang]}
            inputType='radio'
            groupName='size'
            value={[size]}
            onChange={onChangeHandler}
            inputsArr={
                [
                    { value: 'small', label: messages.SizeSection.smallLabel[lang] },
                    { value: 'middle', label: messages.SizeSection.middleLabel[lang] },
                    { value: 'big', label: messages.SizeSection.bigLabel[lang] }
                ]
            }
        />
    )
}


function useGetOnChangeHandler() {
    const dispatch = useDispatch()

    return function (e: React.BaseSyntheticEvent) {
        const value = e.target.value

        dispatch(actions.settings.setEditorSize(value))
    }
}