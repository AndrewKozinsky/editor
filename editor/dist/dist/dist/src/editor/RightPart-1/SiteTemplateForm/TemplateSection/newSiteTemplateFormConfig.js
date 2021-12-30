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
import * as yup from 'yup';
import createSiteTemplateRequest from 'requests/editor/siteTemplate/createSiteTemplateRequest';
import { afterSubmit } from './siteTemplateForm-func';
import checkCodeSiteTemplate from '../CodeHelper/checkCodeSiteTemplate';
/** Функция возвращает конфигурацию формы создания нового шаблона сайта */
function getNewSiteTemplateFormConfig(siteTemplateSectionMsg) {
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
                text: siteTemplateSectionMsg.submitBtnTextNew,
                icon: 'btnSignAdd' // Это значение должен изменять хук в зависимости от типа формы!!!
            },
        },
        requestFn(readyFieldValues, outerFns, formDetails) {
            return __awaiter(this, void 0, void 0, function* () {
                // Создать новый шаблон сайта...
                return yield createSiteTemplateRequest(readyFieldValues);
            });
        },
        afterSubmit
    };
    return config;
}
export default getNewSiteTemplateFormConfig;
//# sourceMappingURL=newSiteTemplateFormConfig.js.map
//# sourceMappingURL=newSiteTemplateFormConfig.js.map
//# sourceMappingURL=newSiteTemplateFormConfig.js.map