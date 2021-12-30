import React from 'react';
import useGetMessages from 'messages/fn/useGetMessages';
import makeClasses from './ArticleMenu-classes';
import SvgIcon from 'common/icons/SvgIcon';
import { useIsButtonVisible, useIsHistoryBtnDisabled, useMakeHistoryStep } from './ArticleMenu-func';
import Button from 'common/formElements/Button/Button';
import { articleMenuMessages } from 'messages/articleMenuMessages';
import { useIsSaveBtnDisabled, useSaveArticle } from './fn/save';
import { useCloseArticle } from './CloseModal/close';
import useGetShowModal from 'utils/hooksUtils';
import { useIsMarkupBtnDisabled } from './fn/markup';
import { ArticleMarkupModal } from './MarkupModal/ArticleMarkupModal';
import { DeleteArticleConfirmModal } from './DeleteModal/DeleteArticleConfirmModal';
// TODO Что делает эта функция?
export default function ArticleMenuButton() {
    const CN = makeClasses();
    // Is the Article menu button visible
    if (!useIsButtonVisible())
        return null;
    return (React.createElement("div", { className: CN.outerWrapper }, React.createElement("button", { className: CN.mainButton }, React.createElement(SvgIcon, { type: 'articleMenu' })), React.createElement(ArticleMenu, null)));
}
// TODO Что делает эта функция?
function ArticleMenu() {
    const CN = makeClasses();
    const articleMenuMsg = useGetMessages(articleMenuMessages);
    // Undo button
    const isUndoBtnDisabled = useIsHistoryBtnDisabled('undo');
    const makeUndoStep = useMakeHistoryStep('undo');
    // Redo function
    const isRedoBtnDisabled = useIsHistoryBtnDisabled('redo');
    const makeRedoStep = useMakeHistoryStep('redo');
    // Show markup button
    const isMarkupBtnDisabled = useIsMarkupBtnDisabled();
    const openMarkupModal = useGetShowModal(React.createElement(ArticleMarkupModal, null), 'full');
    // Show data button functions
    // const isDataBtnDisabled = useIsDataBtnDisabled()
    // const showData = useShowData()
    // Save button functions
    const isSaveBtnDisabled = useIsSaveBtnDisabled();
    const saveArticle = useSaveArticle();
    // Close article button
    const closeArticle = useCloseArticle();
    // Delete article button
    const deleteArticle = useGetShowModal(React.createElement(DeleteArticleConfirmModal, null));
    return (React.createElement("div", { className: CN.menuRoot }, React.createElement("div", { className: CN.menuSection }, React.createElement(Button, { text: articleMenuMsg.undo, icon: 'btnSignUndo', onClick: makeUndoStep, disabled: isUndoBtnDisabled }), React.createElement(Button, { text: articleMenuMsg.redo, icon: 'btnSignRedo', onClick: makeRedoStep, disabled: isRedoBtnDisabled })), React.createElement("div", { className: CN.menuSection }, React.createElement(Button, { text: articleMenuMsg.markup, icon: 'btnSignCode', onClick: openMarkupModal, disabled: isMarkupBtnDisabled })), React.createElement("div", { className: CN.menuSection }, React.createElement(Button, { text: articleMenuMsg.save, icon: 'btnSignSave', onClick: saveArticle, disabled: isSaveBtnDisabled }), React.createElement(Button, { text: articleMenuMsg.close, icon: 'btnSignClose', onClick: closeArticle }), React.createElement(Button, { text: articleMenuMsg.delete, icon: 'btnSignTrash', onClick: deleteArticle }))));
}
//# sourceMappingURL=ArticleMenu.js.map
//# sourceMappingURL=ArticleMenu.js.map