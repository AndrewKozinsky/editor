import { useCallback, useState } from 'react'
import FCType from '../FCType'
import getInitialFieldsState from './getInitialFieldsState'
import fieldChangeHandler from './fieldChangeHandler'
// import changeField from './changeFieldFn'
import formSubmitHandler from './formSubmitHandler'

export default function useFormState(formConfig: FCType.Config): FCType.StateFormReturn {
    const [fields, setFields] = useState<FCType.FieldsState>(getInitialFieldsState(formConfig))
    const [submitBtnLoading, setSubmitBtnLoading] = useState(false)
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState<boolean>(false)
    const [submitCounter, setSubmitCounter] = useState(0)
    const [commonError, setCommonError] = useState<FCType.CommonError>(null)
    const [formVisible, setFormVisible] = useState(true)
    const [formHasErrors, setFormHasErrors] = useState(false)
    const [formDisabled, setFormDisabled] = useState(false)

    const onChangeFieldHandler = useCallback((e) => {
        fieldChangeHandler(e, fields, setFields, submitCounter, setSubmitCounter, formHasErrors, setFormHasErrors, formConfig, setSubmitBtnDisabled, setCommonError)
    }, [fields, setFields, submitCounter, setSubmitCounter, formHasErrors, setFormHasErrors, setSubmitBtnDisabled, setCommonError])

    const onFormSubmit = useCallback((e) => {
        formSubmitHandler(e, fields, setFields, submitCounter, setSubmitCounter, formHasErrors, setFormHasErrors, formConfig, setSubmitBtnDisabled, setCommonError, setSubmitBtnLoading, setFormDisabled)
    }, [fields, setFields, submitCounter, setSubmitCounter, formHasErrors, setFormHasErrors, setSubmitBtnDisabled, setCommonError, setSubmitBtnLoading, setFormDisabled])


    return {
        fields,
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
}
