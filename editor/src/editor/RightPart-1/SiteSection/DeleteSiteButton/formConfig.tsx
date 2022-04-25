import FCType from 'libs/FormConstructor/FCType'
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import sitesActions from 'store/site/sitesActions'
import deleteSiteRequest from 'requests/editor/sites/deleteSiteRequest'
import articleManager from 'articleManager/articleManager'
import { getState, removeFromLocalStorage } from 'utils/miscUtils'
import siteSectionMsg from 'messages/groupSectionMessages'
import fireEvent from '../../../../event/fireEvent'


/** Объект конфигурации кнопки-формы удаления сайта */
const deleteSiteFormConfig: FCType.Config = {
    bottom: {
        submit: {
            text: siteSectionMsg.deleteSiteBtnText,
            color: 'accent'
        },
    },
    async requestFn() {
        const { currentSiteId } = getState().sites
        return await deleteSiteRequest(currentSiteId)
    },
    afterSubmit(response, outerFns, formDetails) {
        if (response.status === 'success') {
            afterSuccessSiteDeleting()
        }
    },
}

export default deleteSiteFormConfig

/** Функция срабатывающая после удаления сайта */
function afterSuccessSiteDeleting() {
    const deletedSiteId = getState().sites.currentSiteId
    const articleSiteId = getState().article.siteId

    // Очистить редактируемую статью если удалили сайт, к которому она относится
    if (deletedSiteId === articleSiteId) {
        // Закрыть статью
        fireEvent({event: 'closeArticle'})
    }

    // Закрыть модальное окно
    store.dispatch(actions.modal.closeModal())

    // Скачать новый список сайтов и поставить в Хранилище
    store.dispatch(sitesActions.requestSites())

    // Обнулить id выбранного сайта
    store.dispatch(sitesActions.setCurrentSiteIdOuter(null))

    // Удалить данные из LocalStorage потому что они относятся к удаляемому сайту
    const siteDataInLS = ['editorComponentType', 'editorArtOpenedFolders', 'editorCompOpenedFolders', 'editorArticleType', 'editorComponentId', 'editorSiteId', 'editorSiteTemplateId', 'editorMetaTemplateId']
    siteDataInLS.forEach(function (propName) {
        removeFromLocalStorage(propName)
    })
}
