// @ts-ignore
import * as yup from 'yup'
import { commonMessages } from 'messages/commonMessages'
import UniversalAuthFormConfigType from '../UniversalAuthForm/UniversalAuthFormConfigType'
import ErrorServerResponseType from 'requests/errorServerResponseType'
import UserServerResponseType from 'requests/user/userServerResponseType'
import FHTypes from 'libs/formHandler/types'
import { confirmEmailMessages } from 'messages/confirmEmailMessages'
import store from 'store/store'
import actions from 'store/rootAction'
import confirmEmailRequest from 'requests/user/confirmEmailRequest'


function createFormConfig(history: any) {
    const tokenField: UniversalAuthFormConfigType.Field = {
        label: confirmEmailMessages.tokenField,
        autoFocus: true,
        schema: () => {
            return yup.string().required(commonMessages.requiredField)
        }
    }

    const formConfig: UniversalAuthFormConfigType.Config = {
        fields: {
            token: tokenField,
        },
        submit: {
            text: confirmEmailMessages.submitBtnText,
        },
        requestFn: async (readyFieldValues) => {
            // @ts-ignore
            return await confirmEmailRequest(readyFieldValues.token)
        },
        afterSubmit: afterFormSubmit
    }

    return formConfig

    function afterFormSubmit(
        response: ErrorServerResponseType | UserServerResponseType,
        formState: FHTypes.FormState
    ) {
        if (response.status === 'success') {
            setTimeout(() => {
                // Поставить токен авторизации в Хранилище
                store.dispatch(actions.user.setAuthTokenStatus(2))

                // Перебросить в редактор
                history.push('/')
            }, 50)
        }
    }
}

export default createFormConfig


