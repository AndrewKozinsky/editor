import { useCallback, useState } from 'react'
import FCType from '../FCType'
import getInitialFieldsState from './getInitialFieldsState'
import fieldChangeHandler from '../handlers/fieldChangeHandler'
import formSubmitHandler from '../handlers/formSubmitHandler'


export default function useFormConstructorState(formConfig: FCType.Config, outerFns: FCType.OuterFns = {}): FCType.StateFormReturn {
    const [fields, setFields] = useState<FCType.FieldsState>(getInitialFieldsState(formConfig))
    const [submitBtnLoading, setSubmitBtnLoading] = useState(false)
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState<boolean>(false)
    const [submitCounter, setSubmitCounter] = useState(0)
    const [commonError, setCommonError] = useState<FCType.CommonError>(null)
    const [formVisible, setFormVisible] = useState(true)
    const [formSentSuccessfully, setFormSentSuccessfully] = useState(false)
    const [formDisabled, setFormDisabled] = useState(false)

    const onChangeFieldHandler = useCallback((e) => {
        fieldChangeHandler(e, fields, setFields, submitCounter, formConfig, setSubmitBtnDisabled, setCommonError)
    }, [fields, setFields, submitCounter, formConfig, setSubmitBtnDisabled, setCommonError])

    const onFormSubmit = useCallback((e) => {
        formSubmitHandler(
            e, fields, setFields, submitCounter, setSubmitCounter, formConfig, setSubmitBtnDisabled, setFormDisabled,
            setSubmitBtnLoading, setCommonError, setFormVisible, setFormSentSuccessfully, outerFns
        )
    }, [
        fields, setFields, submitCounter, setSubmitCounter, formConfig, setSubmitBtnDisabled, setFormDisabled,
        setSubmitBtnLoading, setCommonError, setFormVisible, outerFns
    ])


    return {
        fields,
        submitBtnLoading,
        submitBtnDisabled,
        submitCounter,
        formVisible,
        setFormVisible,
        formDisabled,
        setFormDisabled,
        commonError,
        setCommonError,
        formSentSuccessfully,
        onChangeFieldHandler,
        onFormSubmit,
    }
}
