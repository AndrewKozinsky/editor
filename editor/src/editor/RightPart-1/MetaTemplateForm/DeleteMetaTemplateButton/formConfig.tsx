import FCType from 'libs/FormConstructor/FCType'
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import StoreSitesTypes from 'store/site/sitesTypes'
import sitesActions from 'store/site/sitesActions'
import deleteMetaTemplateRequest from 'requests/editor/metaTemplate/deleteMetaTemplateRequest'
import updateSiteRequest from 'requests/editor/sites/updateSiteRequest'
import metaTemplateSectionMsg from 'messages/metaTemplateSectionMessages'
import { getState } from 'utils/miscUtils'

/**
 * Функция возвращает конфигурацию формы удаления сайта
 * @param {Object} siteTemplateSectionMsg — объект с текстами ошибок
 */
const deleteMetaTemplateModalConfig: FCType.Config = {
    bottom: {
        submit: {
            color: 'accent',
            text: metaTemplateSectionMsg.deleteBtnInModal,
            icon: 'btnSignTrash',
            block: true,
            align: 'center'
        },
    },
    async requestFn() {
        const { currentTemplateId } = getState().sites.metaTemplatesSection
        return await deleteMetaTemplateRequest(currentTemplateId)
    },
    afterSubmit(response, outerFns, formDetails) {
        if (response.status === 'success') {
            // Если удаляемый шаблон стоит в качестве шаблона метаданных по умолчанию,
            // то обнулить шаблон метаданных сайта по умолчанию.
            clearDefaultMetaTemplateIfTemplateWasDeleted()

            // Закрыть модальное окно
            store.dispatch(actions.modal.closeModal())

            // Скачать новый список шаблонов метаданных сайта и поставить в Хранилище
            store.dispatch(sitesActions.requestMetaTemplates())

            const { currentSiteId } = getState().sites

            // Обнулить id выбранного шаблона метаданных сайта
            store.dispatch(sitesActions.setCurrentMetaTemplateIdOuter(currentSiteId, null))
        }
    },
}

export default deleteMetaTemplateModalConfig

/** Функция вычисляет является ли удаляемый шаблон метаданных сайта шаблоном по умолчанию.
 * Если является, то делается запрос на сервер, чтобы очистить id шаблона метаданных сайта по умолчанию */
function clearDefaultMetaTemplateIfTemplateWasDeleted() {
    const deletedTempId = getState().sites.metaTemplatesSection.currentTemplateId
    const currentMetaTempId = getCurrentMetaTempId()

    if (deletedTempId === currentMetaTempId) {
        clearCurrentMetaDefaultTemplate()
    }
}

/** Функция возвращает id шаблона метаданных текущего сайта */
function getCurrentMetaTempId() {
    const { currentSiteId } = getState().sites

    const currentSite = getState().sites.sites.find((site: StoreSitesTypes.Site) => {
        return site.id === currentSiteId
    })

    return currentSite?.defaultSiteTemplateId
}

/** Функция делает запрос на обнуление шаблона текущего сайта */
async function clearCurrentMetaDefaultTemplate() {
    const { currentSiteId } = getState().sites

    await updateSiteRequest({ defaultMetaTemplateId: null }, currentSiteId)

    // Скачать новый список сайтов и поставить в Хранилище
    await store.dispatch(sitesActions.requestSites())
}
