// import React from 'react';

import mainTabMaterialsSmall from '../icons/mainTabMaterialsSmall';
import mainTabMaterialsMiddle from '../icons/mainTabMaterialsMiddle';
import mainTabMaterialsBig from '../icons/mainTabMaterialsBig';
import mainTabEditorSmall from '../icons/mainTabEditorSmall';
import mainTabEditorMiddle from '../icons/mainTabEditorMiddle';
import mainTabEditorBig from '../icons/mainTabEditorBig';
import mainTabSettingsSmall from '../icons/mainTabSettingsSmall';
import mainTabSettingsMiddle from '../icons/mainTabSettingsMiddle';
import mainTabSettingsBig from '../icons/mainTabSettingsBig';
import BtnSignSaveSmall from '../icons/btnSignSaveSmall';
import BtnSignSaveMiddle from '../icons/btnSignSaveMiddle';
import BtnSignSaveBig from '../icons/btnSignSaveBig';
import BtnSignFolderSmall from '../icons/btnSignFolderSmall';
import BtnSignFolderMiddle from '../icons/btnSignFolderMiddle';
import BtnSignFolderBig from '../icons/btnSignFolderBig';
import BtnSignTrashSmall from '../icons/btnSignTrashSmall';
import BtnSignTrashMiddle from '../icons/btnSignTrashMiddle';
import BtnSignTrashBig from '../icons/btnSignTrashBig';
import BtnSignCodeSmall from '../icons/btnSignCodeSmall';
import BtnSignCodeMiddle from '../icons/btnSignCodeMiddle';
import BtnSignCodeBig from '../icons/btnSignCodeBig';
import BtnSignAddSmall from '../icons/btnSignAddSmall';
import BtnSignAddMiddle from '../icons/btnSignAddMiddle';
import BtnSignAddBig from '../icons/btnSignAddBig';
import BtnSignJsonSmall from '../icons/btnSignJsonSmall';
import BtnSignJsonMiddle from '../icons/btnSignJsonMiddle';
import BtnSignJsonBig from '../icons/btnSignJsonBig';
import StoreSettingsTypes from '../../../store/settings/settingsTypes';
import Logo from '../icons/logo';
import ErrorTriangle from '../icons/errorTriangle';
import SuccessCircle from '../icons/successCircle';
import SelectInputSmallArrows from '../icons/selectInputSmallArrows';
import SelectInputMiddleArrows from '../icons/selectInputMiddleArrows';
import SelectInputBigArrows from '../icons/selectInputBigArrows';
import MainTabMaterialsSmall from '../icons/mainTabMaterialsSmall';
import MainTabMaterialsMiddle from '../icons/mainTabMaterialsMiddle';
import MainTabMaterialsBig from '../icons/mainTabMaterialsBig';
import MainTabEditorSmall from '../icons/mainTabEditorSmall';
import MainTabEditorMiddle from '../icons/mainTabEditorMiddle';
import MainTabEditorBig from '../icons/mainTabEditorBig';
import MainTabSettingsSmall from '../icons/mainTabSettingsSmall';
import MainTabSettingsMiddle from '../icons/mainTabSettingsMiddle';
import MainTabSettingsBig from '../icons/mainTabSettingsBig';
import MainTabRoundScion from '../icons/mainTabRoundScion';
import EditorLightThemeSmall from '../icons/editorLightThemeSmall';
import EditorLightThemeMiddle from '../icons/editorLightThemeMiddle';
import EditorLightThemeBig from '../icons/editorLightThemeBig';
import EditorDarkThemeSmall from '../icons/editorDarkThemeSmall';
import EditorDarkThemeMiddle from '../icons/editorDarkThemeMiddle';
import EditorDarkThemeBig from '../icons/editorDarkThemeBig';
import FilesTreeTriangleSmall from '../icons/filesTreeTriangleSmall';
import FilesTreeTriangleMiddle from '../icons/filesTreeTriangleMiddle';
import FilesTreeTriangleBig from '../icons/filesTreeTriangleBig';
import FilesTreeFolderSmall from '../icons/filesTreeFolderSmall';
import FilesTreeFolderMiddle from '../icons/filesTreeFolderMiddle';
import FilesTreeFolderBig from '../icons/filesTreeFolderBig';
import FilesTreeFolderPlusSmall from '../icons/filesTreeFolderPlusSmall';
import FilesTreeFolderPlusMiddle from '../icons/filesTreeFolderPlusMiddle';
import FilesTreeFolderPlusBig from '../icons/filesTreeFolderPlusBig';
import FilesTreePlusSmall from '../icons/filesTreePlusSmall';
import FilesTreePlusMiddle from '../icons/filesTreePlusMiddle';
import FilesTreePlusBig from '../icons/filesTreePlusBig';

