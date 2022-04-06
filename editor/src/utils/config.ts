// Объект настройки
const config = {
    // Названия ключей данных в LocalStorage
    ls: {
        editorCompOpenedFolders: 'editorCompOpenedFolders', // Ко всем данным добавь описание какие данные хранит каждый ключ
        editorLanguage: 'editorLanguage',
        editorTheme: 'editorTheme',
        editorTab: 'editorTab',
        editorSettingsTabId: 'editorSettingsTabId',
        editorHelpTabId: 'editorHelpTabId',
        editorArtOpenedFolders: 'editorArtOpenedFolders',
        editorSiteId: 'editorSiteId',
        editorSitePartTab: 'editorSitePartTab',
        editorSiteTemplateId: 'editorSiteTemplateId',
        editorMetaTemplateId: 'editorMetaTemplateId',
        editorComponentId: 'editorComponentId',
        editorComponentType: 'editorComponentType',
        editorArticleId: 'editorArticleId',
        editorArticleType: 'editorArticleType',
        editorLastUserEmail: 'editorLastUserEmail', // Почта пользователя, который входил в учётную запись в предыдущий раз

        editArticleId: 'editArticleId', // id редактируемой статьи
        editOpenCompFoldersIds: 'editOpenCompFoldersIds' // Массив идентификаторов открытых папок компонентов в редактируемой статье
    }
}

export default config