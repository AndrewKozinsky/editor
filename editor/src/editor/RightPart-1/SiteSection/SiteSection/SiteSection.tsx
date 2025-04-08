import React from 'react'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import newSiteFormConfig from './newSiteFormConfig'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import currentSiteFormConfig from './currentSiteFormConfig'
import {
    useSetSiteName,
    useSetSiteTemplates,
    useSetMetaTemplates
} from './SiteSection-func'
import './SiteSection.scss'


/** Блок с формой изменения данных выбранного сайта */
export default function SiteSection() {
    // id выбранного сайта. В зависимости от значения будет отрисоваться
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
    const formState = useFormConstructorState(newSiteFormConfig)
    return <FormConstructor config={newSiteFormConfig} state={formState} />
}

/* Форма редактирования существующего сайта */
function ExistingSiteForm() {
    // Объект состояния формы
    const formState = useFormConstructorState(currentSiteFormConfig)

    // Хук изменяет имя сайта в поле Название при переключении сайта
    useSetSiteName(formState)

    // Хук добавляет в форму выпадающий список шаблонов сайта, если они имеются
    useSetSiteTemplates(formState)

    // Хук добавляет в форму выпадающий список шаблоны метаданных, если они имеются
    useSetMetaTemplates(formState)

    return <FormConstructor config={currentSiteFormConfig} state={formState} />
}
