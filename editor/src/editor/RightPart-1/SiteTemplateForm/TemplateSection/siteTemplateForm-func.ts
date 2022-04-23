import { useEffect } from 'react'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import { store } from 'store/rootReducer'
import articleActions from 'store/article/articleActions'
import FCType from 'libs/FormConstructor/FCType'
import SiteTemplateServerResponseType from 'requests/editor/siteTemplate/siteTemplateServerResponseType'
import sitesActions from 'store/site/sitesActions'
import { getState } from 'utils/miscUtils'


/**
 * Хук изменяет код шаблона сайта в поле Код шаблона при переключении сайта или шаблона
 * @param {Object} formState — объект состояния формы
 */
export function useSetSiteTemplateCode(formState: FCType.StateFormReturn) {
    // id текущего шаблона сайта и массив шаблонов сайта
    const { currentTemplateId, templates } = useGetSitesSelectors().siteTemplatesSection

    useEffect(function () {
        if (!templates.length) return

        // Найти шаблон сайта с указанным id
        let siteTemplate = templates.find(templates => templates.id === currentTemplateId)

        const value = siteTemplate ? siteTemplate.content : ''

        // Поставить код выбранного шаблона сайта в поле «Код шаблона»
        const valueFieldNewData = Object.assign(formState.fields['content'],{ value: [value] })
        formState.updateField('content', valueFieldNewData)
    }, [currentTemplateId, templates])
}


/**
 * Функция запускаемая после получения ответа от сервера
 * при отправке формы создания нового шаблона сайта или изменения существующего
 * @param {Object} response — объект ответа от сервера
 */
export async function afterSubmit(response: SiteTemplateServerResponseType) {
    // Если сайт успешно создан...
    if (response.status === 'success') {

        // Скачать новый список шаблонов сайта и поставить в Хранилище
        await store.dispatch(sitesActions.requestSiteTemplates())

        // Найти в Хранилище шаблон сайта с таким же id как у только что созданного
        const newSiteTemplate = getState().sites.siteTemplatesSection.templates.find((template: any) => {
            return template.id === response.data.siteTemplates[0].id
        })
        // Выделить созданный шаблон сайта
        // store.dispatch(sitesActions.setCurrentSiteTemplateIdOuter(newSiteTemplate.id))

        // Если отредактировали шаблон сайта, который используется в редактируемой статье...
        if (getState().article.siteTemplateId === newSiteTemplate.id) {
            // ... то обновить хеш версии шаблона сайта чтобы хук скачал новую версию шаблона и поставил в <head> и <body>
            store.dispatch(articleActions.changeSiteTemplateVersionHash())
        }
    }
}
