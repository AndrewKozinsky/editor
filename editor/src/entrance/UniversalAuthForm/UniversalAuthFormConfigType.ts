import FHTypes from 'src/libs/formHandler/types'
import ErrorServerResponseType from 'src/requests/errorServerResponseType'
import UserServerResponseType from 'src/requests/user/userServerResponseType'

namespace UniversalAuthFormConfigType {
    export type Config = {
        fields: { [key: string]: Field }
        submit: Submit
        requestFn: (formState: FHTypes.ReadyFieldsValues) => Promise<ErrorServerResponseType | UserServerResponseType>
        hideCommonErrors?: boolean
        hideFormAfterSuccessfulSubmit?: boolean
        afterSubmit?: AfterSubmit
    }

    export type Field = {
        label: string,
        type?: 'text' | 'email' | 'password',
        autocomplete?: 'email' | 'username' | 'current-password' | 'new-password',
        placeholder?: string,
        autoFocus?:boolean | number,
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