/**
 * Функция возращает атрибуты с размерами значка в SVG.
 * В зависимости от типа значка будут возвращены разные названия размеры
 * @param {String} type — тип значка.
 * @param {String} size — размер значка.
 */
export function getIconSizes(type: string, size: StoreSettingsTypes.EditorSize = 'small') {


    const sizes = {
        // Логотип редактора
        logo: {
            small: {
                width: "84px",
                height: "18px",
                viewBox: "0 0 84 18"
            }
        },
        // Значёк ошибки
        errorTriangle: {
            small: {
                width: "13px",
                height: "13px",
                viewBox: "0 0 13 13"
            }
        },
        // Значёк успеха
        successCircle: {
            small: {
                width: "13px",
                height: "13px",
                viewBox: "0 0 13 13"
            }
        },
        // Галочка выбранного флага
        selectInputSmallArrows: {
            small: {
                width: "8px",
                height: "14px",
                viewBox: "0 0 8 14"
            }
        },
        selectInputMiddleArrows: {
            small: {
                width: "10px",
                height: "17px",
                viewBox: "0 0 10 17"
            }
        },
        selectInputBigArrows: {
            small: {
                width: "10px",
                height: "20px",
                viewBox: "0 0 10 20"
            }
        },
        // Значки главных вкладок
        mainTabMaterials: {
            small: {
                width: "39px",
                height: "34px",
                viewBox: "0 0 39 34"
            },
            middle: {
                width: "45px",
                height: "39px",
                viewBox: "0 0 45 39"
            },
            big: {
                width: "51px",
                height: "44px",
                viewBox: "0 0 51 44"
            },
        },
        mainTabEditor: {
            small: {
                width: "39px",
                height: "34px",
                viewBox: "0 0 39 34"
            },
            middle: {
                width: "45px",
                height: "39px",
                viewBox: "0 0 45 39"
            },
            big: {
                width: "51px",
                height: "44px",
                viewBox: "0 0 51 44"
            },
        },
        mainTabSettings: {
            small: {
                width: "39px",
                height: "34px",
                viewBox: "0 0 39 34"
            },
            middle: {
                width: "45px",
                height: "39px",
                viewBox: "0 0 45 39"
            },
            big: {
                width: "51px",
                height: "44px",
                viewBox: "0 0 51 44"
            }
        },

        // Значки на вкладках сайта
        siteTabSite: {
            small: {
                width: "39px",
                height: "34px",
                viewBox: "0 0 39 34"
            },
            middle: {
                width: "45px",
                height: "39px",
                viewBox: "0 0 45 39"
            },
            big: {
                width: "51px",
                height: "44px",
                viewBox: "0 0 51 44"
            },
        },
        siteTabPlugins: {
            small: {
                width: "39px",
                height: "34px",
                viewBox: "0 0 39 34"
            },
            middle: {
                width: "45px",
                height: "39px",
                viewBox: "0 0 45 39"
            },
            big: {
                width: "51px",
                height: "44px",
                viewBox: "0 0 51 44"
            },
        },
        siteTabComponents: {
            small: {
                width: "39px",
                height: "34px",
                viewBox: "0 0 39 34"
            },
            middle: {
                width: "45px",
                height: "39px",
                viewBox: "0 0 45 39"
            },
            big: {
                width: "51px",
                height: "44px",
                viewBox: "0 0 51 44"
            }
        },
        siteTabArticle: {
            small: {
                width: "39px",
                height: "34px",
                viewBox: "0 0 39 34"
            },
            middle: {
                width: "45px",
                height: "39px",
                viewBox: "0 0 45 39"
            },
            big: {
                width: "51px",
                height: "44px",
                viewBox: "0 0 51 44"
            }
        },

        // Закругляемая часть в кнопки вкладки
        mainTabRoundScion: {
            small: {
                width: "3px",
                height: "3px",
                viewBox: "0 0 3 3"
            }
        },
        // Значки на кнопках
        btnSignSave: {
            small: {
                width: "12px",
                height: "15px",
                viewBox: "0 0 12 15"
            },
            middle: {
                width: "14px",
                height: "17px",
                viewBox: "0 0 14 17"
            },
            big: {
                width: "15px",
                height: "19px",
                viewBox: "0 0 15 19"
            }
        },
        btnSignFolder: {
            small: {
                width: "15px",
                height: "15px",
                viewBox: "0 0 15 15"
            },
            middle: {
                width: "17px",
                height: "17px",
                viewBox: "0 0 17 17"
            },
            big: {
                width: "19px",
                height: "19px",
                viewBox: "0 0 19 19"
            }
        },
        btnSignTrash: {
            small: {
                width: "14px",
                height: "15px",
                viewBox: "0 0 14 15"
            },
            middle: {
                width: "16px",
                height: "17px",
                viewBox: "0 0 16 17"
            },
            big: {
                width: "18px",
                height: "19px",
                viewBox: "0 0 18 19"
            }
        },
        btnSignCode: {
            small: {
                width: "16px",
                height: "15px",
                viewBox: "0 0 16 15"
            },
            middle: {
                width: "18px",
                height: "17px",
                viewBox: "0 0 18 17"
            },
            big: {
                width: "20px",
                height: "19px",
                viewBox: "0 0 20 19"
            }
        },
        btnSignAdd: {
            small: {
                width: "15px",
                height: "15px",
                viewBox: "0 0 15 15"
            },
            middle: {
                width: "17px",
                height: "17px",
                viewBox: "0 0 17 17"
            },
            big: {
                width: "19px",
                height: "19px",
                viewBox: "0 0 19 19"
            }
        },
        btnSignJson: {
            small: {
                width: "15px",
                height: "15px",
                viewBox: "0 0 15 15"
            },
            middle: {
                width: "17px",
                height: "17px",
                viewBox: "0 0 17 17"
            },
            big: {
                width: "19px",
                height: "19px",
                viewBox: "0 0 19 19"
            }
        },
        btnSignClose: {
            tiny: {
                width: "13px",
                height: "13px",
                viewBox: "0 0 13 13"
            },
            small: {
                width: "15px",
                height: "15px",
                viewBox: "0 0 15 15"
            },
            middle: {
                width: "17px",
                height: "17px",
                viewBox: "0 0 17 17"
            },
            big: {
                width: "19px",
                height: "19px",
                viewBox: "0 0 19 19"
            }
        },
        btnSignExit: {
            small: {
                width: "13px",
                height: "15px",
                viewBox: "0 0 13 15"
            },
            middle: {
                width: "15px",
                height: "17px",
                viewBox: "0 0 15 17"
            },
            big: {
                width: "17px",
                height: "19px",
                viewBox: "0 0 17 19"
            }
        },

        // Тема интерфейса
        editorLightTheme: {
            small: {
                width: "76px",
                height: "76px",
                viewBox: "0 0 76 76"
            },
            middle: {
                width: "87px",
                height: "87px",
                viewBox: "0 0 87 87"
            },
            big: {
                width: "99px",
                height: "99px",
                viewBox: "0 0 99 99"
            },
        },
        editorDarkTheme: {
            small: {
                width: "76px",
                height: "76px",
                viewBox: "0 0 76 76"
            },
            middle: {
                width: "87px",
                height: "87px",
                viewBox: "0 0 87 87"
            },
            big: {
                width: "99px",
                height: "99px",
                viewBox: "0 0 99 99"
            },
        },

        // Значки на FilesTree
        filesTreeTriangle: {
            small: {
                width: "10px",
                height: "10px",
                viewBox: "0 0 10 10"
            },
            middle: {
                width: "12px",
                height: "12px",
                viewBox: "0 0 12 12"
            },
            big: {
                width: "13px",
                height: "13px",
                viewBox: "0 0 13 13"
            },
        },
        filesTreeFolder: {
            small: {
                width: "15px",
                height: "15px",
                viewBox: "0 0 15 15"
            },
            middle: {
                width: "17px",
                height: "17px",
                viewBox: "0 0 17 17"
            },
            big: {
                width: "19px",
                height: "19px",
                viewBox: "0 0 19 19"
            },
        },
        filesTreeFolderPlus: {
            small: {
                width: "15px",
                height: "15px",
                viewBox: "0 0 15 15"
            },
            middle: {
                width: "17px",
                height: "17px",
                viewBox: "0 0 17 17"
            },
            big: {
                width: "19px",
                height: "19px",
                viewBox: "0 0 19 19"
            },
        },
        filesTreePlus: {
            small: {
                width: "15px",
                height: "15px",
                viewBox: "0 0 15 15"
            },
            middle: {
                width: "17px",
                height: "17px",
                viewBox: "0 0 17 17"
            },
            big: {
                width: "19px",
                height: "19px",
                viewBox: "0 0 19 19"
            },
        },
        // Значёк указателя помещения перетаскиваемого элемента
        filesTreePlaceMark: {
            small: {
                width: "8px",
                height: "5px",
                viewBox: "0 0 8 5"
            },
        },
    }
    //@ts-ignore
    return sizes[type][size]
}






