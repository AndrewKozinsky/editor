import React from 'react'
import * as yup from 'yup'
import FCType from 'libs/FormConstructor/FCType'
import updateSiteRequest, { UpdateSiteRequestValuesType } from 'requests/editor/sites/updateSiteRequest'
import DeleteSiteButton from '../DeleteSiteButton/DeleteSiteButton'
import { afterSubmit } from './SiteSection-func'
import siteSectionMsg from 'messages/groupSectionMessages'
import { getState } from 'utils/miscUtils'

/** Объект конфигурации формы редактирования существующего сайта */
const currentSiteFormConfig: FCType.Config = {
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
                label: siteSectionMsg.defaultSiteTemplateIdInput,
                options: [],
            }
        },
        defaultMetaTemplateId: {
            fieldType: 'select',
            fieldData: {
                label: siteSectionMsg.defaultMetaTemplateIdInput,
                options: [],
            }
        },
    },
    bottom: {
        submit: {
            text: siteSectionMsg.submitBtnTextSave,
            icon: 'btnSignSave'
        },
        elems: [<DeleteSiteButton key={2} />],
        hr: true
    },
    async requestFn(readyFieldValues, outerFns, formDetails) {
        // Обновить данные сайта
        // id выбранного сайта
        const siteId = getState().sites.currentSiteId

        return await updateSiteRequest(readyFieldValues as UpdateSiteRequestValuesType, siteId)
    },
    afterSubmit
}

export default currentSiteFormConfig
