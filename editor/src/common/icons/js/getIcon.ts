import {ReactNode} from 'react'
import Logo from '../icons/logo'
import ErrorTriangle from '../icons/errorTriangle'
import SuccessCircle from '../icons/successCircle'
import SelectInputSmallArrows from '../icons/selectInputSmallArrows'
import SelectInputMiddleArrows from '../icons/selectInputMiddleArrows'
import SelectInputBigArrows from '../icons/selectInputBigArrows'
import MainTabMaterialsSmall from '../icons/mainTabMaterialsSmall'
import MainTabMaterialsMiddle from '../icons/mainTabMaterialsMiddle'
import MainTabMaterialsBig from '../icons/mainTabMaterialsBig'
import MainTabEditorSmall from '../icons/mainTabEditorSmall'
import MainTabEditorMiddle from '../icons/mainTabEditorMiddle'
import MainTabEditorBig from '../icons/mainTabEditorBig'
import MainTabSettingsSmall from '../icons/mainTabSettingsSmall'
import MainTabSettingsMiddle from '../icons/mainTabSettingsMiddle'
import MainTabSettingsBig from '../icons/mainTabSettingsBig'
import MainTabRoundScion from '../icons/mainTabRoundScion'
import BtnSignSaveSmall from '../icons/btnSignSaveSmall'
import BtnSignSaveMiddle from '../icons/btnSignSaveMiddle'
import BtnSignSaveBig from '../icons/btnSignSaveBig'
import BtnSignFolderSmall from '../icons/btnSignFolderSmall'
import BtnSignFolderBig from '../icons/btnSignFolderBig'
import BtnSignTrashSmall from '../icons/btnSignTrashSmall'
import BtnSignTrashMiddle from '../icons/btnSignTrashMiddle'
import BtnSignCodeMiddle from '../icons/btnSignCodeMiddle'
import BtnSignAddMiddle from '../icons/btnSignAddMiddle'
import BtnSignJsonMiddle from '../icons/btnSignJsonMiddle'
import BtnSignAddSmall from '../icons/btnSignAddSmall'
import BtnSignAddBig from '../icons/btnSignAddBig'
import BtnSignJsonBig from '../icons/btnSignJsonBig'
import BtnSignCodeSmall from '../icons/btnSignCodeSmall'
import BtnSignCodeBig from '../icons/btnSignCodeBig'
import BtnSignFolderMiddle from '../icons/btnSignFolderMiddle'
import BtnSignTrashBig from '../icons/btnSignTrashBig'
import BtnSignJsonSmall from '../icons/btnSignJsonSmall'
import StoreSettingsTypes from 'store/settings/settingsTypes'
import BtnSignCloseSmall from '../icons/btnSignCloseSmall'
import BtnSignExitSmall from '../icons/btnSignExitSmall';
import BtnSignExitMiddle from '../icons/btnSignExitMiddle';
import BtnSignExitBig from '../icons/btnSignExitBig';
import EditorLightThemeSmall from '../icons/editorLightThemeSmall'
import EditorLightThemeMiddle from '../icons/editorLightThemeMiddle'
import EditorLightThemeBig from '../icons/editorLightThemeBig';
import EditorDarkThemeSmall from '../icons/editorDarkThemeSmall'
import EditorDarkThemeMiddle from '../icons/editorDarkThemeMiddle';
import EditorDarkThemeBig from '../icons/editorDarkThemeBig'
import SiteTabSiteSmall from '../icons/siteTabSiteSmall'
import SiteTabSiteMiddle from '../icons/siteTabSiteMiddle'
import SiteTabSiteBig from '../icons/siteTabSiteBig'
import SiteTabPluginsSmall from '../icons/siteTabPluginsSmall'
import SiteTabPluginsMiddle from '../icons/siteTabPluginsMiddle';
import SiteTabPluginsBig from '../icons/siteTabPluginsBig';
import SiteTabComponentsMiddle from '../icons/siteTabComponentsMiddle';
import SiteTabComponentsBig from '../icons/siteTabComponentsBig';
import SiteTabArticleSmall from '../icons/siteTabArticleSmall';
import SiteTabArticleBig from '../icons/siteTabArticleBig'
import SiteTabComponentsSmall from '../icons/siteTabComponentsSmall'
import SiteTabArticleMiddle from '../icons/siteTabArticleMiddle'
import FilesTreeTriangleMiddle from '../icons/filesTreeTriangleMiddle'
import FilesTreeTriangleBig from '../icons/filesTreeTriangleBig';
import FilesTreeFolderPlusMiddle from '../icons/filesTreeFolderPlusMiddle';
import FilesTreeFolderBig from '../icons/filesTreeFolderBig';
import FilesTreePlusMiddle from '../icons/filesTreePlusMiddle';
import FilesTreeFolderPlusSmall from '../icons/filesTreeFolderPlusSmall';
import FilesTreeTriangleSmall from '../icons/filesTreeTriangleSmall';
import FilesTreeFolderMiddle from '../icons/filesTreeFolderMiddle';
import FilesTreeFolderPlusBig from '../icons/filesTreeFolderPlusBig';
import FilesTreePlusBig from '../icons/filesTreePlusBig';
import FilesTreePlusSmall from '../icons/filesTreePlusSmall';
import FilesTreeFolderSmall from '../icons/filesTreeFolderSmall';
import FilesTreePlaceMark from '../icons/filesTreePlaceMark';

