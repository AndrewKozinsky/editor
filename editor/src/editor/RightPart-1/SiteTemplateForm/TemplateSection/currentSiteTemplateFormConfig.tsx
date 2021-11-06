import * as yup from 'yup'
import FCType from 'src/libs/FormConstructor/FCType'
import { store } from 'src/store/rootReducer'
import { afterSubmit } from './siteTemplateForm-func'
import {CreateNewSiteTemplateValuesType} from 'src/requests/editor/siteTemplate/createSiteTemplateRequest'
import updateSiteTemplateRequest from 'src/requests/editor/siteTemplate/updateSiteTemplateRequest'
import React from 'react'
import DeleteSiteTemplateButton from '../DeleteSiteTemlateButton/DeleteSiteTemplateButton'

/** Функция возвращает конфигурацию формы входа в сервис */
function getCurrentSiteTemplateFormConfig(siteTemplateSectionMsg: any) {
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

    return config
}

export default getCurrentSiteTemplateFormConfig


