import React from 'react'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import newSiteTemplateFormConfig from './newSiteTemplateFormConfig'
import currentSiteTemplateFormConfig from './currentSiteTemplateFormConfig'
import { useSetSiteTemplateCode } from './siteTemplateForm-func'
import checkCodeSiteTemplate, { templateCodeExample } from '../checkCodeFn/checkCodeSiteTemplate'
import CodeHelper from 'editor/special/CodeHelper/CodeHelper/CodeHelper'


/** Форма создания или редактирования шаблона подключаемых файлов */
export default function SiteTemplateForm() {
    // id выбранного шаблона сайта. В зависимости от значения будет отрисоваться
    // или форма создания нового шаблона сайта или редактирования существующего.
    const { currentTemplateId } = useGetSitesSelectors().siteTemplatesSection

    return currentTemplateId ? <ExistingSiteTemplateForm /> : <NewSiteTemplateForm />
}

/* Форма создания нового шаблона сайта */
function NewSiteTemplateForm() {
    // Объект состояния формы
    const formState = useFormConstructorState(newSiteTemplateFormConfig)

    return (
        <>
            <FormConstructor config={newSiteTemplateFormConfig} state={formState} />
            <CodeHelper
                code={formState.fields.content.value[0]}
                checkCodeFn={checkCodeSiteTemplate}
                codeExample={templateCodeExample}
            />
        </>
    )
}

/* Форма редактирования существующего шаблона сайта */
function ExistingSiteTemplateForm() {
    // Объекты конфигурации и состояния формы
    const formState = useFormConstructorState(currentSiteTemplateFormConfig)

    // Хук изменяет код шаблона сайта в поле Код шаблона при переключении шаблона
    useSetSiteTemplateCode(formState)

    return (
        <>
            <FormConstructor config={currentSiteTemplateFormConfig} state={formState} />
            <CodeHelper
                code={formState.fields.content.value[0]}
                checkCodeFn={checkCodeSiteTemplate}
                codeExample={templateCodeExample}
            />
        </>
    )
}
