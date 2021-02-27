import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppState} from '../../../store/rootReduser'
import {UserReducerType} from '../../../store/user/userReducer'
import {useGetUserToken} from '../../../requests/authRequests'
import {setAuthTokenStatus} from '../../../store/user/userActions'
import {
    setEditorLanguage,
    setEditorTheme,
    setEditorSize
} from '../../../store/settings/settingsActions'

/** Хук инициализирующий приложение */
export function useInit() {

    // Поставить настройки редактора в Хранилище
    useGetAndSetEditorSettings()

    // Проинициализировано ли приложение
    const [isInitialized, setIsInitialized] = useState(false)

    // Установка статуса токена пользователя если он неизвестен
    useSetTokenStatus(setIsInitialized)

    // Возратить проинициализировано ли приложение.
    return isInitialized
}


/**
 * Хук получающий из LocalStorage данные о языке интерфейса, теме и размерах элементов
 * и заносящий это в Хранилище при запуске приложения
 */
function useGetAndSetEditorSettings() {
    const dispatch = useDispatch()

    // При отрисовке компонента...
    useEffect(function () {
        // Получить из LocalStorage язык интерфейса, тему и размер элементов
        let language = localStorage.getItem('editorLanguage')
        let theme = localStorage.getItem('editorTheme')
        let size = localStorage.getItem('editorSize')

        // Если каких-то значений нет, то в LocalStorage поставить стандартные значения
        if (!language) {
            language = 'eng' // eng или rus
            localStorage.setItem('editorLanguage', 'eng')
        }
        if (!theme) {
            theme = 'light' // light или dark
            localStorage.setItem('editorTheme', 'light')
        }
        if (!size) {
            size = 'standard' // standard или big
            localStorage.setItem('editorSize', 'standard')
        }

        // Поставить значения в Хранилище
        dispatch( setEditorLanguage(language) )
        dispatch( setEditorTheme(theme) )
        dispatch( setEditorSize(size) )
    }, [])


    // Статус токена
    const { authTokenStatus } = useSelector<AppState, UserReducerType>(store => store.user)
}


/**
 * Хук устанавливающий статус токена пользователя если он не известен (равен нулю).
 * Изначально токен статуса авторизации пользователя равен нулю.
 * Это значит не известно есть ли токен в куках и правилен ли он.
 * Поэтому делается запрос на сервер для его проверки. И в зависимости от этого статус становится
 * или 1 (токена нет или он недействительный) или 2 (токен правильный)
 */
export function useSetTokenStatus(setIsInitialized: (isInitialized: boolean) => void) {

    const dispatch = useDispatch()

    // Получение статуса токена из Хранилища
    const { authTokenStatus } = useSelector<AppState, UserReducerType>(store => store.user)

    // Токен пользователя и функция для его запроса
    const { userToken, doFetch } = useGetUserToken()

    // При загрузке компонента...
    useEffect(function () {
        // Запрос токена пользователя с сервера если не известен его статус
        if (!authTokenStatus) doFetch()
    }, [])

    // При обновлении значения данных по токену...
    useEffect(function () {
        if (!userToken) return

        // Статус токена пользователя: 1 или 2
        const userTokenStatus = userToken.status === 'success' ? 2 : 1

        // Установка статуса токена в Хранилище
        dispatch( setAuthTokenStatus(userTokenStatus) )

    }, [userToken])


    // При изменении статуса токена
    useEffect(function () {
        if (!authTokenStatus) return

        // Поставить переменную isInitialized в true чтобы сообщить, что приложение проинициализировано.
        setIsInitialized(true)
    }, [authTokenStatus, setIsInitialized])
}