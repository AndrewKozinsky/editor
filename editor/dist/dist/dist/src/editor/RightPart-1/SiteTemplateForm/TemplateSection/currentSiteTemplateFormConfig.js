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
import { store } from 'store/rootReducer';
import { afterSubmit } from './siteTemplateForm-func';
import updateSiteTemplateRequest from 'requests/editor/siteTemplate/updateSiteTemplateRequest';
import DeleteSiteTemplateButton from '../DeleteSiteTemlateButton/DeleteSiteTemplateButton';
import checkCodeSiteTemplate from '../CodeHelper/checkCodeSiteTemplate';
/** Функция возвращает конфигурацию формы входа в сервис */
function getCurrentSiteTemplateFormConfig(siteTemplateSectionMsg) {
    const config = {
        fields: {
            content: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .required(siteTemplateSectionMsg.codeInputRequired)
                        .test('check-code', siteTemplateSectionMsg.codeInputIsWrong, function (code) {
                        return !checkCodeSiteTemplate(code).length;
                    });
                },
                fieldData: {
                    inputType: 'textarea',
                    label: siteTemplateSectionMsg.templateCodeInput,
                    autoFocus: true
                }
            }
        },
        bottom: {
            submit: {
                text: siteTemplateSectionMsg.submitBtnTextSave,
                icon: 'btnSignSave' // Это значение должен изменять хук в зависимости от типа формы!!!
            },
            elems: [React.createElement(DeleteSiteTemplateButton, { key: 2 })],
            hr: true
        },
        requestFn(readyFieldValues, outerFns, formDetails) {
            return __awaiter(this, void 0, void 0, function* () {
                const { currentTemplateId } = store.getState().sites.siteTemplatesSection;
                // Обновить данные шаблона сайта
                return yield updateSiteTemplateRequest(readyFieldValues, currentTemplateId);
            });
        },
        afterSubmit
    };
    return config;
}
export default getCurrentSiteTemplateFormConfig;
//# sourceMappingURL=currentSiteTemplateFormConfig.js.map
//# sourceMappingURL=currentSiteTemplateFormConfig.js.map
//# sourceMappingURL=currentSiteTemplateFormConfig.js.map