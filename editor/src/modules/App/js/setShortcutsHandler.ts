import { useEffect} from 'react'
import { MiscTypes } from 'types/miscTypes'
import { useDispatch } from 'react-redux'
import actions from 'store/rootAction'
import store from 'store/store'


export default function useSetShortcutsHandler() {
    const dispatch = useDispatch()

    useEffect(function () {
        document.addEventListener('keydown', (e) => setShortcutsHandler(e, dispatch))
    }, [])
}

/**
 * Обработчик нажатий клавиш
 * @param {Object} e — объект события
 * @param {Object} dispatch — диспетчер
 */
function setShortcutsHandler(e: KeyboardEvent, dispatch: MiscTypes.AppDispatch) {
    const escKey = e.key === "Escape",
        ctrlKey = e.ctrlKey,
        altKey = e.altKey,
        cmdKey = e.metaKey,
        shiftKey = e.shiftKey

    // Это Mac?
    let isMac = navigator.platform === 'MacIntel'

    // Данные Хранилища
    let storeData = store.getState()

    // Если нажали Esc и открыто модальное окно, то закрыть его
    if (escKey && storeData.modal.isOpen) {
        dispatch( actions.modal.closeModal() )
    }
}
