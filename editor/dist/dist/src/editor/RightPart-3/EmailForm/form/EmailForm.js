import React from 'react';
import FormConstructor from 'libs/FormConstructor/FormConstructor';
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState';
import { useUpdateEmailInForm } from './useUpdateEmailInForm';
import { userDataSectionMessages } from 'messages/userDataSectionMessages';
import getConfig from './formConfig';
import useGetMessages from 'messages/fn/useGetMessages';
// TODO Что делает эта функция?
export default function EmailForm() {
    const userDataSectionMsg = useGetMessages(userDataSectionMessages);
    const formConfig = getConfig(userDataSectionMsg);
    // FormConstructor state manager
    const formState = useFormConstructorState(formConfig);
    // The hook updates email in form's field
    useUpdateEmailInForm(formState);
    return React.createElement(FormConstructor, { config: formConfig, state: formState });
}
//# sourceMappingURL=EmailForm.js.map
//# sourceMappingURL=EmailForm.js.map