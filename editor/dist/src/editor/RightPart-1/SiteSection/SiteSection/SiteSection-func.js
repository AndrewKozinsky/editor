var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect } from 'react';
import actions from 'store/rootAction';
import { store } from 'store/rootReducer';
import useGetSitesSelectors from 'store/site/sitesSelectors';
import useGetMessages from 'messages/fn/useGetMessages';
import { siteSectionMessages } from 'messages/siteSectionMessages';
/**
 * Хук изменяет имя сайта в поле Название при переключении сайта
 * @param {Object} formState — объект состояния формы
 */
export function useSetSiteName(formState) {
    // id текущего сайта и массив сайтов
    const { currentSiteId, sites } = useGetSitesSelectors();
    useEffect(function () {
        if (!sites.length)
            return;
        // Найти сайт с указанным id
        let site = sites.find(site => site.id === currentSiteId);
        if (!site)
            return;
        const valueFieldData = Object.assign(formState.fields['name'], { value: [site.name] });
        formState.updateField('name', valueFieldData);
    }, [currentSiteId, sites]);
}
/**
 * Хук добавляет в выпадающий список «Шаблон сайта по умолчанию» пункты сформированные из шаблонов сайта
 * @param {Object} formState — объект состояния формы
 */
export function useSetSiteTemplates(formState) {
    const siteSectionMsg = useGetMessages(siteSectionMessages);
    // id текущего сайта и массив сайтов
    const { templates } = useGetSitesSelectors().siteTemplatesSection;
    const { sites, currentSiteId } = useGetSitesSelectors();
    // Формирование пунктов выпадающего списка
    const options = getOptions(templates, siteSectionMsg);
    useEffect(function () {
        const valueFieldData = Object.assign(formState.fields['defaultSiteTemplateId'], {
            options,
            value: getValue(sites, currentSiteId),
            disabled: options.length == 1
        });
        formState.updateField('defaultSiteTemplateId', valueFieldData);
    }, [sites, currentSiteId, templates]);
}
/**
 * Функция формирует пункты выпадающего списка «Шаблон сайта по умолчанию»
 * @param {Array} templates — массив шаблонов сайта
 * @param {Object} siteSectionMsg — объект с текстами интерфейса
 */
function getOptions(templates, siteSectionMsg) {
    // Пункты выпадающего списка названий шаблонов сайта
    const options = templates.map(template => {
        return {
            value: template.id,
            label: template.name
        };
    });
    // Добавление пустого пункта
    options.unshift({
        value: 0,
        label: siteSectionMsg.defaultSiteTemplateNotSelected.toString()
    });
    return options;
}
/**
 * Формирование значения (текущий пункт) выпадающего списка «Шаблон сайта по умолчанию»
 * @param {Array} sites — массив сайтов
 * @param {Number} currentSiteId — id текущего сайта
 */
function getValue(sites, currentSiteId) {
    var _a;
    const currentSite = sites.find(site => site.id === currentSiteId);
    let value = ((_a = currentSite === null || currentSite === void 0 ? void 0 : currentSite.defaultSiteTemplateId) === null || _a === void 0 ? void 0 : _a.toString()) || '';
    return [value];
}
/**
 * Функция запускаемая после получения ответа от сервера
 * при отправке формы создания нового сайта или изменения существующего
 * @param {Object} response — объект ответа от сервера
 */
export function afterSubmit(response) {
    return __awaiter(this, void 0, void 0, function* () {
        // Если сайт успешно создан...
        if (response.status === 'success') {
            // Скачать новый список сайтов и поставить в Хранилище
            yield store.dispatch(actions.sites.requestSites());
            // Найти в Хранилище сайт с таким же id как у только что созданного сайта
            const newSite = store.getState().sites.sites.find((site) => {
                // @ts-ignore
                return site.id === response.data.sites[0].id;
            });
            // Выделить созданный сайт
            store.dispatch(actions.sites.setCurrentSiteId(newSite.id));
        }
    });
}
//# sourceMappingURL=SiteSection-func.js.map