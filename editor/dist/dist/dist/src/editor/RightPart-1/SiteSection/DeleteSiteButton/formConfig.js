var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            }
        }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import actions from 'store/rootAction';
import { store } from 'store/rootReducer';
import deleteSiteRequest from 'requests/editor/sites/deleteSiteRequest';
import articleManager from 'articleManager/articleManager';
import { removeFromLocalStorage } from 'utils/MiscUtils';
/**
 * Функция возвращает конфигурацию кнопки-формы удаления сайта
 * @param {Object} siteSectionMsg — объект с текстами ошибок
 */
export default function getConfig(siteSectionMsg) {
    const config = {
        bottom: {
            submit: {
                text: siteSectionMsg.deleteSiteBtnText,
                color: 'accent'
            },
        },
        requestFn() {
            return __awaiter(this, void 0, void 0, function* () {
                const { currentSiteId } = store.getState().sites;
                return yield deleteSiteRequest(currentSiteId);
            });
        },
        afterSubmit(response, outerFns, formDetails) {
            if (response.status === 'success') {
                afterSuccessSiteDeleting();
            }
        },
    };
    return config;
}
/** Функция срабатывающая после удаления сайта */
function afterSuccessSiteDeleting() {
    const deletedSiteId = store.getState().sites.currentSiteId;
    const articleSiteId = store.getState().article.siteId;
    // Очистить редактируемую статью если удалили сайт, к которому она относится
    if (deletedSiteId === articleSiteId) {
        articleManager.clearArticle();
    }
    // Закрыть модальное окно
    store.dispatch(actions.modal.closeModal());
    // Скачать новый список сайтов и поставить в Хранилище
    store.dispatch(actions.sites.requestSites());
    // Обнулить id выбранного сайта
    store.dispatch(actions.sites.setCurrentSiteId(null));
    // Удалить данные из LocalStorage потому что они относятся к удаляемому сайту
    const siteDataInLS = ['editorComponentType', 'editorArtOpenedFolders', 'editorCompOpenedFolders', 'editorArticleType', 'editorComponentId', 'editorSiteId', 'editorSiteTemplateId'];
    siteDataInLS.forEach(function (propName) {
        removeFromLocalStorage(propName);
    });
}
//# sourceMappingURL=formConfig.js.map
//# sourceMappingURL=formConfig.js.map
//# sourceMappingURL=formConfig.js.map