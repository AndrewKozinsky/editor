import React from 'react'
import useGetShowModal from 'utils/hooksUtils'
import Button from 'common/formElements/Button/Button'
import articleFormMsg from 'messages/articleFormMessages'
import { DeleteArticleModalContent } from './DeleteArticleModalContent'


/** Кнопка удаления сайта открывающая модальное окно подтверждения */
export default function DeleteArticleButton() {
    // Хук возвращает функцию открывающую модальное окно с подтверждением удаления сайта
    const openDeleteArticleConfirmation = useGetShowModal(<DeleteArticleModalContent />)

    return (
        <Button
            type='button'
            text={articleFormMsg.deleteArticleBtnText}
            icon='btnSignTrash'
            onClick={openDeleteArticleConfirmation}
        />
    )
}
