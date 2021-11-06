import * as yup from 'yup'
import FCType from 'src/libs/FormConstructor/FCType'
import createSiteTemplateRequest, {CreateNewSiteTemplateValuesType} from 'src/requests/editor/siteTemplate/createSiteTemplateRequest'
import { afterSubmit } from './siteTemplateForm-func'


/** Функция возвращает конфигурацию формы создания нового шаблона сайта */
function getNewSiteTemplateFormConfig(siteTemplateSectionMsg: any) {
    const config: FCType.Config = {
        fields: {
            content: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .required(siteTemplateSectionMsg.codeInputRequired)
                },
                fieldData: {
                    inputType: 'textarea',
                    label: siteTemplateSectionMsg.templateCodeInput,
                    autoFocus: true
                }
            }
        },
        bottom: {
            submit: {
                text: siteTemplateSectionMsg.submitBtnTextNew, // Это значение должен изменять хук в зависимости от типа формы!!!
                icon: 'btnSignAdd' // Это значение должен изменять хук в зависимости от типа формы!!!
            },
        },
        async requestFn(readyFieldValues, outerFns, formDetails) {
            // Создать новый шаблон сайта...
            return await createSiteTemplateRequest(readyFieldValues as CreateNewSiteTemplateValuesType)
        },
        afterSubmit
    }

    return config
}

export default getNewSiteTemplateFormConfig
