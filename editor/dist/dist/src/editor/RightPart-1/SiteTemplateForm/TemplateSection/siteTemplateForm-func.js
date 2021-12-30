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
import { useEffect } from 'react';
import useGetSitesSelectors from 'store/site/sitesSelectors';
import { store } from 'store/rootReducer';
import actions from 'store/rootAction';
/**
 * Хук изменяет код шаблона сайта в поле Код шаблона при переключении сайта или шаблона
 * @param {Object} formState — объект состояния формы
 */
export function useSetSiteTemplateCode(formState) {
    // id текущего шаблона сайта и массив шаблонов сайта
    const { currentTemplateId, templates } = useGetSitesSelectors().siteTemplatesSection;
    useEffect(function () {
        if (!templates.length)
            return;
        // Найти шаблон сайта с указанным id
        let siteTemplate = templates.find(templates => templates.id === currentTemplateId);
        const value = siteTemplate ? siteTemplate.content : '';
        // Поставить код выбранного шаблона сайта в поле «Код шаблона»
        const valueFieldNewData = Object.assign(formState.fields['content'], { value: [value] });
        formState.updateField('content', valueFieldNewData);
    }, [currentTemplateId, templates]);
}
/**
 * Функция запускаемая после получения ответа от сервера
 * при отправке формы создания нового шаблона сайта или изменения существующего
 * @param {Object} response — объект ответа от сервера
 */
export function afterSubmit(response) {
    return __awaiter(this, void 0, void 0, function* () {
        // Если сайт успешно создан...
        if (response.status === 'success') {
            // Скачать новый список шаблонов сайта и поставить в Хранилище
            yield store.dispatch(actions.sites.requestSiteTemplates());
            // Найти в Хранилище шаблон сайта с таким же id как у только что созданного
            const newSiteTemplate = store.getState().sites.siteTemplatesSection.templates.find((template) => {
                return template.id === response.data.siteTemplates[0].id;
            });
            // Выделить созданный шаблон сайта
            store.dispatch(actions.sites.setCurrentSiteTemplateId(newSiteTemplate.id));
            // Если отредактировали шаблон сайта, который используется в редактируемой статье...
            if (store.getState().article.siteTemplateId === newSiteTemplate.id) {
                // ... то обновить хеш версии шаблона сайта чтобы хук скачал новую версию шаблона и поставил в <head> и <body>
                store.dispatch(actions.article.changeSiteTemplateVersionHash());
            }
        }
    });
}
//# sourceMappingURL=siteTemplateForm-func.js.map
//# sourceMappingURL=siteTemplateForm-func.js.map