var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import actions from 'store/rootAction';
import { store } from 'store/rootReducer';
import deleteSiteTemplateRequest from 'requests/editor/siteTemplate/deleteSiteTemplateRequest';
import updateSiteRequest from 'requests/editor/sites/updateSiteRequest';
/**
 * Функция возвращает конфигурацию формы входа в сервис
 * @param {Object} siteTemplateSectionMsg — объект с текстами ошибок
 */
function getConfig(siteTemplateSectionMsg) {
    const config = {
        bottom: {
            submit: {
                text: siteTemplateSectionMsg.deleteBtnInModal,
            },
        },
        requestFn() {
            return __awaiter(this, void 0, void 0, function* () {
                const { currentTemplateId } = store.getState().sites.siteTemplatesSection;
                return yield deleteSiteTemplateRequest(currentTemplateId);
            });
        },
        afterSubmit(response, outerFns, formDetails) {
            if (response.status === 'success') {
                // Если удаляемый шаблон стоит в качестве шаблона сайта по умолчанию,
                // то обнулить шаблон сайта по умолчанию.
                clearDefaultSiteTemplateIfTemplateWasDeleted();
                // Закрыть модальное окно
                store.dispatch(actions.modal.closeModal());
                // Скачать новый список шаблонов сайта и поставить в Хранилище
                store.dispatch(actions.sites.requestSiteTemplates());
                // Обнулить id выбранного шаблона сайта
                store.dispatch(actions.sites.setCurrentSiteTemplateId(null));
            }
        },
    };
    return config;
}
export default getConfig;
function clearDefaultSiteTemplateIfTemplateWasDeleted() {
    const deletedTempId = store.getState().sites.siteTemplatesSection.currentTemplateId;
    const currentSiteTempId = getCurrentSiteTempId();
    if (deletedTempId === currentSiteTempId) {
        clearCurrentSiteDefaultTemplate();
    }
}
// TODO Что делает эта функция?
function getCurrentSiteTempId() {
    const { currentSiteId } = store.getState().sites;
    const currentSite = store.getState().sites.sites.find((site) => {
        return site.id === currentSiteId;
    });
    return currentSite === null || currentSite === void 0 ? void 0 : currentSite.defaultSiteTemplateId;
}
// TODO Что делает эта функция?
function clearCurrentSiteDefaultTemplate() {
    return __awaiter(this, void 0, void 0, function* () {
        const { currentSiteId } = store.getState().sites;
        yield updateSiteRequest({ defaultSiteTemplateId: null }, currentSiteId);
        // Скачать новый список сайтов и поставить в Хранилище
        yield store.dispatch(actions.sites.requestSites());
    });
}
//# sourceMappingURL=formConfig.js.map
//# sourceMappingURL=formConfig.js.map