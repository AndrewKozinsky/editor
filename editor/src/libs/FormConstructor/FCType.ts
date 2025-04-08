import React, { ReactElement } from 'react'
import { TextInputPropType } from 'common/formElements/TextInput/TextInput'
import { SelectPropType } from 'common/formElements/Select/Select'
import { FieldGroupPropType } from 'common/formElements/FieldGroup/FieldGroup'
import { OuterOnChangeHandlerType } from 'common/formElements/outerOnChangeFn'
import { ButtonPropType } from 'common/formElements/Button/Button'
import { UserServerResponse } from 'requests/user/userServerResponseType'
import { SitesServerResponseType } from 'requests/editor/sites/sitesServerResponseType'

/** Типы компонента FormConstructor */
namespace FCType {

    // CONFIGURATION OBJECT  ===================================================

    export type Config = {
        fields?: ConfigFields
        bottom: {
            submit: ConfigSubmitButton
            elems?: JSX.Element[]
            align?: 'left' | 'right',
            hr?: boolean
        },
        requestFn?: (readyFieldValues: ReadyFieldsValues, outerFns: OuterFns, formDetails: FormDetails) => Promise<Response>
        afterSubmit?: (response: Response, outerFns: OuterFns, formDetails: FormDetails) => void
        hideAfterSuccessfulSubmit?: boolean
        commonSuccess?: CommonSuccess
        showCommonSuccess?: ShowCommonSuccess
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
        fieldType: 'checkbox'
        initialValue?: string[]
        schema?: FieldSchema
        fieldData: Omit<FieldGroupPropType, FieldExcludedArgs>
    }
    type ConfigRadiosField = {
        fieldType: 'radio'
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
    type FieldExcludedArgs = 'onChange' | 'value' | 'disabled' | 'error' | 'name'
    type ConfigSubmitButton = Omit<ButtonPropType, 'type'>

    // Возможно сюда нужно добавить и типы остальных ответов от сервера
    // Или же приделать обобщённый тип
    export type Response = UserServerResponse | SitesServerResponseType | {status: 'success'}

    // Fields' values for sending to the server
    export type ReadyFieldsValues = {
        // Field's name. email, for example
        [key: string]: string | string[]
    }

    export type OuterFns = { [key: string]: any }

    export type FormDetails = {
        setFormVisible: SetFormVisible
        readyFieldValues: ReadyFieldsValues
        formData: FormData
        setFormData: SetFormData
    }


    // STATE  ==================================================================

    export type SetFields = (fields: FieldsState) => void

    export type FieldsState = {
        // Field's name. email, for example
        [key: string]: StateFieldsObj
    }

    export type StateFieldsObj = {
        // Field's value
        value: StateFieldValue
        type: FieldType
        // How many values field has: one or many. It is depend on field's type.
        valueCount: ValueCount
        disabled: boolean
        loading: boolean
        error?: null | string
    }

    export type StateFieldValue = string[]
    export type FieldType = 'text' | 'select' | 'checkbox' | 'radio' | 'button'
    export type ValueCount = 'one' | 'many'

    export type UpdateField = ( fieldName: string, newFieldData: StateFieldsObj ) => void

    export type SubmitCounter = number
    export type SetSubmitCounter = ( num: number ) => void
    export type SubmitBtnLoading = boolean
    export type SetSubmitBtnLoading = ( status: boolean ) => void
    export type SubmitBtnDisabled = boolean
    export type SetSubmitBtnDisabled = ( status: SubmitBtnDisabled ) => void

    export type CommonError = null | string
    export type SetCommonError = ( err: CommonError ) => void
    export type ShowCommonError = boolean
    export type SetShowCommonError = ( show: ShowCommonError ) => void
    export type CommonSuccess = string | ReactElement
    export type SetCommonSuccess = (val: CommonSuccess) => void
    export type ShowCommonSuccess = boolean
    export type SetShowCommonSuccess = ( show: ShowCommonSuccess ) => void

    export type FormVisible = boolean
    export type SetFormVisible = ( isVisible: boolean ) => void
    export type FormSentSuccessfully = boolean
    export type SetFormSentSuccessfully = ( status: FormSentSuccessfully ) => void
    export type FormDisabled = boolean
    export type SetFormDisabled = ( isDisabled: FormDisabled ) => void
    export type FormData = any
    export type SetFormData = ( formData: FormData ) => void

    export type StateFormReturn = {
        fields: FieldsState
        updateField: UpdateField

        submitCounter: SubmitCounter
        setSubmitCounter: SetSubmitCounter
        submitBtnLoading: SubmitBtnLoading
        setSubmitBtnLoading: SetSubmitBtnLoading
        submitBtnDisabled: SubmitBtnDisabled
        setSubmitBtnDisabled: SetSubmitBtnDisabled

        commonError: CommonError
        setCommonError: SetCommonError
        showCommonError: ShowCommonError
        setShowCommonError: SetShowCommonError
        commonSuccess: CommonSuccess
        setCommonSuccess: SetCommonSuccess
        showCommonSuccess: ShowCommonSuccess
        setShowCommonSuccess: SetShowCommonSuccess

        formVisible: FormVisible
        setFormVisible: SetFormVisible
        formSentSuccessfully: FormSentSuccessfully
        setFormSentSuccessfully: SetFormSentSuccessfully
        formDisabled: FormDisabled
        setFormDisabled: SetFormDisabled
        formData: FormData
        setFormData: SetFormData

        onChangeFieldHandler: OuterOnChangeHandlerType.FieldsHandler
        onFormSubmit: (e: React.BaseSyntheticEvent) => void
    }
}

export default FCType