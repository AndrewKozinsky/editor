import {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { getFromLocalStorage, setInLocalStorage } from 'utils/miscUtils'
import useGetUserSelectors from 'store/user/userSelectors'
import settingsActions from 'store/settings/settingsActions'
import sitesActions from 'store/site/sitesActions'
import articleActions from 'store/article/articleActions'
import {MiscTypes} from '../../../types/miscTypes'
import permanentDataActions from 'store/permanentData/permanentDataActions'
import {
    PermanentSettingsCommonType,
    PermanentSettingsType,
    PermanentSettingsEditType,
    PermanentSettingsGroupType
} from 'store/permanentData/PermanentSettingsType'
import useGetPermanentDataSelectors from 'store/permanentData/permanentDataSelectors'



/** Хук наблюдает за изменением Хранилища с объектом хранящим настройки редактора,
 * которые должны быть в LocalStorage, и сохраняет их там.
 * Объект с настройками хранится под адресом почты на которую зарегистрирована учётная запись.
 * При переключении учётной записи будет взяты другие настройки
 */
export function useSaveEditorSettingsInLocalStorage() {
    const { email } = useGetUserSelectors()
    const settings = useGetPermanentDataSelectors()

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
        const settingsObj: PermanentSettingsType = getFromLocalStorage(email, null)

        if (settingsObj) {
            dispatch( permanentDataActions.setRoot(settingsObj) )
        }
        else {
            dispatch( permanentDataActions.setRoot({
                common: {
                    language: 'rus',
                    theme: 'light',
                    mainTab: 0,
                    groupPartTab: 0,
                    settingsTab: 'user',
                    helpTab: 'reg',
                    groupId: null
                },
                groups: [],
                edit: {
                    articleId: null,
                    openCompFoldersIds: []
                }
            }) )
        }
    }, [email])
}


export function useUpdateStoreDependsOnEditorSettingsAfterStartUp() {
    const dispatch = useDispatch()
    const permanentData = useGetPermanentDataSelectors()
    const [settingsSet, setSettingsSet] = useState(false)

    useEffect(function () {
        if (!permanentData || settingsSet) return

        // Установка общих настроек
        setCommonSettings(permanentData.common, dispatch)

        // Установка настроек групп
        if (permanentData.common.groupId) {
            const currentGroupSettings = permanentData.groups.find((group: PermanentSettingsGroupType) => {
                return group.groupId === permanentData.common.groupId
            })

            if (currentGroupSettings) {
                setGroupSettings(currentGroupSettings, dispatch)
            }
        }

        // Установка настроек редактируемой статьи
        setEditSettings(permanentData.edit, dispatch)

        setSettingsSet(true)
    }, [permanentData])
}

/**
 * Функция получает общие настройки редактора и ставит в Хранилище
 * @param {Object} commonSettings — объект с общими настройками редактора.
 * @param {Object} dispatch — функция dispatch()
 */
function setCommonSettings(commonSettings: PermanentSettingsCommonType, dispatch: MiscTypes.AppDispatch) {
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
    groupSettings: PermanentSettingsGroupType,
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
function setEditSettings(editSettings: PermanentSettingsEditType, dispatch: MiscTypes.AppDispatch) {
    dispatch( articleActions.setArticleIdOuter(editSettings.articleId) )
}



