import React from 'react'
import useGetMessages from 'src/messages/fn/useGetMessages'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import { componentFormMessages } from 'messages/componentTemplateFormMessages'
import getFormConfig from './formConfig'
import {
    useGetComDataFromServerAndSetInStore,
    useSetAnotherFormData
} from './ComponentForm-func'
import CodeHelper from '../CodeHelper/CodeHelper'

export default function CompForm() {
    // Сообщения формы
    const componentFormMsg = useGetMessages(componentFormMessages)

    // Объекты конфигурации и состояния формы
    const config = getFormConfig(componentFormMsg)
    const formState = useFormConstructorState(config)

    // Скачать данные компонента с сервера и поставить в Хранилище
    useGetComDataFromServerAndSetInStore()
    // Хук изменяет значения полей формы компонента после скачивания других данных компонента
    useSetAnotherFormData(formState)

    return (
        <>
            <FormConstructor config={config} state={formState} />
            <CodeHelper code={formState.fields.content.value[0]} />
        </>
    )
}
