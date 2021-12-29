import React, { useCallback } from 'react'
import Button from 'common/formElements/Button/Button'
import ModalShortContent from 'common/modalEntities/ModalShortContent/ModalShortContent'
import useGetMessages from 'messages/fn/useGetMessages'
import useGetArticleSelectors from 'store/article/articleSelectors'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import { useDispatch } from 'react-redux'
import { store } from 'store/rootReducer'
import actions from 'store/rootAction'
import {articleMenuMessages} from 'messages/articleMenuMessages'
import articleManager from 'articleManager/articleManager'
import { deleteItem } from 'libs/DragFilesTree/StoreManage/manageState'
import bridge from '../../../../bridge/bridge'
import filesTreePublicMethods from '../../../../libs/DragFilesTree/publicMethods'
import putArtFolderRequest from '../../../../requests/editor/artFolders/putArtFolderRequest'
import putCompFolderRequest from '../../../../requests/editor/compFolders/putCompFolderRequest'

/** Модальное окно с вопросом действительно ли удалить редактируемую статью */
export function DeleteArticleConfirmModal() {
    const dispatch = useDispatch()
    const { articleId } = useGetArticleSelectors()
    const { currentArtItemId } = useGetSitesSelectors().articleSection

    const articleMenuMsg = useGetMessages(articleMenuMessages)

    // Функция удаляющая выделенную папку
    const deleteArticle = useCallback(async function () {
        const { articleId } = store.getState().article

        await bridge.deleteResource('articles', 'file', articleId)

        // Закрыть модальное окно
        dispatch(actions.modal.closeModal())
    }, [])

    return (
        <ModalShortContent
            header={articleMenuMsg.deleteModalHeader}
            text={articleMenuMsg.deleteModalText}
            bottomElems={[
                <Button
                    color='accent'
                    text={articleMenuMsg.deleteModalDeleteBtn}
                    onClick={deleteArticle}
                    key={1}
                />
            ]}
        />
    )
}
