import React from 'react'
import * as yup from 'yup'
import FCType from 'src/libs/FormConstructor/FCType'
import updateSiteRequest, { UpdateSiteRequestValuesType } from 'src/requests/editor/sites/updateSiteRequest'
import actions from 'src/store/rootAction'
import { store } from 'src/store/rootReducer'
import DeleteSiteButton from '../DeleteSiteButton/DeleteSiteButton'

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
            }
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
        async afterSubmit(response, outerFns, formDetails) {
            if (response.status === 'success') {

                // Скачать новый список сайтов и поставить в Хранилище
                await store.dispatch(actions.sites.requestSites())

                // Найти в Хранилище сайт с таким же id как у только что созданного сайта
                const newSite = store.getState().sites.sites.find((site: any) => {
                    // @ts-ignore
                    return site.id === response.data.sites[0].id
                })
                // Выделить созданный сайт
                store.dispatch(actions.sites.setCurrentSiteId(newSite.id))
            }
        }
    }

    return config
}

export default getCurrentSiteFormConfig