/**
 * Функция возвращает внутренную часть значка SVG в зависимости от типа
 * @param {String} type — тип значка.
 * @param {String} size — размер значка.
 */
export function getIcon(type: string, size: StoreSettingsTypes.EditorSize = 'small') {

    type componentsType = {
        [key: string]: {
            small: ReactNode,
            middle?: ReactNode,
            big?: ReactNode
        }
    }

    const components: componentsType = {
        // Логотип редактора
        logo: {
            small: Logo
        },
        // Значёк ошибки
        errorTriangle: {
            small: ErrorTriangle
        },
        // Значёк успеха
        successCircle: {
            small: SuccessCircle
        },
        // Галочка выбранного флага
        selectInputSmallArrows: {
            small: SelectInputSmallArrows
        },
        selectInputMiddleArrows: {
            small: SelectInputMiddleArrows
        },
        selectInputBigArrows: {
            small: SelectInputBigArrows
        },
        // Значки главных вкладок
        mainTabMaterials: {
            small: MainTabMaterialsSmall,
            middle: MainTabMaterialsMiddle,
            big: MainTabMaterialsBig,
        },
        mainTabEditor: {
            small: MainTabEditorSmall,
            middle: MainTabEditorMiddle,
            big: MainTabEditorBig,
        },
        mainTabSettings: {
            small: MainTabSettingsSmall,
            middle: MainTabSettingsMiddle,
            big: MainTabSettingsBig,
        },

        // Значки на вкладках сайта
        siteTabSite: {
            small: SiteTabSiteSmall,
            middle: SiteTabSiteMiddle,
            big: SiteTabSiteBig
        },
        siteTabPlugins: {
            small: SiteTabPluginsSmall,
            middle: SiteTabPluginsMiddle,
            big: SiteTabPluginsBig
        },
        siteTabComponents: {
            small: SiteTabComponentsSmall,
            middle: SiteTabComponentsMiddle,
            big: SiteTabComponentsBig
        },
        siteTabArticle: {
            small: SiteTabArticleSmall,
            middle: SiteTabArticleMiddle,
            big: SiteTabArticleBig
        },

        // Закругляемая часть в кнопки вкладки
        mainTabRoundScion: {
            small: MainTabRoundScion
        },
        // Значки на кнопках
        btnSignSave: {
            small: BtnSignSaveSmall,
            middle: BtnSignSaveMiddle,
            big: BtnSignSaveBig
        },
        btnSignFolder: {
            small: BtnSignFolderSmall,
            middle: BtnSignFolderMiddle,
            big: BtnSignFolderBig
        },
        btnSignTrash: {
            small: BtnSignTrashSmall,
            middle: BtnSignTrashMiddle,
            big: BtnSignTrashBig
        },
        btnSignCode: {
            small: BtnSignCodeSmall,
            middle: BtnSignCodeMiddle,
            big: BtnSignCodeBig
        },
        btnSignAdd: {
            small: BtnSignAddSmall,
            middle: BtnSignAddMiddle,
            big: BtnSignAddBig
        },
        btnSignJson: {
            small: BtnSignJsonSmall,
            middle: BtnSignJsonMiddle,
            big: BtnSignJsonBig
        },
        btnSignClose: {
            small: BtnSignCloseSmall
        },
        btnSignExit: {
            small: BtnSignExitSmall,
            middle: BtnSignExitMiddle,
            big: BtnSignExitBig
        },
        // Тема интерфейса
        editorLightTheme: {
            small: EditorLightThemeSmall,
            middle: EditorLightThemeMiddle,
            big: EditorLightThemeBig
        },
        editorDarkTheme: {
            small: EditorDarkThemeSmall,
            middle: EditorDarkThemeMiddle,
            big: EditorDarkThemeBig
        },

        // Значки на FilesTree
        filesTreeTriangle: {
            small: FilesTreeTriangleSmall,
            middle: FilesTreeTriangleMiddle,
            big: FilesTreeTriangleBig
        },
        filesTreeFolder: {
            small: FilesTreeFolderSmall,
            middle: FilesTreeFolderMiddle,
            big: FilesTreeFolderBig
        },
        filesTreeFolderPlus: {
            small: FilesTreeFolderPlusSmall,
            middle: FilesTreeFolderPlusMiddle,
            big: FilesTreeFolderPlusBig
        },
        filesTreePlus: {
            small: FilesTreePlusSmall,
            middle: FilesTreePlusMiddle,
            big: FilesTreePlusBig
        },
        // Значёк указателя помещения перетаскиваемого элемента
        filesTreePlaceMark: {
            small: FilesTreePlaceMark,
        },
    }

    //@ts-ignore
    if (components[type][size]) {
        //@ts-ignore
        return components[type][size]
    } else {
        //@ts-ignore
        return components[type]['small']
    }
}
