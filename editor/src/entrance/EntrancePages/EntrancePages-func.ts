import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import useGetUserSelectors from 'store/user/userSelectors'
import useGetSettingsSelectors from 'store/settings/settingsSelectors'

/**
 * Функция возвращает классы обёртки регистрационных форм в зависимости от адреса
 * Если перешли на страницу редактора, то добавить обёртке дополнительный класс
 * плавно увеличивающий масштаб и увеличивающий прозрачность чтобы форма
 * анимированно исчезла когда пользователь перешёл на страницу редактора.
 */
export function useIsComponentVisible() {
    // Статус токена авторизации
    const { authTokenStatus } = useGetUserSelectors()

    // Какой компонент должен быть нарисован
    const { entryAndEditorViewState } = useGetSettingsSelectors()

    // Видны ли страницы входа?
    const [isVisible, setIsVisible] = useState(false)

    useEffect(function () {
        if (authTokenStatus === 'unknown') {
            setIsVisible(false)
        }
        else if (entryAndEditorViewState === 'editor') {
            setIsVisible(false)
        }
        else if (entryAndEditorViewState === 'toEditor') {
            setIsVisible(true)
        }
        else if (entryAndEditorViewState === 'toEntry') {
            setIsVisible(true)
        }
        else if (entryAndEditorViewState === 'entry') {
            setIsVisible(true)
        }
        else {
            setIsVisible(false)
        }
    }, [entryAndEditorViewState])

    return isVisible
}

/** Хук регулирует показ или окна редактора, или окон входа в зависимости от различных условий. */
export function useViewStateChanger() {
    const dispatch = useDispatch()

    // Предыдущий адрес
    const { lastAddress } = useGetSettingsSelectors()

    let history = useHistory()
    const address = history.location.pathname // Текущий адрес виде /enter

    useEffect(function () {

        // Если сразу открыли редактор...
        if ( !lastAddress && address === '/' ) {
            // Поставить, что должен быть открыт редактор
            dispatch( actions.settings.setEntryAndEditorViewState('editor') )
        }
        // Если сразу открыли страницу входа
        else if (!lastAddress && address !== '/') {
            // Поставить, что должны быть открыты формы входа
            dispatch( actions.settings.setEntryAndEditorViewState('entry') )
        }

        // Поставить текущий адрес в Хранилище в качестве последнего
        dispatch( actions.settings.setLastAddress(address) )
    }, [address])
}

// Если с формы входа перешли в редактор
export function smoothMoveToEditor() {
    // Поставить, что сначала должен быть плавный переход к редактору...
    store.dispatch( actions.settings.setEntryAndEditorViewState('toEditor') )
    setTimeout(function () {
        // ...а затем полное закрытие формы входа через некоторое время
        store.dispatch( actions.settings.setEntryAndEditorViewState('editor') )
    }, 500)
}

// Если с редактора перешли на форму входа
export function smoothMoveToEntrance() {
    // Поставить, что сначала должен быть плавный переход к форме входа...
    store.dispatch( actions.settings.setEntryAndEditorViewState('toEntry') )
    setTimeout(function () {
        // ...а затем полное закрытие редактора через некоторое время
        store.dispatch( actions.settings.setEntryAndEditorViewState('entry') )
    }, 500)
}
