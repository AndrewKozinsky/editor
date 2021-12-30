import React from 'react';
import useGetMessages from 'messages/fn/useGetMessages';
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState';
import FormConstructor from 'libs/FormConstructor/FormConstructor';
import { componentFormMessages } from 'messages/componentTemplateFormMessages';
import getFormConfig from './formConfig';
import { useGetComDataFromServerAndSetInStore, useSetAnotherFormData } from './ComponentForm-func';
import CodeHelper from '../CodeHelper/CodeHelper';
// TODO Что делает эта функция?
export default function CompForm() {
    // Сообщения формы
    const componentFormMsg = useGetMessages(componentFormMessages);
    // Объекты конфигурации и состояния формы
    const config = getFormConfig(componentFormMsg);
    const formState = useFormConstructorState(config);
    // Скачать данные компонента с сервера и поставить в Хранилище
    useGetComDataFromServerAndSetInStore();
    // Хук изменяет значения полей формы компонента после скачивания других данных компонента
    useSetAnotherFormData(formState);
    return (React.createElement(React.Fragment, null, React.createElement(FormConstructor, { config: config, state: formState }), React.createElement(CodeHelper, { code: formState.fields.content.value[0] })));
}
//# sourceMappingURL=CompForm.js.map
//# sourceMappingURL=CompForm.js.map
//# sourceMappingURL=CompForm.js.map