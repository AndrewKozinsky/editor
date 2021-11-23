import React from 'react'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import useGetMessages from 'messages/fn/useGetMessages'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import {siteTemplateSectionMessages} from 'messages/siteTemplateSectionMessages'
import getNewSiteTemplateFormConfig from './newSiteTemplateFormConfig'
import getCurrentSiteTemplateFormConfig from './currentSiteTemplateFormConfig'
import { useSetSiteTemplateCode } from './siteTemplateForm-func'
import CodeHelper from '../CodeHelper/CodeHelper'


/** Форма создания или редактирования шаблона подключаемых файлов */
export default function SiteTemplateForm() {
    // id выбранного шаблона сайта. В зависимости от значения будет отрисовываться
    // или форма создания нового шаблона сайта или редактирования существующего.
    const { currentTemplateId } = useGetSitesSelectors().siteTemplatesSection

    return currentTemplateId ? <ExistingSiteTemplateForm /> : <NewSiteTemplateForm />
}

/* Форма создания нового шаблона сайта */
function NewSiteTemplateForm() {
    // Сообщения формы
    const siteTemplateSectionMsg = useGetMessages(siteTemplateSectionMessages)

    // Объекты конфигурации и состояния формы
    const config = getNewSiteTemplateFormConfig(siteTemplateSectionMsg)
    const formState = useFormConstructorState(config)

    return (
        <>
            <FormConstructor config={config} state={formState} />
            <CodeHelper code={formState.fields.content.value[0]} />
        </>
    )
}

/* Форма редактирования существующего шаблона сайта */
function ExistingSiteTemplateForm() {

    // Сообщения формы
    const siteTemplateSectionMsg = useGetMessages(siteTemplateSectionMessages)

    // Объекты конфигурации и состояния формы
    const config = getCurrentSiteTemplateFormConfig(siteTemplateSectionMsg)
    const formState = useFormConstructorState(config)

    // Хук изменяет код шаблона сайта в поле Код шаблона при переключении шаблона
    useSetSiteTemplateCode(formState)

    return (
        <>
            <FormConstructor config={config} state={formState} />
            <CodeHelper code={formState.fields.content.value[0]} />
        </>
    )
}
