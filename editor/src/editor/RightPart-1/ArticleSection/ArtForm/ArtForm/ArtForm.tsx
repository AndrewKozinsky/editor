import React from 'react'
import useFormConstructorState from 'src/libs/FormConstructor/state/useFormConstructorState'
import FormConstructor from 'src/libs/FormConstructor/FormConstructor'
import artFormConfig from './formConfig'
import {
    useFillSiteTemplatesSelect,
    useGetArtDataFromServerAndSetInStore,
    useSetAnotherFormData
} from './ArtForm-func'
import EditArticleSection from '../EditArticleSection/EditArticleSection'

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
