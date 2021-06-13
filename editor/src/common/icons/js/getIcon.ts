import {ReactElement, ReactNode} from 'react'
import Logo from '../icons/logo'
import ErrorTriangle from '../icons/errorTriangle'
import SuccessCircle from '../icons/successCircle'
import SelectInputArrows from '../icons/selectInputArrows'
import MainTabMaterials from '../icons/mainTabMaterials'
import MainTabEditor from '../icons/mainTabEditor'
import MainTabSettings from '../icons/mainTabSettings'
import MainTabRoundScion from '../icons/mainTabRoundScion'
import BtnSignSave from '../icons/btnSignSave'
import BtnSignFolder from '../icons/btnSignFolder'
import BtnSignTrash from '../icons/btnSignTrash'
import BtnSignAdd from '../icons/btnSignAdd'
import BtnSignCode from '../icons/btnSignCode'
import BtnSignJson from '../icons/btnSignJson'
import BtnSignClose from '../icons/btnSignClose'
import BtnSignExit from '../icons/btnSignExit';
import EditorLightTheme from '../icons/editorLightTheme'
import EditorDarkTheme from '../icons/editorDarkTheme'
import SiteTabSite from '../icons/siteTabSite'
import SiteTabPlugins from '../icons/siteTabPlugins'
import SiteTabArticle from '../icons/siteTabArticle'
import SiteTabComponents from '../icons/siteTabComponents'
import FilesTreeFolderPlus from '../icons/filesTreeFolderPlus'
import FilesTreeTriangle from '../icons/filesTreeTriangle'
import FilesTreePlus from '../icons/filesTreePlus'
import FilesTreeFolder from '../icons/filesTreeFolder'
import FilesTreePlaceMark from '../icons/filesTreePlaceMark'
import FilesTreeTrash from '../icons/filesTreeTrash'

/**
 * Функция возвращает внутренную часть значка SVG в зависимости от типа
 * @param {String} type — тип значка.
 */
export function getIcon(type: string): ReactNode {

    type componentsType = {
        [key: string]: ReactNode
    }

    const components: componentsType = {
        // Логотип редактора
        logo: Logo,

        // Значёк ошибки
        errorTriangle: ErrorTriangle,

        // Значёк успеха
        successCircle: SuccessCircle,

        // Галочка выбранного флага
        selectInputArrows: SelectInputArrows,

        // Значки главных вкладок
        mainTabMaterials: MainTabMaterials,
        mainTabEditor: MainTabEditor,
        mainTabSettings: MainTabSettings,

        // Значки на вкладках сайта
        siteTabSite: SiteTabSite,
        siteTabPlugins: SiteTabPlugins,
        siteTabComponents: SiteTabComponents,
        siteTabArticle: SiteTabArticle,

        // Закругляемая часть в кнопки вкладки
        mainTabRoundScion: MainTabRoundScion,

        // Значки на кнопках
        btnSignSave: BtnSignSave,
        btnSignFolder: BtnSignFolder,
        btnSignTrash: BtnSignTrash,
        btnSignCode: BtnSignCode,
        btnSignAdd: BtnSignAdd,
        btnSignJson: BtnSignJson,
        btnSignClose: BtnSignClose,
        btnSignExit: BtnSignExit,

        // Тема интерфейса
        editorLightTheme: EditorLightTheme,
        editorDarkTheme: EditorDarkTheme,

        // Значки на FilesTree
        filesTreeTriangle: FilesTreeTriangle,
        filesTreeFolder: FilesTreeFolder,
        filesTreeFolderPlus: FilesTreeFolderPlus,
        filesTreePlus: FilesTreePlus,

        // Значёк указателя помещения перетаскиваемого элемента
        filesTreePlaceMark: FilesTreePlaceMark,

        // Значёк указателя помещения перетаскиваемого элемента
        filesTreeTrash: FilesTreeTrash,
    }

    return components[type]
}
