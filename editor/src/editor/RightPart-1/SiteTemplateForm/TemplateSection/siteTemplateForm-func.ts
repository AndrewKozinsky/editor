import { useEffect } from 'react'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import { store } from 'store/rootReducer'
import actions from 'store/rootAction'
import FCType from 'libs/FormConstructor/FCType'
import SiteTemplateServerResponseType from 'src/requests/editor/siteTemplate/siteTemplateServerResponseType'


/**
 * Хук изменяет имя сайта в поле Название при переключении сайта
 * @param {Object} formState — объект состояния формы
 */
export function useSetSiteTemplateCode(formState: FCType.StateFormReturn) {
    // id текущего шаблона сайта и массив шаблонов сайта
    const { currentTemplateId, templates } = useGetSitesSelectors().siteTemplatesSection

    useEffect(function () {
        if (!templates.length) return

        // Найти шаблона сайта с указанным id
        let siteTemplate = templates.find(templates => templates.id === currentTemplateId)
        if (!siteTemplate) return

        // Поставить код выбранного шаблона сайта в поле «Код шаблона» в форме редактирования шаблона сайта
        const valueFieldNewData = Object.assign(formState.fields['content'],{ value: [siteTemplate.content]})
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
        await store.dispatch(actions.sites.requestSiteTemplates())

        // Найти в Хранилище шаблон сайта с таким же id как у только что созданного
        const newSiteTemplate = store.getState().sites.siteTemplatesSection.templates.find((template: any) => {
            return template.id === response.data.siteTemplates[0].id
        })
        // Выделить созданный шаблон сайта
        store.dispatch(actions.sites.setCurrentSiteTemplateId(newSiteTemplate.id))
    }
}