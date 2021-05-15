import { useSelector } from 'react-redux'
import { AppState } from 'store/rootReducer'
import StoreSitesTypes from 'store/site/sitesTypes'
import messages from '../messages'


/** Функция возвращает заголовок правой части страницы вкладки Сайты */
export function useGetHeaderText() {
    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Данные Хранилища
    const sitesRoot = useSelector((store: AppState) => store.sites)
    // Номер текущей вкладки
    const {rightMainTab} = sitesRoot

    // Если на первой вкладке, то получить и вернуть название выбранного сайта
    if (rightMainTab === 0) {
        // id текущего сайта и массив сайтов
        const {currentSiteId, sites} = sitesRoot

        // Найти сайт с указанным id
        const site = sites.find((site: StoreSitesTypes.SiteType) => site.id === currentSiteId)

        // Если сайт найден, то вернуть его имя
        if (site) return site.name
        // В противном случае вернуть «Новый сайт»
        else return messages.SiteSection.headerNewSite[lang]
    }
    // Если на первой вкладке, то получить и вернуть название выбранного шаблонов подключаемых файлов
    else if (rightMainTab === 1) {
        // id текущего шаблона подключаемых файлов и массив шаблонов подключаемых файлов
        const {currentTemplateId, templates} = sitesRoot.incFilesTemplatesSection

        // Найти шаблон с указанным id
        const template = templates.find((template: StoreSitesTypes.IncFilesTemplateType) => {
            return template.id === currentTemplateId
        })

        // Если шаблон найден, то вернуть его имя
        if (template) return template.name
        // В противном случае вернуть «Новый шаблон»
        else return messages.IncFilesTemplateSection.headerNewPlugin[lang]
    }

    return 'Entitle'
}



