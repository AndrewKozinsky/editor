import React from 'react'
import * as yup from 'yup'
import FCType from 'libs/FormConstructor/FCType'
import siteTemplateSectionMsg from 'messages/siteTemplateSectionMessages'
import { store } from 'store/rootReducer'
import { afterSubmit } from './siteTemplateForm-func'
import {CreateNewSiteTemplateValuesType} from 'requests/editor/siteTemplate/createSiteTemplateRequest'
import updateSiteTemplateRequest from 'requests/editor/siteTemplate/updateSiteTemplateRequest'
import DeleteSiteTemplateButton from '../DeleteSiteTemlateButton/DeleteSiteTemplateButton'
import checkCodeSiteTemplate from '../CodeHelper/checkCodeSiteTemplate'

/** Объект конфигурации формы входа в сервис */
const currentSiteTemplateFormConfig: FCType.Config = {
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
            text: siteTemplateSectionMsg.submitBtnTextSave, // Это значение должен изменять хук в зависимости от типа формы!!!
            icon: 'btnSignSave' // Это значение должен изменять хук в зависимости от типа формы!!!
        },
        elems: [<DeleteSiteTemplateButton key={2} />],
        hr: true
    },
    async requestFn(readyFieldValues, outerFns, formDetails) {
        const { currentTemplateId } = store.getState().sites.siteTemplatesSection

        // Обновить данные шаблона сайта
        return await updateSiteTemplateRequest(
            readyFieldValues as CreateNewSiteTemplateValuesType, currentTemplateId
        )
    },
    afterSubmit
}

export default currentSiteTemplateFormConfig
