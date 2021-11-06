import React from 'react'
import FCType from 'libs/FormConstructor/FCType'
import CloseModalButton from './CloseModalButton'
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import deleteSiteTemplateRequest from 'requests/editor/siteTemplate/deleteSiteTemplateRequest'

/**
 * Функция возвращает конфигурацию формы входа в сервис
 * @param {Object} siteTemplateSectionMsg — объект с текстами ошибок
 */
function getConfig(siteTemplateSectionMsg: any) {
    const config: FCType.Config = {
        bottom: {
            submit: {
                text: siteTemplateSectionMsg.deleteBtnInModal,
            },
            elems: [<CloseModalButton key={2} />]
        },
        async requestFn() {
            const { currentTemplateId } = store.getState().sites.siteTemplatesSection
            return await deleteSiteTemplateRequest(currentTemplateId)
        },
        afterSubmit(response, outerFns, formDetails) {
            if (response.status === 'success') {
                // Закрыть модальное окно
                store.dispatch(actions.modal.closeModal())

                // Скачать новый список шаблонов сайта и поставить в Хранилище
                store.dispatch(actions.sites.requestSiteTemplates())

                // Обнулить id выбранного шаблона сайта
                store.dispatch(actions.sites.setCurrentSiteTemplateId(null))
            }
        },
    }

    return config
}

export default getConfig
