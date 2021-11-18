import React from 'react'
import FCType from 'libs/FormConstructor/FCType'
import CloseModalButton from './CloseModalButton'
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import StoreSitesTypes from 'store/site/sitesTypes'
import deleteSiteTemplateRequest from 'requests/editor/siteTemplate/deleteSiteTemplateRequest'
import updateSiteRequest, {UpdateSiteRequestValuesType} from '../../../../requests/editor/sites/updateSiteRequest'

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
                // Если удаляемый шаблон стоит в качестве шаблона сайта по умолчанию,
                // то обнулить шаблон сайта по умолчанию.
                clearDefaultSiteTemplateIfTemplateWasDeleted()

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


function clearDefaultSiteTemplateIfTemplateWasDeleted() {
    const deletedTempId = store.getState().sites.siteTemplatesSection.currentTemplateId
    const currentSiteTempId = getCurrentSiteTempId()

    if (deletedTempId === currentSiteTempId) {
        clearCurrentSiteDefaultTemplate()
    }
}

function getCurrentSiteTempId() {
    const { currentSiteId } = store.getState().sites

    const currentSite = store.getState().sites.sites.find((site: StoreSitesTypes.SiteType) => {
        return site.id === currentSiteId
    })

    return currentSite?.defaultSiteTemplateId
}

async function clearCurrentSiteDefaultTemplate() {
    const { currentSiteId } = store.getState().sites

    await updateSiteRequest({ defaultSiteTemplateId: null }, currentSiteId)

    // Скачать новый список сайтов и поставить в Хранилище
    await store.dispatch(actions.sites.requestSites())
}