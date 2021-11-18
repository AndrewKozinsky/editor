import { useEffect } from 'react'
import FCType from 'libs/FormConstructor/FCType'
import useGetUserSelectors from 'store/user/userSelectors'


export function useUpdateEmailInForm(formState: FCType.StateFormReturn) {
    const { email } = useGetUserSelectors()

    useEffect(function() {
        if (!email) return
        const emailField = formState.fields.email
        formState.updateField('email', { ...emailField, value: [email]})
    }, [email])
}
