import { useEffect } from 'react'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import { store } from 'store/rootReducer'
import FCType from 'libs/FormConstructor/FCType'
import MetaTemplateServerResponseType from 'requests/editor/metaTemplate/metaTemplateServerResponseType'
import sitesActions from 'store/site/sitesActions'
import { getState } from 'utils/miscUtils'


/**
 * Хук изменяет код шаблона сайта в поле Код шаблона при переключении сайта или шаблона
 * @param {Object} formState — объект состояния формы
 */
export function useSetMetaTemplateCode(formState: FCType.StateFormReturn) {
    // id текущего шаблона сайта и массив шаблонов сайта
    const { currentTemplateId, templates } = useGetSitesSelectors().metaTemplatesSection

    useEffect(function () {
        if (!templates.length) return

        // Найти шаблон метаданных с указанным id
        let metaTemplate = templates.find(templates => templates.id === currentTemplateId)

        const value = metaTemplate ? metaTemplate.content : ''

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
export async function afterSubmit(response: MetaTemplateServerResponseType) {
    // Если шаблон метаданных успешно создан...
    if (response.status === 'success') {

        // Скачать новый список шаблонов метаданных и поставить в Хранилище
        await store.dispatch(sitesActions.requestMetaTemplates())

        const { currentSiteId } = getState().sites

        // Найти в Хранилище шаблон сайта с таким же id как у только что созданного
        const newMetaTemplate = getState().sites.metaTemplatesSection.templates.find((template: any) => {
            return template.id === response.data.metaTemplates[0].id
        })
        // Выделить созданный шаблон метаданных
        store.dispatch(sitesActions.setCurrentMetaTemplateIdOuter(currentSiteId, newMetaTemplate.id))
    }
}
