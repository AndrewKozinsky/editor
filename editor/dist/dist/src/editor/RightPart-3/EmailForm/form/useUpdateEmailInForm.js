import { useEffect } from 'react';
import useGetUserSelectors from 'store/user/userSelectors';
/* Хук ставит почту пользователя в поле формы изменения почты пользователя */
export function useUpdateEmailInForm(formState) {
    const { email } = useGetUserSelectors();
    useEffect(function () {
        if (!email)
            return;
        const emailField = formState.fields.email;
        formState.updateField('email', Object.assign(Object.assign({}, emailField), { value: [email] }));
    }, [email]);
}
//# sourceMappingURL=useUpdateEmailInForm.js.map
//# sourceMappingURL=useUpdateEmailInForm.js.map