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
import React from 'react';
import * as yup from 'yup';
import updateSiteRequest from 'requests/editor/sites/updateSiteRequest';
import { store } from 'store/rootReducer';
import DeleteSiteButton from '../DeleteSiteButton/DeleteSiteButton';
import { afterSubmit } from './SiteSection-func';
/** Функция возвращает конфигурацию формы входа в сервис */
export default function getCurrentSiteFormConfig(siteSectionMsg) {
    const config = {
        fields: {
            name: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .required(siteSectionMsg.siteNameInputRequired)
                        .max(255, siteSectionMsg.siteNameInputIsTooLong);
                },
                fieldData: {
                    label: siteSectionMsg.siteNameInput,
                    placeholder: siteSectionMsg.siteNamePlaceholder,
                }
            },
            defaultSiteTemplateId: {
                fieldType: 'select',
                fieldData: {
                    label: siteSectionMsg.defaultTemplateInput,
                    options: [],
                }
            },
        },
        bottom: {
            submit: {
                text: siteSectionMsg.submitBtnTextSave,
                icon: 'btnSignSave' // Это значение должен изменять хук в зависимости от типа формы!!!
            },
            elems: [React.createElement(DeleteSiteButton, { key: 2 })],
            hr: true
        },
        requestFn(readyFieldValues, outerFns, formDetails) {
            return __awaiter(this, void 0, void 0, function* () {
                // Обновить данные сайта
                // id выбранного сайта
                const siteId = store.getState().sites.currentSiteId;
                return yield updateSiteRequest(readyFieldValues, siteId);
            });
        },
        afterSubmit
    };
    return config;
}
//# sourceMappingURL=currentSiteFormConfig.js.map
//# sourceMappingURL=currentSiteFormConfig.js.map
//# sourceMappingURL=currentSiteFormConfig.js.map