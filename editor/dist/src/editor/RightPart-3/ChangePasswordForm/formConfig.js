var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import React from 'react'
import * as yup from 'yup';
import changePasswordRequest from 'requests/user/changePasswordRequest';
// TODO Что делает эта функция?
export default function getConfig(commonMsg, changePasswordSectionMsg) {
    const config = {
        fields: {
            currentPassword: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .required(commonMsg.requiredField)
                        .min(6, commonMsg.passwordToShort)
                        .max(50, commonMsg.passwordToLong);
                },
                fieldData: {
                    label: changePasswordSectionMsg.currentPasswordField,
                    type: 'password',
                    maxWidth: 250,
                    autocomplete: 'current-password'
                }
            },
            newPassword: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .required(commonMsg.requiredField)
                        .min(6, commonMsg.passwordToShort)
                        .max(50, commonMsg.passwordToLong);
                },
                fieldData: {
                    label: changePasswordSectionMsg.newPasswordField,
                    type: 'password',
                    maxWidth: 250,
                    autocomplete: 'new-password'
                }
            },
            newPasswordAgain: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .oneOf([fields.newPassword.value[0]], changePasswordSectionMsg.passwordsMustMatch);
                },
                fieldData: {
                    label: changePasswordSectionMsg.newPasswordAgainField,
                    type: 'password',
                    maxWidth: 250,
                    autocomplete: 'new-password'
                }
            },
        },
        bottom: {
            submit: {
                text: changePasswordSectionMsg.submitBtnText
            },
            align: 'left',
        },
        requestFn(readyFieldValues) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentPassword = readyFieldValues.currentPassword.toString();
                const newPassword = readyFieldValues.newPassword.toString();
                return yield changePasswordRequest(currentPassword, newPassword);
            });
        },
        showCommonSuccess: true,
        commonSuccess: changePasswordSectionMsg.passwordHasChanged
    };
    return config;
}
//# sourceMappingURL=formConfig.js.map