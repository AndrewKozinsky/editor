import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppState} from 'store/rootReducer'
import {useGetUserToken} from 'requests/authRequests'
import userActions from 'store/user/userActions'
import settingsActions from 'store/settings/settingsActions'
import StoreSettingsTypes from 'store/settings/settingsTypes'
import StoreSitesTypes from '../../../store/site/sitesTypes';
import sitesActions from '../../../store/site/sitesActions';

/** Хук инициализирующий приложение */
export function useInit() {

    // Проинициализировано ли приложение
    const [isInitialized, setIsInitialized] = useState(false)

    // Поставить настройки редактора в Хранилище
    useGetAndSetEditorSettings()

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
        // Получить из LocalStorage
        let language = <StoreSettingsTypes.EditorLanguage | null>localStorage.getItem('editorLanguage') // Язык интерфейса
        let theme = <StoreSettingsTypes.EditorTheme | null>localStorage.getItem('editorTheme') // Тема
        let size = <StoreSettingsTypes.EditorSize | null>localStorage.getItem('editorSize') // Размер элементов
        let mainTab = <StoreSettingsTypes.MainTab | null>+localStorage.getItem('editorTab') // id главной вкладки
        let siteId = <StoreSitesTypes.CurrentSiteId | null>localStorage.getItem('editorSiteId') // id сайта
        let settingsTabId = <StoreSettingsTypes.SettingsPanelTab | null>localStorage.getItem('editorSettingsTabId') // id вкладки в Настройках
        let sitePartTab = <StoreSitesTypes.RightMainTab | null>+localStorage.getItem('editorSitePartTab') // id вкладки в Настройках

        // Если каких-то значений нет, то поставить стандартные значения в LocalStorage
        if (!language) {
            language = 'eng' // Язык интерфейса: eng или rus
            localStorage.setItem('editorLanguage', language)
        }
        if (!theme) {
            theme = 'light' // Размер интерфейса: small, middle или big
            localStorage.setItem('editorTheme', theme)
        }
        if (!size) {
            size = 'small' // Тема интерфейса: light или dark
            localStorage.setItem('editorSize', size)
        }
        if (!mainTab) {
            mainTab = 0 // Первая вкладка
            localStorage.setItem('editorTab', mainTab.toString())
        }
        if (!siteId) {
            siteId = '' // Первая вкладка
            localStorage.setItem('editorSettingsTabId', siteId)
        }
        if (!settingsTabId) {
            settingsTabId = 'user' // Первая вкладка
            localStorage.setItem('editorSettingsTabId', settingsTabId)
        }
        if (!sitePartTab) {
            sitePartTab = 0 // Первая вкладка
            localStorage.setItem('editorSitePartTab', sitePartTab.toString())
        }

        // Поставить значения в Хранилище
        dispatch( settingsActions.setEditorLanguage(language) )
        dispatch( settingsActions.setEditorTheme(theme) )
        dispatch( settingsActions.setEditorSize(size) )
        dispatch( settingsActions.setMainTab(mainTab) )
        dispatch( sitesActions.setCurrentSiteId(siteId) )
        dispatch( settingsActions.setSettingsPanelTab(settingsTabId) )
        dispatch( sitesActions.setRightMainTab(sitePartTab) )
    }, [])
}


/**
 * Хук устанавливающий статус токена пользователя если он не известен (равен нулю).
 * Изначально токен статуса авторизации пользователя равен нулю.
 * Это значит не известно есть ли токен в куках и правилен ли он.
 * Поэтому делается запрос на сервер для его проверки. И в зависимости от этого статус становится
 * или 1 (токена нет или он неверный) или 2 (токен правильный)
 */
export function useSetTokenStatus(setIsInitialized: (isInitialized: boolean) => void) {

    const dispatch = useDispatch()

    // Получение статуса токена из Хранилища
    const { authTokenStatus } = useSelector((store: AppState) => store.user)

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

        // Если ответ успешен, то поставить 2, в противном случае токена нет, поэтому 1
        const userTokenStatus = userToken.status === 'success' ? 2 : 1

        // Установка статуса токена в Хранилище
        dispatch( userActions.setAuthTokenStatus(userTokenStatus) )

        // Если успешно зашли, то поставить в Хранилище почту пользователя
        if (userToken.status === 'success') {
            //@ts-ignore
            dispatch( userActions.setEmail(userToken.data.email) )
        }
    }, [userToken])

    // При изменении статуса токена
    useEffect(function () {
        if (!authTokenStatus) return

        // Поставить переменную isInitialized в true чтобы сообщить, что приложение проинициализировано.
        setIsInitialized(true)
    }, [authTokenStatus, setIsInitialized])
}
