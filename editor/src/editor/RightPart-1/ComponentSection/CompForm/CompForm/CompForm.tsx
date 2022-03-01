import React from 'react'
import useFormConstructorState from 'src/libs/FormConstructor/state/useFormConstructorState'
import FormConstructor from 'src/libs/FormConstructor/FormConstructor'
import CodeHelper from 'src/editor/special/CodeHelper/CodeHelper/CodeHelper'
import checkComponentCode, { componentCodeExample } from '../CodeHelper/checkComponentCode'
import compFormConfig from './formConfig'
import {
    useGetComDataFromServerAndSetInStore,
    useSetAnotherFormData
} from './ComponentForm-func'

/** Форма редактирования компонента */
export default function CompForm() {
    // Объект состояния формы
    const formState = useFormConstructorState(compFormConfig)

    // Скачать данные компонента с сервера и поставить в Хранилище
    useGetComDataFromServerAndSetInStore()
    // Хук изменяет значения полей формы компонента после скачивания других данных компонента
    useSetAnotherFormData(formState)

    return (
        <>
            <FormConstructor config={compFormConfig} state={formState} />
            <CodeHelper
                code={formState.fields.content.value[0]}
                checkCodeFn={checkComponentCode}
                codeExample={componentCodeExample}
            />
        </>
    )
}
