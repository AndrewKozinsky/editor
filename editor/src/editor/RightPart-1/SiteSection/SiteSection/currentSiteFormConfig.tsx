import React from 'react'
import * as yup from 'yup'
import FCType from 'libs/FormConstructor/FCType'
import updateSiteRequest, { UpdateSiteRequestValuesType } from 'requests/editor/sites/updateSiteRequest'
import { store } from 'store/rootReducer'
import DeleteSiteButton from '../DeleteSiteButton/DeleteSiteButton'
import { afterSubmit } from './SiteSection-func'

/** Функция возвращает конфигурацию формы входа в сервис */
function getCurrentSiteFormConfig(siteSectionMsg: any) {
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
                }
            },
            defaultSiteTemplateId: {
                fieldType: 'select',
                fieldData: {
                    label: siteSectionMsg.defaultTemplateInput,
                    options: [],
                }
            },
        },
        bottom: {
            submit: {
                text: siteSectionMsg.submitBtnTextSave, // Это значение должен изменять хук в зависимости от типа формы!!!
                icon: 'btnSignSave' // Это значение должен изменять хук в зависимости от типа формы!!!
            },
            elems: [<DeleteSiteButton key={2} />],
            hr: true
        },
        async requestFn(readyFieldValues, outerFns, formDetails) {
            // Обновить данные сайта
            // id выбранного сайта
            const siteId = store.getState().sites.currentSiteId

            // @ts-ignore
            return await updateSiteRequest(readyFieldValues as UpdateSiteRequestValuesType, siteId)
        },
        afterSubmit
    }

    return config
}

export default getCurrentSiteFormConfig


