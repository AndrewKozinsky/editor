import FHTypes from 'libs/formHandler/types'
import ErrorServerResponseType from 'requests/errorServerResponseType'
import UserServerResponseType from 'requests/user/userServerResponseType'

namespace UniversalAuthFormConfigType {
    export type Config = {
        fields: { [key: string]: Field },
        submit: Submit,
        requestFn: (formState: FHTypes.ReadyFieldsValues) => Promise<ErrorServerResponseType | UserServerResponseType>,
        hideFormAfterSuccessfulSubmit?: boolean,
        afterSubmit?: AfterSubmit
    }

    export type Field = {
        label: string,
        type?: 'text' | 'email' | 'password',
        autocomplete?: 'email' | 'username' | 'current-password' | 'new-password',
        placeholder?: string,
        autoFocus?:boolean,
        schema?: (fields?: FHTypes.FieldsStateObj) => any
    }

    export type Submit = {
        text: string
    }

    export type AfterSubmit = ((
        response: ErrorServerResponseType | UserServerResponseType, formState: FHTypes.FormState
    ) => void)
}

export default UniversalAuthFormConfigType