import { useCallback, useState } from 'react'
import { OuterOnChangeHandlerType } from 'common/formElements/outerOnChangeFn'
import FCType from '../FCType'
import getInitialFieldsState from './getInitialFieldsState'
import fieldChangeHandler from '../handlers/fieldChangeHandler'
import formSubmitHandler from '../handlers/formSubmitHandler'
import updateFieldFn from './UpdateField'
import { getInitialShowCommonSuccess, getInitialCommonSuccess } from './successfulMessage'


/**
 *
 * @param {Object} formConfig — configuration form object
 * @param {Object} outerFns — user's functions passed to FormConstructor config
 */
export default function useFormConstructorState(formConfig: FCType.Config, outerFns: FCType.OuterFns = {}): FCType.StateFormReturn {
    const [fields, setFields] = useState<FCType.FieldsState>(getInitialFieldsState(formConfig))
    const updateField = useCallback((fieldName: string, newFieldData: FCType.StateFieldsObj) => {
        updateFieldFn(fields, setFields, fieldName, newFieldData)
    }, [fields, setFields])

    const [submitCounter, setSubmitCounter] = useState(0)
    const [submitBtnLoading, setSubmitBtnLoading] = useState(false)
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState<boolean>(false)

    const [commonError, setCommonError] = useState<FCType.CommonError>(null)
    const [showCommonError, setShowCommonError] = useState<FCType.ShowCommonError>(true)
    const [commonSuccess, setCommonSuccess] = useState(getInitialCommonSuccess(formConfig))
    const [showCommonSuccess, setShowCommonSuccess] = useState(getInitialShowCommonSuccess(formConfig))

    const [formVisible, setFormVisible] = useState(true)
    const [formSentSuccessfully, setFormSentSuccessfully] = useState(false)
    const [formDisabled, setFormDisabled] = useState(false)
    // Данные пользователя хранимые формой
    const [formData, setFormData] = useState({})


    const onChangeFieldHandler: OuterOnChangeHandlerType.FieldsHandler = useCallback((fieldData: OuterOnChangeHandlerType.FieldsData) => {
        fieldChangeHandler(fieldData, fields, setFields, submitCounter, formConfig, setSubmitBtnDisabled, setCommonError
        )
    }, [
        fields, setFields, submitCounter,
        formConfig, setSubmitBtnDisabled, setCommonError
    ])

    const onFormSubmit = useCallback((e) => {
        formSubmitHandler(
            e, fields, setFields, submitCounter, setSubmitCounter, formConfig, setSubmitBtnDisabled, setFormDisabled,
            setSubmitBtnLoading, setCommonError, setFormVisible, setFormSentSuccessfully, outerFns, commonSuccess, showCommonSuccess,
            formData, setFormData
        )
    }, [
        fields, setFields, submitCounter, setSubmitCounter, formConfig, setSubmitBtnDisabled, setFormDisabled,
        setSubmitBtnLoading, setCommonError, setFormVisible, setFormSentSuccessfully, outerFns, commonSuccess, showCommonSuccess,
    ])

    return {
        fields,
        updateField,

        submitCounter,
        setSubmitCounter,
        submitBtnLoading,
        setSubmitBtnLoading,
        submitBtnDisabled,
        setSubmitBtnDisabled,

        commonError,
        setCommonError,
        showCommonError,
        setShowCommonError,
        commonSuccess,
        setCommonSuccess,
        showCommonSuccess,
        setShowCommonSuccess,

        formVisible,
        setFormVisible,
        formSentSuccessfully,
        setFormSentSuccessfully,
        formDisabled,
        setFormDisabled,
        formData,
        setFormData,

        onChangeFieldHandler,
        onFormSubmit,
    }
}
