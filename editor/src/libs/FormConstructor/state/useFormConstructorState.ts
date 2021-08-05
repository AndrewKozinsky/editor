// import { useCallback, useState } from 'react'
// import FCType from '../FCType'
// import getInitialFieldsState from './getInitialFieldsState'
// import fieldChangeHandler from './fieldChangeHandler'
// import changeField from './changeFieldFn'
// import formSubmitHandler from './formSubmitHandler'
// import updateFieldFn from './updateField'

/*export default function useFormConstructorState(formConfig: FCType.Config): FCType.StateFormReturn {
    const [fields, setFields] = useState<FCType.FieldsState>(getInitialFieldsState(formConfig))
    const [submitBtnLoading, setSubmitBtnLoading] = useState(false)
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState<boolean>(false)
    const [submitCounter, setSubmitCounter] = useState(0)
    const [commonError, setCommonError] = useState<FCType.CommonError>(null)
    const [formVisible, setFormVisible] = useState(true)
    const [formHasErrors, setFormHasErrors] = useState(false)
    const [formDisabled, setFormDisabled] = useState(false)

    const updateField = useCallback((fieldName: string, newFieldData: FCType.StateFieldsObj) => {
        updateFieldFn(fields, setFields, fieldName, newFieldData)
    }, [fields, setFields])

    const onChangeFieldHandler = useCallback((e) => {
        fieldChangeHandler(e, fields, setFields, submitCounter, setSubmitCounter, formHasErrors, setFormHasErrors, formConfig, setSubmitBtnDisabled, setCommonError)
    }, [fields, setFields, submitCounter, setSubmitCounter, formHasErrors, setFormHasErrors, setSubmitBtnDisabled, setCommonError])

    const onFormSubmit = useCallback((e) => {
        formSubmitHandler(e, fields, setFields, submitCounter, setSubmitCounter, formHasErrors, setFormHasErrors, formConfig, setSubmitBtnDisabled, setCommonError, setSubmitBtnLoading, setFormDisabled)
    }, [fields, setFields, submitCounter, setSubmitCounter, formHasErrors, setFormHasErrors, setSubmitBtnDisabled, setCommonError, setSubmitBtnLoading, setFormDisabled])


    return {
        fields,
        updateField,
        submitBtnLoading,
        submitBtnDisabled,
        formVisible,
        formDisabled,
        setFormVisible,
        commonError,
        setCommonError,
        onChangeFieldHandler,
        onFormSubmit,
    }
}*/
