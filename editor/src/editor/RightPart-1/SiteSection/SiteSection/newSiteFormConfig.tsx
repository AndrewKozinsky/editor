import * as yup from 'yup'
import FCType from 'libs/FormConstructor/FCType'
import createSiteRequest, { CreateSiteRequestValuesType } from 'requests/editor/sites/createSiteRequest'
import { afterSubmit } from './SiteSection-func'


/** Функция возвращает конфигурацию формы входа в сервис */
export default function getNewSiteFormConfig(siteSectionMsg: any) {
    const config: FCType.Config = {
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

    return config
}
