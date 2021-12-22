import { ReactElement, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import useGetModalSelectors from 'store/modal/modalSelectors'
import actions from 'store/rootAction'
import StoreModalTypes from 'store/modal/modalTypes'

/**
 * Хук возвращает функцию показывающую модальное окно с переданным содержимым
 * @param {Object} modalContent — содержимое модального окна
 * @param {String} modalType — тип окна: short (компактное окно) или full (окно на весь экран)
 */
export default function useGetShowModal(modalContent: ReactElement, modalType?: StoreModalTypes.Type) {
    const dispatch = useDispatch()

    // Открыто ли модальное окно
    const { isOpen } = useGetModalSelectors()

    // Должно ли быть открыто модальное окно подтверждения изменения почты
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Следить за моментом когда был запрос на открытие окна
    useEffect(function () {
        if (isModalOpen) {
            // Открыть окно подтверждения удаления шаблона подключаемых файлов
            dispatch(actions.modal.openModal(
                { content: modalContent, type: modalType }
            ))
        }

        // Если модальное окно закрыли, то и тут поменять статус
        // потому что без этого я не смогу его открыть более одного раза
        if (!isOpen && isModalOpen) setIsModalOpen(false)
    }, [isModalOpen])

    return () => setIsModalOpen(true)
}
