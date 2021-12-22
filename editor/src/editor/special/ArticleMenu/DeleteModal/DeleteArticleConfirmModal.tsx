import React, { useCallback } from 'react'
import Button from 'common/formElements/Button/Button'
import ModalShortContent from 'common/modalEntities/ModalShortContent/ModalShortContent'
import { articleMenuMessages } from 'messages/articleMenuMessages'
import useGetMessages from 'messages/fn/useGetMessages'
import useGetArticleSelectors from 'store/article/articleSelectors'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import articleManager from '../../../articleManager/articleManager'
import { useDispatch } from 'react-redux'
import { store } from 'store/rootReducer'
import actions from 'store/rootAction'
// import Wrapper from 'common/Wrapper/Wrapper'
// import Hr from 'common/misc/Hr/Hr'
// import Button from 'common/formElements/Button/Button'
// import {articleMenuMessages} from 'messages/articleMenuMessages'
// import articleManager from 'editor/RightPart-2/articleManager/articleManager'

/** Модальное окно с вопросом действительно ли удалить редактируемую статью */
export function DeleteArticleConfirmModal() {
    const dispatch = useDispatch()
    const { articleId } = useGetArticleSelectors()
    const { currentArtItemId } = useGetSitesSelectors().articleSection

    const articleMenuMsg = useGetMessages(articleMenuMessages)

    // Функция удаляющая выделенную папку
    const deleteArticle = useCallback(async function () {
        await articleManager.deleteArticle(articleId)

        store.dispatch( actions.article.clearArticle() )

        // If the editable article id is equal to an opened article id in Sites main tab,
        // then clear opened article id in Sites main tab
        if (articleId === currentArtItemId) {
            store.dispatch( actions.sites.setCurrentArtItemId(null))
        }

        // Закрыть модальное окно
        dispatch(actions.modal.closeModal())
    }, [])

    const bottomButtons = [
        <Button
            color='accent'
            text={articleMenuMsg.deleteModalDeleteBtn}
            onClick={deleteArticle}
            key={1}
        />
    ]

    return (
        <ModalShortContent
            header={articleMenuMsg.deleteModalHeader}
            text={articleMenuMsg.deleteModalText}
            bottomElems={bottomButtons}
        />
    )
}

