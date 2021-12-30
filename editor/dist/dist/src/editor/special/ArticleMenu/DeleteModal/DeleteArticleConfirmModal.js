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
import Button from 'common/formElements/Button/Button';
import ModalShortContent from 'common/modalEntities/ModalShortContent/ModalShortContent';
import useGetMessages from 'messages/fn/useGetMessages';
import useGetArticleSelectors from 'store/article/articleSelectors';
import useGetSitesSelectors from 'store/site/sitesSelectors';
import { useDispatch } from 'react-redux';
import { store } from 'store/rootReducer';
import actions from 'store/rootAction';
import { articleMenuMessages } from 'messages/articleMenuMessages';
import bridge from '../../../../bridge/bridge';
/** Модальное окно с вопросом действительно ли удалить редактируемую статью */
export function DeleteArticleConfirmModal() {
    const dispatch = useDispatch();
    const { articleId } = useGetArticleSelectors();
    const { currentArtItemId } = useGetSitesSelectors().articleSection;
    const articleMenuMsg = useGetMessages(articleMenuMessages);
    // Функция удаляющая выделенную папку
    const deleteArticle = useCallback(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const { articleId } = store.getState().article;
            yield bridge.deleteResource('articles', 'file', articleId);
            // Закрыть модальное окно
            dispatch(actions.modal.closeModal());
        });
    }, []);
    return (React.createElement(ModalShortContent, { header: articleMenuMsg.deleteModalHeader, text: articleMenuMsg.deleteModalText, bottomElems: [
            React.createElement(Button, { color: 'accent', text: articleMenuMsg.deleteModalDeleteBtn, onClick: deleteArticle, key: 1 })
        ] }));
}
//# sourceMappingURL=DeleteArticleConfirmModal.js.map
//# sourceMappingURL=DeleteArticleConfirmModal.js.map