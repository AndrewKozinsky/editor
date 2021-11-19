import React from 'react'
import { articleFolderFormMessages } from 'messages/articleFolderFormMessages'
import useGetMessages from 'messages/fn/useGetMessages'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import { useGetAnotherFolderData } from './ArticlesFolderForm-func'
import getFormConfig from './formConfig'


/** Компонент формы редактирования папки */
export default function ArtFolderForm() {

    // Сообщения формы
    const compFolderFormMsg = useGetMessages(articleFolderFormMessages)

    // Объекты конфигурации и состояния формы
    const config = getFormConfig(compFolderFormMsg)
    const formState = useFormConstructorState(config)

    // Хук изменяет код папки статьи в поле Название при переключении папки
    useGetAnotherFolderData(formState)

    return <FormConstructor config={config} state={formState} />
}
