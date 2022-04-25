import StoreSettingsTypes from '../settings/settingsTypes'
import StoreSitesTypes from '../site/sitesTypes'
import TempCompsTreeType from '../../editor/LeftPart-2/TempComps/TempCompsTree/types'

// Тип данных настроек сохраняемых в LocalStorage
export type LocalStorageProxyType = {
    common: LocalStorageProxyCommonType
    groups: LocalStorageProxyGroupType[]
    edit: LocalStorageProxyEditType
}

// Тип данных группы
export type LocalStorageProxyCommonType = {
    theme: StoreSettingsTypes.EditorTheme // Тема интерфейса
    mainTab: StoreSettingsTypes.MainTab  // Номер активной главной вкладки
    groupPartTab: StoreSitesTypes.RightMainTab // Номер активной вкладки в Группе
    settingsTab: StoreSettingsTypes.SettingsPanelTab      // id активной вкладки в Настройках
    helpTab: 'reg'              // Номер активной вкладки в Помощи (ПОЗЖЕ ЭТО ПЕРЕСМОТРИ!!!)
    groupId: StoreSitesTypes.CurrentSiteId  // id текущей группы
}

// Тип данных группы
export type LocalStorageProxyGroupType = {
    groupId: StoreSitesTypes.CurrentSiteId,  // id этой группы
    compOpenedFolders: number[]      // ids открытых папок в компонентах группы
    artOpenedFolders: number[]       // ids открытых папок в статьях группы
    groupTemplateId: null | number   // id выбранного шаблона подключаемых файлов
    metaTemplateId: null | number    // id выбранного шаблона метаданных
    componentId: null | number       // id выбранного шаблона компонента
    componentType: 'folder' | 'file' // Тип выбранного компонента: папка компонентов или компонент
    articleId: null | number         // id выбранной статьи
    articleType: 'folder' | 'file'   // Тип выбранного элемента: папка или статья
    tempCompsOpenFoldersIdsInArt: TempCompsTreeType.FolderItemId[], // Массив идентификаторов открытых папок компонентов в редактируемой статье
}

// Тип данных группы
export type LocalStorageProxyEditType = {
    articleId: null | number      // id редактируемой статьи
}