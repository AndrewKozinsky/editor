import FCType from 'libs/FormConstructor/FCType'
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import StoreSitesTypes from 'store/site/sitesTypes'
import sitesActions from 'store/site/sitesActions'
import deleteSiteTemplateRequest from 'requests/editor/siteTemplate/deleteSiteTemplateRequest'
import updateSiteRequest from 'requests/editor/sites/updateSiteRequest'
import siteTemplateSectionMsg from 'messages/siteTemplateSectionMessages'
import { getState } from 'utils/miscUtils'

/**
 * Функция возвращает конфигурацию формы удаления сайта
 * @param {Object} siteTemplateSectionMsg — объект с текстами ошибок
 */
const deleteSiteTemplateModalConfig: FCType.Config = {
    bottom: {
        submit: {
            block: true,
            align: 'center',
            color: 'accent',
            icon: 'btnSignTrash',
            text: siteTemplateSectionMsg.deleteBtnInModal,
        },
    },
    async requestFn() {
        const { currentTemplateId } = getState().sites.siteTemplatesSection
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
            store.dispatch(sitesActions.requestSiteTemplates())

            // Обнулить id выбранного шаблона сайта
            // store.dispatch(sitesActions.setCurrentSiteTemplateIdOuter(null))
        }
    },
}

export default deleteSiteTemplateModalConfig

/** Функция вычисляет является ли удаляемый шаблон сайта шаблоном по умолчанию.
 * Если является, то делается запрос на сервер чтобы очистить id шаблона сайта по умолчанию */
function clearDefaultSiteTemplateIfTemplateWasDeleted() {
    const deletedTempId = getState().sites.siteTemplatesSection.currentTemplateId
    const currentSiteTempId = getCurrentSiteTempId()

    if (deletedTempId === currentSiteTempId) {
        clearCurrentSiteDefaultTemplate()
    }
}

/** Функция возвращает id шаблона текущего сайта */
function getCurrentSiteTempId() {
    const { currentSiteId } = getState().sites

    const currentSite = getState().sites.sites.find((site: StoreSitesTypes.Site) => {
        return site.id === currentSiteId
    })

    return currentSite?.defaultSiteTemplateId
}

/** Функция делает запрос на обнуление шаблона текущего сайта */
async function clearCurrentSiteDefaultTemplate() {
    const { currentSiteId } = getState().sites

    await updateSiteRequest({ defaultSiteTemplateId: null }, currentSiteId)

    // Скачать новый список сайтов и поставить в Хранилище
    await store.dispatch(sitesActions.requestSites())
}
