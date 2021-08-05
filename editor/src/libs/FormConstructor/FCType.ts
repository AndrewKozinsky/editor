// import { TextInputPropType } from 'common/formElements/TextInput/TextInput'
// import { SelectPropType } from 'common/formElements/Select/Select'
// import { FieldGroupPropType } from 'common/formElements/FieldGroup/FieldGroup'
// import { ButtonPropType } from 'common/formElements/Button/Button'
// import FHTypes from '../formHandler/types'


/*namespace FCType {
    import FieldsStateObj = FHTypes.FieldsStateObj
    export type Config = {
        fields: ConfigFields
        bottom: {
            submit: ConfigSubmitButton
            elems?: JSX.Element[]
        },
        requestFn: (formState: FHTypes.ReadyFieldsValues) => Promise<unknown>
    }

    export type ConfigFields = { [key: string]: ConfigField }

    export type ConfigField = ConfigTextField | ConfigCheckboxesField | ConfigRadiosField | ConfigSelectField

    type ConfigTextField = {
        fieldType: 'text',
        initialValue?: string[]
        schema?: FieldSchema
        fieldData: Omit<TextInputPropType, FieldExcludedArgs>
    }
    type ConfigCheckboxesField = {
        fieldType: 'checkboxes'
        initialValue?: string[]
        schema?: FieldSchema
        fieldData: Omit<FieldGroupPropType, FieldExcludedArgs>
    }
    type ConfigRadiosField = {
        fieldType: 'radios'
        initialValue?: string[]
        schema?: FieldSchema
        fieldData: Omit<FieldGroupPropType, FieldExcludedArgs>
    }
    type ConfigSelectField = {
        fieldType: 'select'
        initialValue?: string[]
        schema?: FieldSchema
        fieldData: Omit<SelectPropType, FieldExcludedArgs>
    }

    type FieldSchema = (fields?: FieldsState) => any
    type FieldExcludedArgs = 'onChange' | 'value' | 'disabled' | 'error'
    type ConfigSubmitButton = Omit<ButtonPropType, 'type'>


    // =======================================================================

    export type SetFields = (fields: FieldsState) => void

    export type FieldsState = {
        // Имя поля. Например email
        [key: string]: StateFieldsObj
    }

    export type StateFieldsObj = {
        // Значение поля.
        value: StateFieldValue
        type: FieldType
        // Сколько значений может быть у поля: one (одно) или many (несколько). Это зависит от типа поля.
        valueCount: ValueCount
        disabled: boolean,
        loading: boolean,
        error?: null | string
    }

    // Значение поля
    export type StateFieldValue = string[]
    export type FieldType = 'text' | 'select' | 'checkbox' | 'radio' | 'button'
    // Сколько значений может быть у поля: нисколько (кнопка), одно или несколько
    export type ValueCount = 'one' | 'many'

    export type CommonError = null | string
    export type SetCommonError = ( err: null | string ) => void

    export type SetFormVisible = ( isVisible: boolean ) => void
    export type SetSubmitCounter = ( num: number ) => void
    export type SetFormHasErrors = ( status: boolean ) => void
    export type SetSubmitBtnDisabled = ( status: boolean ) => void
    export type SetFormDisabled = ( status: boolean ) => void
    export type SetSubmitBtnLoading = ( status: boolean ) => void
    export type UpdateField = ( fieldName: string, newFieldData: StateFieldsObj ) => void

    // Значения полей для отправки на сервер
    export type ReadyFieldsValues = {
        // Имя поля. Например email
        [key: string]: string | string[]
    }

    export type StateFormReturn = {
        fields: FieldsState
        updateField: UpdateField
        submitBtnLoading: boolean
        submitBtnDisabled: boolean
        formVisible: boolean
        formDisabled: boolean
        setFormVisible: SetFormVisible
        commonError: CommonError
        setCommonError: SetCommonError
        onChangeFieldHandler: (e: React.BaseSyntheticEvent) => void
        onFormSubmit: (e: React.BaseSyntheticEvent) => void
    }
}*/



// export default FCType