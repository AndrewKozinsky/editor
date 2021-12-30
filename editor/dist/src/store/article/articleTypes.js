var StoreArticleTypes;
(function (StoreArticleTypes) {
    // =============================================
    // Set links to iFrame elements
    StoreArticleTypes.SET_LINKS = 'SET_LINKS';
    // Установка данных последней введённого символа
    StoreArticleTypes.SET_PRESSED_KEY = 'SET_PRESSED_KEY';
    // Set components templates array
    StoreArticleTypes.SET_ARTICLE_ID = 'SET_ARTICLE_ID';
    // Set article object
    StoreArticleTypes.SET_ARTICLE = 'SET_ARTICLE';
    StoreArticleTypes.CHANGE_SITE_TEMPLATE_ID = 'CHANGE_SITE_TEMPLATE_ID';
    StoreArticleTypes.CHANGE_SITE_TEMPLATE_VERSION_HASH = 'CHANGE_SITE_TEMPLATE_VERSION_HASH';
    // Set article object
    StoreArticleTypes.SET_SITE_TEMPLATE = 'SET_SITE_TEMPLATE';
    // Увеличение хеша версии папок шаблонов компонентов. После этого хук запустит скачивание нового шаблона сайта
    StoreArticleTypes.CHANGE_TEMP_COMPS_FOLDERS_VERSION_HASH = 'CHANGE_TEMP_COMPS_FOLDERS_VERSION_HASH';
    // Увеличение хеша версии папок шаблонов компонентов. После этого хук запустит скачивание нового шаблона сайта
    StoreArticleTypes.CHANGE_TEMP_COMPS_VERSION_HASH = 'CHANGE_TEMP_COMPS_VERSION_HASH';
    StoreArticleTypes.SET_TEMP_COMP_FOLDERS = 'SET_TEMP_COMP_FOLDERS';
    // Типы типа и тип экшена
    // Set components templates array
    StoreArticleTypes.SET_TEMP_COMPS = 'SET_TEMP_COMPS';
    StoreArticleTypes.SET_FLASHED_ELEMENT = 'SET_FLASHED_ELEMENT';
    // Установка id выделенного текстового компонента
    StoreArticleTypes.SET_TEXT_COMP_ID = 'SET_TEXT_COMP_ID';
    StoreArticleTypes.CREATE_AND_SET_HISTORY_ITEM = 'CREATE_AND_SET_HISTORY_ITEM';
    // Action changes a current history step
    StoreArticleTypes.MAKE_HISTORY_STEP = 'MAKE_HISTORY_STEP';
    // Action changes a current history step
    StoreArticleTypes.SET_HISTORY_STEP_WHEN_ARTICLE_WAS_SAVED = 'SET_HISTORY_STEP_WHEN_ARTICLE_WAS_SAVED';
    // Установка id выделенного текстового компонента
    StoreArticleTypes.UPDATE_CURRENT_ARTICLE = 'UPDATE_CURRENT_ARTICLE';
    // Очистка статьи
    StoreArticleTypes.CLEAR_ARTICLE = 'CLEAR_ARTICLE';
})(StoreArticleTypes || (StoreArticleTypes = {}));
export default StoreArticleTypes;
//# sourceMappingURL=articleTypes.js.map