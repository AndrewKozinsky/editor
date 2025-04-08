import {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { getFromLocalStorage, setInLocalStorage } from 'utils/miscUtils'
import useGetUserSelectors from 'store/user/userSelectors'
import settingsActions from 'store/settings/settingsActions'
import sitesActions from 'store/site/sitesActions'
import articleActions from 'store/article/articleActions'
import {MiscTypes} from 'types/miscTypes'
import localStorageProxyActions from 'store/localStorageProxy/localStorageProxyActions'
import {
    LocalStorageProxyCommonType,
    LocalStorageProxyType,
    LocalStorageProxyEditType,
    LocalStorageProxyGroupType
} from 'store/localStorageProxy/localStorageProxyType'
import useGetLocalStorageProxySelectors from 'store/localStorageProxy/localStorageProxySelectors'



/** Хук наблюдает за изменением Хранилища с объектом хранящим настройки редактора,
 * которые должны быть в LocalStorage, и сохраняет их там.
 * Объект с настройками хранится под адресом почты на которую зарегистрирована учётная запись.
 * При переключении учётной записи будет взяты другие настройки
 */
export function useSaveEditorSettingsInLocalStorage() {
    const { email } = useGetUserSelectors()
    const settings = useGetLocalStorageProxySelectors()

    useEffect(function () {
        if (!email) return

        setInLocalStorage(email, settings, true)
    }, [settings])
}

/** Хук получающий из LocalStorage данные о языке интерфейса, теме, открытой вкладке и прочих вещах
 *  и заносящий это в Хранилище при запуске приложения
 */
export function useGetEditorSettingsFromLocalStorage() {
    const dispatch = useDispatch()
    const { email } = useGetUserSelectors()

    useEffect(function () {
        if (!email) return

        // Объект с настройками из LocalStorage
        const settingsObj: LocalStorageProxyType = getFromLocalStorage(email, null)

        if (settingsObj) {
            dispatch( localStorageProxyActions.setRoot(settingsObj) )
        }
        else {
            dispatch( localStorageProxyActions.setRoot({
                common: {
                    theme: 'light',
                    mainTab: 0,
                    groupPartTab: 0,
                    settingsTab: 'user',
                    helpTab: 'reg',
                    groupId: null,
                },
                groups: [],
                edit: {
                    articleId: null,
                }
            }) )
        }
    }, [email])
}


export function useUpdateStoreDependsOnEditorSettingsAfterStartUp() {
    const dispatch = useDispatch()
    const localStorageProxy = useGetLocalStorageProxySelectors()
    const [settingsSet, setSettingsSet] = useState(false)

    useEffect(function () {
        if (!localStorageProxy || settingsSet) return

        // Установка общих настроек
        setCommonSettings(localStorageProxy.common, dispatch)

        // Установка настроек групп
        if (localStorageProxy.common.groupId) {
            const currentGroupSettings = localStorageProxy.groups.find((group: LocalStorageProxyGroupType) => {
                return group.groupId === localStorageProxy.common.groupId
            })

            if (currentGroupSettings) {
                setGroupSettings(currentGroupSettings, dispatch)
            }
        }

        // Установка настроек редактируемой статьи
        setEditSettings(localStorageProxy.edit, dispatch)

        setSettingsSet(true)
    }, [localStorageProxy])
}

/**
 * Функция получает общие настройки редактора и ставит в Хранилище
 * @param {Object} commonSettings — объект с общими настройками редактора.
 * @param {Object} dispatch — функция dispatch()
 */
function setCommonSettings(commonSettings: LocalStorageProxyCommonType, dispatch: MiscTypes.AppDispatch) {
    dispatch( settingsActions.setMainTabOuter(commonSettings.mainTab) )
    dispatch( sitesActions.setRightMainTabOuter(commonSettings.groupPartTab) )
    dispatch( settingsActions.setEditorThemeOuter(commonSettings.theme) )
    dispatch( sitesActions.setCurrentSiteIdOuter(commonSettings.groupId) )
    dispatch( settingsActions.setSettingsPanelTabOuter(commonSettings.settingsTab) )
}

/**
 * Функция получает объект с настройками группы и ставит в Хранилище
 * @param {Object} groupSettings — объект с настройками текущей группы.
 * @param {Object} dispatch — функция dispatch()
 */
export function setGroupSettings(
    groupSettings: LocalStorageProxyGroupType,
    dispatch: MiscTypes.AppDispatch
) {
    dispatch( sitesActions.setCurrentSiteTemplateIdOuter(groupSettings.groupId, groupSettings.groupTemplateId) )
    dispatch( sitesActions.setCurrentMetaTemplateIdOuter(groupSettings.groupId, groupSettings.metaTemplateId) )
    dispatch( sitesActions.setCurrentCompOuter(groupSettings.groupId, groupSettings.componentId, groupSettings.componentType) )
    dispatch( sitesActions.setCurrentArtOuter(groupSettings.groupId, groupSettings.articleId, groupSettings.articleType) )
}

/**
 * Функция получает настройки редактируемой статьи и ставит в Хранилище
 * @param {Object} editSettings — объект с настройками редактируемой статьи.
 * @param {Object} dispatch — функция dispatch()
 */
function setEditSettings(editSettings: LocalStorageProxyEditType, dispatch: MiscTypes.AppDispatch) {
    dispatch( articleActions.setArticleIdOuter(editSettings.articleId) )
}



