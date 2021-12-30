import React from 'react';
import useGetMessages from 'messages/fn/useGetMessages';
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState';
import FormConstructor from 'libs/FormConstructor/FormConstructor';
import { useGetAnotherFolderData } from './ComponentsFolderForm-func';
import { componentFolderFormMessages } from 'messages/componentFolderFormMessages';
import getFormConfig from './formConfig';
/** Компонент формы редактирования папки */
export default function CompFolderForm() {
    // Сообщения формы
    const compFolderFormMsg = useGetMessages(componentFolderFormMessages);
    // Объекты конфигурации и состояния формы
    const config = getFormConfig(compFolderFormMsg);
    const formState = useFormConstructorState(config);
    // Хук изменяет код папки компонента в поле Название при переключении папки
    useGetAnotherFolderData(formState);
    return React.createElement(FormConstructor, { config: config, state: formState });
}
//# sourceMappingURL=CompFolderForm.js.map
//# sourceMappingURL=CompFolderForm.js.map
//# sourceMappingURL=CompFolderForm.js.map