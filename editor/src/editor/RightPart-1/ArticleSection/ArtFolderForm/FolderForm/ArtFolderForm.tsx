import React from 'react'
import useFormConstructorState from 'src/libs/FormConstructor/state/useFormConstructorState'
import FormConstructor from 'src/libs/FormConstructor/FormConstructor'
import { useGetAnotherFolderData } from './ArticlesFolderForm-func'
import artFolderFormConfig from './formConfig'


/** Компонент формы редактирования папки со статьями */
export default function ArtFolderForm() {
    // Объект состояния формы
    const formState = useFormConstructorState(artFolderFormConfig)

    // Хук изменяет код папки статьи в поле Название при переключении папки
    useGetAnotherFolderData(formState)

    return <FormConstructor config={artFolderFormConfig} state={formState} />
}
