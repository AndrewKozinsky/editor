import React from 'react'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import CodeHelper from 'editor/special/CodeHelper/CodeHelper/CodeHelper'
import checkMetaTemplateCode, { metaTemplateCodeExample } from '../checkCodeFn/checkMetaTemplateCode'
import newMetaTemplateFormConfig from './newMetaTemplateFormConfig'
import currentMetaTemplateFormConfig from './currentMetaTemplateFormConfig'
import { useSetMetaTemplateCode } from './metaForm-func'


/** Форма создания или редактирования шаблона подключаемых файлов */
export default function MetaTemplateForm() {
    // id выбранного шаблона сайта. В зависимости от значения будет отрисоваться
    // или форма создания нового шаблона сайта или редактирования существующего.
    const { currentTemplateId } = useGetSitesSelectors().metaTemplatesSection

    return currentTemplateId ? <ExistingTemplateForm /> : <NewTemplateForm />
}

/* Форма создания нового шаблона сайта */
function NewTemplateForm() {
    // Объект состояния формы
    const formState = useFormConstructorState(newMetaTemplateFormConfig)

    return (
        <>
            <FormConstructor config={newMetaTemplateFormConfig} state={formState} />
            <CodeHelper
                code={formState.fields.content.value[0]}
                checkCodeFn={checkMetaTemplateCode}
                codeExample={metaTemplateCodeExample}
            />
        </>
    )
}

/* Форма редактирования существующего шаблона сайта */
function ExistingTemplateForm() {
    // Объекты конфигурации и состояния формы
    const formState = useFormConstructorState(currentMetaTemplateFormConfig)

    // Хук изменяет код шаблона метаданных в поле Код шаблона при переключении шаблона
    useSetMetaTemplateCode(formState)

    return (
        <>
            <FormConstructor config={currentMetaTemplateFormConfig} state={formState} />
            <CodeHelper
                code={formState.fields.content.value[0]}
                checkCodeFn={checkMetaTemplateCode}
                codeExample={metaTemplateCodeExample}
            />
        </>
    )
}
