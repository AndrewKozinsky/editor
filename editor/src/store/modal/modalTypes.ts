import { ReactElement } from 'react'

namespace StoreModalTypes {

    // Типы значений
    // Открыто ли модальное окно
    export type IsOpen = boolean
    // Содержимое модального окна
    export type Content = ReactElement
    // Тип окна: short (компактное окно) или full (окно на весь экран)
    export type Type = 'short' | 'full'

    // Типы типа и тип экшена
    // Открытие модального окна
    export type OpenModalActionPayload = {
        content: Content
        type?: Type
    }
    export const MODAL_OPEN = 'MODAL_OPEN'
    export type OpenModalAction = {
        type: typeof MODAL_OPEN,
        payload: OpenModalActionPayload
    }

    // Закрытие модального окна
    export const MODAL_CLOSE = 'MODAL_CLOSE'
    export type CloseModalAction = {
        type: typeof MODAL_CLOSE
    }


    export type ModalAction =
        | OpenModalAction
        | CloseModalAction
}

export default StoreModalTypes
