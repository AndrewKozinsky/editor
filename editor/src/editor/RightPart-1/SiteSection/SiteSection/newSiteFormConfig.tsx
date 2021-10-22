import * as yup from 'yup'
import FCType from 'src/libs/FormConstructor/FCType'
import actions from 'src/store/rootAction'
import { store } from 'src/store/rootReducer'
import createSiteRequest, { CreateSiteRequestValuesType } from 'src/requests/editor/sites/createSiteRequest'


/** Функция возвращает конфигурацию формы входа в сервис */
function getNewSiteFormConfig(siteSectionMsg: any) {
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
        async afterSubmit(response, outerFns, formDetails) {
            // Если сайт успешно создан...
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

export default getNewSiteFormConfig
