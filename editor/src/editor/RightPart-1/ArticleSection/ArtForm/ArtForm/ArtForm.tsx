import React from 'react'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import artFormConfig from './formConfig'
import {
    useFillSiteTemplatesSelect,
    useGetArtDataFromServerAndSetInStore,
    useSetAnotherFormData
} from './ArtForm-func'


/** Форма редактирования статьи */
export default function ArtForm() {
    // Объекты конфигурации и состояния формы
    const formState = useFormConstructorState(artFormConfig)

    // Скачать данные статьи с сервера и поставить в Хранилище
    useGetArtDataFromServerAndSetInStore()
    // Хук наполняет выпадающий список шаблона сайта в форме существующими значениями
    useFillSiteTemplatesSelect(formState)
    // Хук изменяет значения полей формы при переключении статей
    useSetAnotherFormData(formState)

    return <FormConstructor config={artFormConfig} state={formState} />
}
