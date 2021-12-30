var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as yup from 'yup';
import createSiteRequest from 'requests/editor/sites/createSiteRequest';
import { afterSubmit } from './SiteSection-func';
/** Функция возвращает конфигурацию формы входа в сервис */
export default function getNewSiteFormConfig(siteSectionMsg) {
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
                    autoFocus: true
                }
            }
        },
        bottom: {
            submit: {
                text: siteSectionMsg.submitBtnTextNewSite,
                icon: 'btnSignAdd' // Это значение должен изменять хук в зависимости от типа формы!!!
            },
            hr: true
        },
        requestFn(readyFieldValues, outerFns, formDetails) {
            return __awaiter(this, void 0, void 0, function* () {
                // Создать новый сайт...
                return yield createSiteRequest(readyFieldValues);
            });
        },
        afterSubmit
    };
    return config;
}
//# sourceMappingURL=newSiteFormConfig.js.map