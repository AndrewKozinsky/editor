import React from 'react';
import Wrapper from 'common/Wrapper/Wrapper';
import Hr from 'common/misc/Hr/Hr';
import Button from 'common/formElements/Button/Button';
import { useGetEditArticleFn, useGetToEditorFn, useIsArticleInEditor } from './EditArticleSection-func';
import useGetMessages from 'messages/fn/useGetMessages';
import { articleFormMessages } from 'messages/articleFormMessages';
import makeClasses from './EditArticleSection-classes';
// TODO Что делает эта функция?
export default function EditArticleSection() {
    const isArticleInEditor = useIsArticleInEditor();
    return (React.createElement(React.Fragment, null,
        React.createElement(Wrapper, { t: 20 }),
        React.createElement(Hr, null),
        React.createElement(Wrapper, { t: 20, align: 'right', verticalAlign: 'center', gap: 20 }, !isArticleInEditor ? React.createElement(EditArticle, null) : React.createElement(InEditor, null))));
}
// TODO Что делает эта функция?
function EditArticle() {
    const articleFormMsg = useGetMessages(articleFormMessages);
    const editArticleFn = useGetEditArticleFn();
    return React.createElement(Button, { onClick: editArticleFn, text: articleFormMsg.editArticleBtnText, icon: 'btnSignEdit' });
}
// TODO Что делает эта функция?
function InEditor() {
    const articleFormMsg = useGetMessages(articleFormMessages);
    const toEditorFn = useGetToEditorFn();
    const CN = makeClasses();
    return (React.createElement(React.Fragment, null,
        React.createElement("p", { className: CN.tip }, articleFormMsg.articleIsAlreadyEdited),
        React.createElement(Button, { onClick: toEditorFn, text: articleFormMsg.toEditor, icon: 'btnSignExit', color: 'accent' })));
}
//# sourceMappingURL=EditArticleSection.js.map