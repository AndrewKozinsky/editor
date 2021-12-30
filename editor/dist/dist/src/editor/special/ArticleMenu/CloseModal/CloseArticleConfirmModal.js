var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useCallback } from 'react';
import ModalShortContent from 'common/modalEntities/ModalShortContent/ModalShortContent';
import useGetMessages from 'messages/fn/useGetMessages';
import { useDispatch } from 'react-redux';
import { store } from 'store/rootReducer';
import actions from 'store/rootAction';
import useGetArticleSelectors from 'store/article/articleSelectors';
import Button from 'common/formElements/Button/Button';
import { articleMenuMessages } from 'messages/articleMenuMessages';
// TODO Что делает эта функция?
export default function CloseArticleConfirmModal() {
    const dispatch = useDispatch();
    const { history, historyCurrentIdx, articleId } = useGetArticleSelectors();
    const articleMenuMsg = useGetMessages(articleMenuMessages);
    // Функция сохраняющая статью, очищающая редактор и закрывающая модальное окно
    const saveArticle = useCallback(function () {
        return __awaiter(this, void 0, void 0, function* () {
            // await articleManager.saveArticle(history, historyCurrentIdx, articleId)
            store.dispatch(actions.article.clearArticle());
            dispatch(actions.modal.closeModal());
        });
    }, []);
    // Функция очищающая редактор от статьи и закрывающая модальное окно
    const clearArticle = useCallback(function () {
        store.dispatch(actions.article.clearArticle());
        dispatch(actions.modal.closeModal());
    }, []);
    const bottomButtons = [
        React.createElement(Button, { text: articleMenuMsg.closeArticleModalDoNotSaveBtn, block: true, onClick: clearArticle, key: 1 }),
        React.createElement(Button, { color: 'accent', text: articleMenuMsg.closeArticleModalSaveBtn, block: true, onClick: saveArticle, key: 2 })
    ];
    return (React.createElement(ModalShortContent, { header: articleMenuMsg.closeArticleModalHeader, text: articleMenuMsg.closeArticleModalText, bottomElems: bottomButtons }));
}
//# sourceMappingURL=CloseArticleConfirmModal.js.map
//# sourceMappingURL=CloseArticleConfirmModal.js.map