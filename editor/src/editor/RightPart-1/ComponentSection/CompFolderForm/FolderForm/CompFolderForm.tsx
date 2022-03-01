import React from 'react'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import { useGetAnotherFolderData } from './ComponentsFolderForm-func'
import compFolderFormConfig from './formConfig'


/** Компонент формы редактирования папки компонента */
export default function CompFolderForm() {
    // Объект состояния формы
    const formState = useFormConstructorState(compFolderFormConfig)

    // Хук изменяет код папки компонента в поле Название при переключении папки
    useGetAnotherFolderData(formState)

    return <FormConstructor config={compFolderFormConfig} state={formState} />
}
