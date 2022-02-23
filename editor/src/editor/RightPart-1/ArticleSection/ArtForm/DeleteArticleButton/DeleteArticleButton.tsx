import React from 'react'
import useGetShowModal from 'src/utils/hooksUtils'
import Button from 'src/common/formElements/Button/Button'
import articleFormMsg from 'src/messages/articleFormMessages'
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
