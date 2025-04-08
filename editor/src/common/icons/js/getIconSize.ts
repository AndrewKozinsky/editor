
/**
 * Функция возвращает атрибуты с размерами значка в SVG.
 * В зависимости от типа значка будут возвращены разные названия размеры
 * @param {String} type — тип значка.
 */
export function getIconSize(type: string) {

    switch (type) {
        // Логотип редактора
        case 'logo':
            return {
                width: '84px',
                height: '18px',
                viewBox: '0 0 84 18'
            }
        // Значок ошибки
        case 'errorTriangle':
        case 'btnSignText':
            return {
                width: '13px',
                height: '13px',
                viewBox: '0 0 13 13'
            }
        // Стрелочки выпадающего списка
        case 'selectInputArrows':
            return {
                width: '8px',
                height: '14px',
                viewBox: '0 0 8 14'
            }
        // Значки главных вкладок
        case 'mainTabMaterials':
        case 'mainTabEditor':
        case 'mainTabSettings':
        // Значки на вкладках сайта
        case 'groupTabGroup':
        case 'groupTabTemplates':
        case 'groupTabMeta':
        case 'groupTabComponents':
        case 'groupTabArticle':
            return {
                width: '31px',
                height: '26px',
                viewBox: '0 0 31 26'
            }
        case 'mainTabHelp':
            return {
                width: '31px',
                height: '25px',
                viewBox: '0 0 31 25'
            }
        // Закругляемая часть в кнопки вкладки
        case 'mainTabRoundScion':
            return {
                width: '3px',
                height: '3px',
                viewBox: '0 0 3 3'
            }
        // Значки на кнопках
        case 'btnSignSave':
            return {
                width: '12px',
                height: '15px',
                viewBox: '0 0 12 15'
            }
        case 'btnSignFolder':
        case 'btnSignAdd':
        case 'btnSignJson':
        case 'btnSignEdit':
            return {
                width: '15px',
                height: '15px',
                viewBox: '0 0 15 15'
            }
        case 'btnSignTrash':
        case 'btnSignUndo':
        case 'btnSignRedo':
            return {
                width: '14px',
                height: '15px',
                viewBox: '0 0 14 15'
            }
        case 'btnSignCode':
            return {
                width: '16px',
                height: '15px',
                viewBox: '0 0 16 15'
            }

        case 'btnSignClose':
            return {
                width: '15px',
                height: '15px',
                viewBox: '0 0 15 15'
            }
        case 'btnSignExit':
            return {
                width: '13px',
                height: '15px',
                viewBox: '0 0 13 15'
            }
        // Тема интерфейса
        case 'editorLightTheme':
        case 'editorDarkTheme':
            return {
                width: '76px',
                height: '76px',
                viewBox: '0 0 76 76'
            }
        // Значки на FilesTree
        case 'filesTreeTriangle':
            return {
                width: '10px',
                height: '10px',
                viewBox: '0 0 10 10'
            }
        case 'filesTreeFolder':
        case 'filesTreeFolderPlus':
        case 'filesTreePlus':
        case 'filesTreeTrash':
        case 'filesTreeTorus':
        case 'filesTreeUp':
        case 'filesTreeDown':
            return {
                width: '15px',
                height: '15px',
                viewBox: '0 0 15 15'
            }
        case 'filesTreePlaceMark':
            return {
                width: '8px',
                height: '5px',
                viewBox: '0 0 8 5'
            }
        case 'articleMenu':
            return {
                width: '18px',
                height: '14px',
                viewBox: '0 0 18 14'
            }
        case 'noticeInfo':
        case 'noticeError':
        case 'noticeSuccess':
            return {
                width: '18px',
                height: '18px',
                viewBox: '0 0 18 18'
            }
        // Значки на кнопках работы с элементами внизу
        case 'elBtnSignMoveInside':
        case 'elBtnSignMoveLeft':
        case 'elBtnSignMoveRight':
        case 'elBtnSignUp':
        case 'elBtnSignDown':
        case 'elBtnSignClone':
        case 'elBtnSignCloneWithChildren':
        case 'elBtnSignRemove':
        case 'elBtnSignHide':
        case 'elBtnSignVisible':
            return {
                width: '17px',
                height: '17px',
                viewBox: '0 0 17 17'
            }

        // Значки в слоях
        case 'layerComp':
        case 'layerText':
        case 'layerCollapse':
            return {
                width: '12px',
                height: '12px',
                viewBox: '0 0 12 12'
            }
        case 'layerVisible':
        case 'layerHidden':
            return {
                width: '15px',
                height: '16px',
                viewBox: '0 0 15 16'
            }
        default: {
            return {}
        }
    }
}
