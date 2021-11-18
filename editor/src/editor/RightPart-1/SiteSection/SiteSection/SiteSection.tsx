import React from 'react'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import getNewSiteFormConfig from './newSiteFormConfig'
import useGetMessages from 'messages/fn/useGetMessages'
import { siteSectionMessages } from 'messages/siteSectionMessages'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import getCurrentSiteFormConfig from './currentSiteFormConfig'
import {useSetSiteName, useSetSiteTemplates} from './SiteSection-func'
import './SiteSection.scss'


/** Блок с формой изменения данных выбранного сайта */
export default function SiteSection() {
    // id выбранного сайта. В зависимости от значения будет отрисовываться
    // или форма создания нового сайта или редактирования существующего.
    const { currentSiteId } = useGetSitesSelectors()

    return (
        <div className='site-section'>
            { currentSiteId ? <ExistingSiteForm /> : <NewSiteForm /> }
        </div>
    )
}

/* Форма создания нового сайта */
function NewSiteForm() {
    // Сообщения формы
    const siteSectionMsg = useGetMessages(siteSectionMessages)

    // Объекты конфигурации и состояния формы
    const config = getNewSiteFormConfig(siteSectionMsg)
    const formState = useFormConstructorState(config)

    return <FormConstructor config={config} state={formState} />
}

/* Форма редактирования существующего сайта */
function ExistingSiteForm() {

    // Сообщения формы
    const siteSectionMsg = useGetMessages(siteSectionMessages)

    // Объекты конфигурации и состояния формы
    const config = getCurrentSiteFormConfig(siteSectionMsg)
    const formState = useFormConstructorState(config)

    // Хук изменяет имя сайта в поле Название при переключении сайта
    useSetSiteName(formState)

    // Хук добавляет в форму выпадающий список шаблонов сайта если он имеется
    useSetSiteTemplates(formState)

    return <FormConstructor config={config} state={formState} />
}
