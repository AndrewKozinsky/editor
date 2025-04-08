import StoreModalTypes from './modalTypes'


const modalActions = {
    // Открытие модального окна
    openModal(payload: StoreModalTypes.OpenModalActionPayload): StoreModalTypes.OpenModalAction {
        return {
            type: StoreModalTypes.MODAL_OPEN,
            payload
        }
    },
    // Закрытие модального окна
    closeModal(): StoreModalTypes.CloseModalAction {
        return {
            type: StoreModalTypes.MODAL_CLOSE,
        }
    },
}

export default modalActions