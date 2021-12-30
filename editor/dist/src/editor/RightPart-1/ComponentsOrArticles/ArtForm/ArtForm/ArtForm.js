import React from 'react';
import useGetMessages from 'messages/fn/useGetMessages';
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState';
import FormConstructor from 'libs/FormConstructor/FormConstructor';
import { articleFormMessages } from 'messages/articleFormMessages';
import getFormConfig from './formConfig';
import { useFillSiteTemplatesSelect, useGetArtDataFromServerAndSetInStore, useSetAnotherFormData } from './ArtForm-func';
import EditArticleSection from '../EditArticleSection/EditArticleSection';
// TODO Что делает эта функция?
export default function ArtForm() {
    // Сообщения формы
    const articleFormMsg = useGetMessages(articleFormMessages);
    // Объекты конфигурации и состояния формы
    const config = getFormConfig(articleFormMsg);
    const formState = useFormConstructorState(config);
    // Скачать данные статьи с сервера и поставить в Хранилище
    useGetArtDataFromServerAndSetInStore();
    // Хук наполняет выпадающий список шаблона сайта в форме существующими значениями
    useFillSiteTemplatesSelect(formState);
    // Хук изменяет значения полей формы при переключении статей
    useSetAnotherFormData(formState);
    return (React.createElement(React.Fragment, null,
        React.createElement(FormConstructor, { config: config, state: formState }),
        React.createElement(EditArticleSection, null)));
}
//# sourceMappingURL=ArtForm.js.map