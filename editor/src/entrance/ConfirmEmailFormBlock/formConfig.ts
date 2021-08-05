// @ts-ignore
// import * as yup from 'yup'
// import store from 'src/store/store'
// import actions from 'src/store/rootAction'
// import { commonMessages } from 'src/messages/commonMessages'
// import UniversalAuthFormConfigType from '../UniversalAuthForm/UniversalAuthFormConfigType'
// import ErrorServerResponseType from 'src/requests/errorServerResponseType'
// import UserServerResponseType from 'src/requests/user/userServerResponseType'
// import FHTypes from 'src/libs/formHandler/types'
// import { confirmEmailMessages } from 'src/messages/confirmEmailMessages'
// import confirmEmailRequest from 'src/requests/user/confirmEmailRequest'


f/*unction createFormConfig(history: any) {
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
}*/

// export default createFormConfig


