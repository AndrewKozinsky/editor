import * as yup from 'yup'
import FCType from 'libs/FormConstructor/FCType'
import metaTemplateSectionMsg from 'messages/metaTemplateSectionMessages'
import createMetaTemplateRequest, {CreateNewMetaTemplateValuesType} from 'requests/editor/metaTemplate/createMetaTemplateRequest'
import { afterSubmit } from './metaForm-func'
import checkMetaTemplateCode from '../checkCodeFn/checkMetaTemplateCode'


/** Объект конфигурации формы создания нового шаблона сайта */
const newMetaTemplateFormConfig: FCType.Config = {
    fields: {
        content: {
            fieldType: 'text',
            schema: (fields) => {
                return yup.string()
                    .required(metaTemplateSectionMsg.codeInputRequired)
                    .test('check-code', metaTemplateSectionMsg.codeInputIsWrong,
                        function(code) {
                            return !checkMetaTemplateCode(code).length
                        }
                    )
            },
            fieldData: {
                inputType: 'textarea',
                label: metaTemplateSectionMsg.templateCodeInput,
                autoFocus: true
            }
        }
    },
    bottom: {
        submit: {
            text: metaTemplateSectionMsg.submitBtnTextNew,
            icon: 'btnSignAdd'
        },
    },
    async requestFn(readyFieldValues, outerFns, formDetails) {
        // Создать новый шаблон сайта...
        return await createMetaTemplateRequest(readyFieldValues as CreateNewMetaTemplateValuesType)
    },
    afterSubmit
}

export default newMetaTemplateFormConfig
