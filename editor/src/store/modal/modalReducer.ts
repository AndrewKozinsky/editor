import { act } from 'react-dom/test-utils'
import StoreModalTypes from './modalTypes'

export type ModalReducerType = {
    isOpen: StoreModalTypes.IsOpen
    content: StoreModalTypes.Content
    type: StoreModalTypes.Type
}

// Изначальные значения
const initialState: ModalReducerType = {
    // Язык интерфейса: eng или rus
    isOpen: false,
    // Содержимое модального окна
    content: null,
    // Тип окна: short или full
    type: 'short'
}

// Открытие модального окна
function openModal(state: ModalReducerType, action: StoreModalTypes.OpenModalAction): ModalReducerType {
    return {
        ...state,
        isOpen: true,
        content: action.payload.content,
        type: action.payload.type || 'short'
    }
}
// Закрытие модального окна
function closeModal(state: ModalReducerType, action: StoreModalTypes.CloseModalAction): ModalReducerType {
    return { ...state, isOpen: false }
}


// Редьюсер Store.modal
export default function modalReducer(state = initialState, action: StoreModalTypes.ModalAction): ModalReducerType {

    switch (action.type) {
        case StoreModalTypes.MODAL_OPEN:
            return openModal(state, action)
        case StoreModalTypes.MODAL_CLOSE:
            return closeModal(state, action)
        default:
            // @ts-ignore
            const x: never = null
            return state
    }
}
