import React, { useCallback, useState } from 'react'
import {useDispatch} from 'react-redux'
import FieldGroup from 'common/formElements/FieldGroup/FieldGroup'
import { OuterOnChangeHandlerType } from 'common/formElements/outerOnChangeFn'
import Wrapper from 'common/Wrapper/Wrapper'
import Notice from 'common/textBlocks/Notice/Notice'
import languageSectionMsg from 'messages/languageSectionMessages'
import StoreSettingsTypes from 'store/settings/settingsTypes'
import settingsActions from 'store/settings/settingsActions'
import {getFromLocalStorage, setInLocalStorage} from 'utils/miscUtils'

/* Переключатели языка интерфейса */
export default function LanguageSection() {
    // Язык интерфейса
    const editorLang = getFromLocalStorage('editorLanguage', 'rus')

    const [showMessage, setShowMessage] = useState(false)

    // Обработчик выбора другого языка
    const onChangeHandler = useGetOnChangeHandler(setShowMessage)

    return (
        <>
            <FieldGroup
                label={languageSectionMsg.langRadiosHeader}
                inputType='radio'
                groupName='language'
                value={[editorLang]}
                onChange={onChangeHandler}
                inputsArr={
                    [
                        { value: 'eng', label: 'English' },
                        { value: 'rus', label: 'Русский' }
                    ]
                }
            />
            {showMessage && <Message />}
        </>
    )
}

/** Хук возвращает функцию-обработчик выбора другого языка */
function useGetOnChangeHandler(
    setShowMessage: (showMessage: boolean) => void
) {
    const dispatch = useDispatch()

    return useCallback(function (fieldData: OuterOnChangeHandlerType.FieldsData) {
        const value = fieldData.fieldValue[0] as StoreSettingsTypes.EditorLang
        dispatch(settingsActions.setEditorLang(value))
        setInLocalStorage('editorLanguage', value)

        setShowMessage(true)
    }, [])
}

function Message() {
    return (
        <Wrapper t={10}>
            <Notice icon='info' bg>
                <p>{languageSectionMsg.landWillChangeAfterReload}</p>
            </Notice>
        </Wrapper>
    )
}