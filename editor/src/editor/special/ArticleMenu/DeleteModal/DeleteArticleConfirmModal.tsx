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
        // Если удаляют статью принадлежащую сайту, который открыт на панели сайтов...
        if (store.getState().sites.currentSiteId === store.getState().article.siteId) {
            // ...то удалить статью из списка папок статей
            const articleFolders = store.getState().sites.artFolderSection.artFolder
            const deletedArticleId = store.getState().article.articleId
            const updatedArticleFolders = deleteItem(articleFolders, deletedArticleId)
            // Сохранить новый массив папок статей в Хранилище чтобы обновить их на вкладке «Сайты»
            store.dispatch(actions.sites.setArtFolder({folders: updatedArticleFolders}))

            // Сохранить массив папок статей на сервере
            // Подготовить сохраняемый массив папок и файлов
            const preparedItems = filesTreePublicMethods.prepareItemsToSaveInServer(updatedArticleFolders)
            await putArtFolderRequest(store.getState().sites.artFolderSection.artFolderId, preparedItems)
        }

        // Удалить статью и очистить редактор
        await articleManager.deleteArticle(articleId)

        // If the editable article id is equal to an opened article id in Sites main tab,
        // then clear opened article id in Sites main tab
        if (articleId === currentArtItemId) {
            store.dispatch( actions.sites.setCurrentArt(null, null))
        }




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
