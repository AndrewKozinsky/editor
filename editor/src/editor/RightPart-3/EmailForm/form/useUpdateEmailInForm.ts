import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'src/store/rootReducer'
import FCType from 'src/libs/FormConstructor/FCType'

export function useUpdateEmailInForm(formState: FCType.StateFormReturn) {
    const email = useSelector((store: AppState) => store.user.email)

    useEffect(function() {
        if (!email) return
        const emailField = formState.fields.email
        formState.updateField('email', { ...emailField, value: [email]})
    }, [email])
}
