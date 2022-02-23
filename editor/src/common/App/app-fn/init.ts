import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getFromLocalStorage } from 'utils/miscUtils'
import useGetUserSelectors from 'store/user/userSelectors'
import settingsActions from 'store/settings/settingsActions'
import sitesActions from 'store/site/sitesActions'
import userActions from 'store/user/userActions'
import articleActions from 'store/article/articleActions'
import helpActions from 'store/help/helpActions'
import config from 'utils/config'


/** Хук получающий из LocalStorage данные о языке интерфейса, теме, открытой вкладке и прочих вещах
 *  и заносящий это в Хранилище при запуске приложения */
export function useGetAndSetEditorSettings() {
    const dispatch = useDispatch()

    // При отрисовке компонента...
    useEffect(function () {
        // Получение значения из LocalStorage
        let theme = getFromLocalStorage(config.ls.editorTheme, 'light') // Тема интерфейса
        let mainTab = getFromLocalStorage(config.ls.editorTab, 3) // id главной вкладки
        let siteId = getFromLocalStorage(config.ls.editorSiteId, '') // id сайта
        let settingsTabId = getFromLocalStorage(config.ls.editorSettingsTabId, 'user') // id вкладки в Настройках
        let helpTabId = getFromLocalStorage(config.ls.editorHelpTabId, 'reg') // id вкладки в Настройках
        let sitePartTab = getFromLocalStorage(config.ls.editorSitePartTab, 0) // id вкладки в Сайтах
        let editorSiteTemplateId = getFromLocalStorage(config.ls.editorSiteTemplateId, null) // id выбранного шаблона подключаемых файлов
        let editorMetaTemplateId = getFromLocalStorage(config.ls.editorMetaTemplateId, null) // id выбранного шаблона метаданных
        let editorComponentId = getFromLocalStorage(config.ls.editorComponentId, null) // id выбранного шаблона компонента
        let editorComponentType = getFromLocalStorage(config.ls.editorComponentType, null) // тип выбранного элемента: папка или компонент
        let editorArticleId = getFromLocalStorage(config.ls.editorArticleId, null) // id выбранной папки или статьи
        let editorArticleType = getFromLocalStorage(config.ls.editorArticleType, null) // тип выбранного элемента: папка или статья

        let editArticleId = getFromLocalStorage(config.ls.editArticleId, null) // id редактируемой статьи

        // Поставить значения в Хранилище
        // ПЕРЕД ТЕМ КАК СТАВИТЬ ДАННЫЕ В ХРАНИЛИЩЕ НУЖНО УБЕДИТЬСЯ, ЧТО ОНИ ВЕРНЫ.
        dispatch( settingsActions.setEditorTheme(theme) )
        dispatch( settingsActions.setMainTab(mainTab) )
        dispatch( sitesActions.setCurrentSiteId(siteId) )
        dispatch( settingsActions.setSettingsPanelTab(settingsTabId) )
        dispatch( helpActions.setHelpPanelTab(helpTabId) )
        dispatch( sitesActions.setRightMainTab(sitePartTab) )
        dispatch( sitesActions.setCurrentSiteTemplateId(editorSiteTemplateId) )
        dispatch( sitesActions.setCurrentMetaTemplateId(editorMetaTemplateId) )
        dispatch( sitesActions.setCurrentComp(editorComponentId, editorComponentType) )
        dispatch( sitesActions.setCurrentArt(editorArticleId, editorArticleType) )

        dispatch( articleActions.setArticleId(editArticleId) )
    }, [])
}


/**
 * Хук устанавливающий статус токена пользователя если он не известен.
 * Изначально токен статуса авторизации пользователя равен unknown.
 * Это значит не известно есть ли токен в куках и правилен ли он.
 * Поэтому делается запрос на сервер для его проверки. И в зависимости от этого статус становится
 * или fail (токена нет или он неверный) или success (токен правильный)
 */
export function useGetUserDataAndStatus() {
    const dispatch = useDispatch()

    // Статус токена
    const { authTokenStatus } = useGetUserSelectors()

    // Проинициализировано ли приложение
    const [isUserDataReceived, setIsUserDataReceived] = useState(false)

    useEffect(function () {
        // Запрос токена пользователя с сервера если не известен его статус
        if (authTokenStatus === 'unknown') {
            dispatch(userActions.requestUserData())
        }
        else if (['fail', 'success'].includes(authTokenStatus)) {
            setIsUserDataReceived(true)
        }
    }, [authTokenStatus])

    // Возвратить проинициализировано ли приложение.
    return isUserDataReceived
}
