import FCType from 'libs/FormConstructor/FCType'
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import StoreSitesTypes from 'store/site/sitesTypes'
import deleteSiteTemplateRequest from 'requests/editor/siteTemplate/deleteSiteTemplateRequest'
import updateSiteRequest, {UpdateSiteRequestValuesType} from 'requests/editor/sites/updateSiteRequest'
import siteTemplateSectionMsg from 'messages/siteTemplateSectionMessages'

/**
 * Функция возвращает конфигурацию формы удаления сайта
 * @param {Object} siteTemplateSectionMsg — объект с текстами ошибок
 */
const deleteSiteTemplateModalConfig: FCType.Config = {
    bottom: {
        submit: {
            text: siteTemplateSectionMsg.deleteBtnInModal,
        },
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

export default deleteSiteTemplateModalConfig

/** Функция вычисляет является ли удаляемый шаблон сайта шаблоном по умолчанию.
 * Если является, то делается запрос на сервер чтобы очистить id шаблона сайта по умолчанию */
function clearDefaultSiteTemplateIfTemplateWasDeleted() {
    const deletedTempId = store.getState().sites.siteTemplatesSection.currentTemplateId
    const currentSiteTempId = getCurrentSiteTempId()

    if (deletedTempId === currentSiteTempId) {
        clearCurrentSiteDefaultTemplate()
    }
}

/** Функция возвращает id шаблона текущего сайта */
function getCurrentSiteTempId() {
    const { currentSiteId } = store.getState().sites

    const currentSite = store.getState().sites.sites.find((site: StoreSitesTypes.Site) => {
        return site.id === currentSiteId
    })

    return currentSite?.defaultSiteTemplateId
}

/** Функция делает запрос на обнуление шаблона текущего сайта */
async function clearCurrentSiteDefaultTemplate() {
    const { currentSiteId } = store.getState().sites

    await updateSiteRequest({ defaultSiteTemplateId: null }, currentSiteId)

    // Скачать новый список сайтов и поставить в Хранилище
    await store.dispatch(actions.sites.requestSites())
}
