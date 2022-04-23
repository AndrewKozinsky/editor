import React, { useCallback, useState } from 'react'
import FieldGroup from 'common/formElements/FieldGroup/FieldGroup'
import { OuterOnChangeHandlerType } from 'common/formElements/outerOnChangeFn'
import Wrapper from 'common/Wrapper/Wrapper'
import Notice from 'common/textBlocks/Notice/Notice'
import languageSectionMsg from 'messages/languageSectionMessages'

/* Переключатели языка интерфейса */
export default function LanguageSection() {
    // Язык интерфейса
    // const lsLang = getFromLocalStorage(config.ls.editorLanguage)
    const lsLang = 'rus'
    const [ language, setLanguage ] = useState(lsLang)

    const [showMessage, setShowMessage] = useState(false)

    // Обработчик выбора другого языка
    const onChangeHandler = useGetOnChangeHandler(setLanguage, setShowMessage)

    return (
        <>
            <FieldGroup
                label={languageSectionMsg.langRadiosHeader}
                inputType='radio'
                groupName='language'
                value={[language]}
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
    setLanguage: (lang: 'eng' | 'rus') => void,
    setShowMessage: (showMessage: boolean) => void
) {
    return useCallback(function (fieldData: OuterOnChangeHandlerType.FieldsData) {
        const value = fieldData.fieldValue[0] as 'eng' | 'rus'
        setLanguage(value)
        // setInLocalStorage(config.ls.editorLanguage, value)

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