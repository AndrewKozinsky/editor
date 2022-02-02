import * as yup from 'yup'
import FCType from 'libs/FormConstructor/FCType'
import siteSectionMsg from 'messages/groupSectionMessages'
import createSiteRequest, { CreateSiteRequestValuesType } from 'requests/editor/sites/createSiteRequest'
import { afterSubmit } from './SiteSection-func'


/** Конфигурация формы создания нового сайта */
const newSiteFormConfig: FCType.Config = {
    fields: {
        name: {
            fieldType: 'text',
            schema: (fields) => {
                return yup.string()
                    .required(siteSectionMsg.siteNameInputRequired)
                    .max(255, siteSectionMsg.siteNameInputIsTooLong)
            },
            fieldData: {
                label: siteSectionMsg.siteNameInput,
                placeholder: siteSectionMsg.siteNamePlaceholder,
                autoFocus: true
            }
        }
    },
    bottom: {
        submit: {
            text: siteSectionMsg.submitBtnTextNewSite, // Это значение должен изменять хук в зависимости от типа формы!!!
            icon: 'btnSignAdd' // Это значение должен изменять хук в зависимости от типа формы!!!
        },
        hr: true
    },
    async requestFn(readyFieldValues, outerFns, formDetails) {
        // Создать новый сайт...
        return await createSiteRequest(readyFieldValues as CreateSiteRequestValuesType)
    },
    afterSubmit
}

export default newSiteFormConfig