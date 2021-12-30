import StoreModalTypes from './modalTypes';
const modalActions = {
    // Открытие модального окна
    openModal(payload) {
        return {
            type: StoreModalTypes.MODAL_OPEN,
            payload
        };
    },
    // Закрытие модального окна
    closeModal() {
        return {
            type: StoreModalTypes.MODAL_CLOSE,
        };
    },
};
export default modalActions;
//# sourceMappingURL=modalActions.js.map