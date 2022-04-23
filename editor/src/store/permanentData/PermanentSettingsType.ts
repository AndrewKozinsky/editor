// Тип данных настроек сохраняемых в LocalStorage
import StoreSettingsTypes from '../settings/settingsTypes'
import StoreSitesTypes from '../site/sitesTypes'

export type PermanentSettingsType = {
    common: PermanentSettingsCommonType
    groups: PermanentSettingsGroupType[]
    edit: PermanentSettingsEditType
}

// Тип данных группы
export type PermanentSettingsCommonType = {
    language: 'rus' | 'eng'  // Язык редактора
    theme: StoreSettingsTypes.EditorTheme, // Тема интерфейса
    mainTab: StoreSettingsTypes.MainTab,  // Номер активной главной вкладки
    groupPartTab: StoreSitesTypes.RightMainTab, // Номер активной вкладки в Группе
    settingsTab: StoreSettingsTypes.SettingsPanelTab,      // id активной вкладки в Настройках
    helpTab: 'reg',              // Номер активной вкладки в Помощи (ПОЗЖЕ ЭТО ПЕРЕСМОТРИ!!!)
    groupId: StoreSitesTypes.CurrentSiteId,  // id текущей группы
}

// Тип данных группы
export type PermanentSettingsGroupType = {
    groupId: StoreSitesTypes.CurrentSiteId,  // id этой группы
    compOpenedFolders: number[]      // ids открытых папок в компонентах группы
    artOpenedFolders: number[]       // ids открытых папок в статьях группы
    groupTemplateId: null | number   // id выбранного шаблона подключаемых файлов
    metaTemplateId: null | number    // id выбранного шаблона метаданных
    componentId: null | number       // id выбранного шаблона компонента
    componentType: 'folder' | 'file' // Тип выбранного компонента: папка компонентов или компонент
    articleId: null | number         // id выбранной статьи
    articleType: 'folder' | 'file'   // Тип выбранного элемента: папка или статья
}

// Тип данных группы
export type PermanentSettingsEditType = {
    articleId: null | number      // id редактируемой статьи
    openCompFoldersIds: number[], // Массив идентификаторов открытых папок компонентов в редактируемой статье
}