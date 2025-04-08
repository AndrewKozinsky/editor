import * as yup from 'yup'
import FCType from 'libs/FormConstructor/FCType'
import siteTemplateSectionMsg from 'messages/siteTemplateSectionMessages'
import createSiteTemplateRequest, {CreateNewSiteTemplateValuesType} from 'requests/editor/siteTemplate/createSiteTemplateRequest'
import { afterSubmit } from './siteTemplateForm-func'
import checkCodeSiteTemplate from '../checkCodeFn/checkCodeSiteTemplate'


/** Объект конфигурации формы создания нового шаблона сайта */
const newSiteTemplateFormConfig: FCType.Config = {
    fields: {
        content: {
            fieldType: 'text',
            schema: (fields) => {
                return yup.string()
                    .required(siteTemplateSectionMsg.codeInputRequired)
                    .test('check-code', siteTemplateSectionMsg.codeInputIsWrong,
                        function(code) {
                            return !checkCodeSiteTemplate(code).length
                        }
                    )
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
            text: siteTemplateSectionMsg.submitBtnTextNew,
            icon: 'btnSignAdd'
        },
    },
    async requestFn(readyFieldValues, outerFns, formDetails) {
        // Создать новый шаблон сайта...
        return await createSiteTemplateRequest(readyFieldValues as CreateNewSiteTemplateValuesType)
    },
    afterSubmit
}

export default newSiteTemplateFormConfig
