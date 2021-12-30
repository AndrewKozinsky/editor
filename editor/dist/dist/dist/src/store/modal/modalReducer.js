import StoreModalTypes from './modalTypes';
// Изначальные значения
const initialState = {
    // Язык интерфейса: eng или rus
    isOpen: false,
    // Содержимое модального окна
    content: null,
    // Тип окна: short или full
    type: 'short'
};
// Открытие модального окна
function openModal(state, action) {
    return Object.assign(Object.assign({}, state), { isOpen: true, content: action.payload.content, type: action.payload.type || 'short' });
}
// Закрытие модального окна
function closeModal(state, action) {
    return Object.assign(Object.assign({}, state), { isOpen: false });
}
// Редьюсер Store.modal
export default function modalReducer(state = initialState, action) {
    switch (action.type) {
        case StoreModalTypes.MODAL_OPEN:
            return openModal(state, action);
        case StoreModalTypes.MODAL_CLOSE:
            return closeModal(state, action);
        default:
            // @ts-ignore
            const x = null;
            return state;
    }
}
//# sourceMappingURL=modalReducer.js.map
//# sourceMappingURL=modalReducer.js.map
//# sourceMappingURL=modalReducer.js.map