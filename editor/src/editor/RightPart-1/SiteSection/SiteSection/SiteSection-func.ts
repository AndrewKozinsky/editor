import { useEffect } from 'react'
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import StoreSitesTypes from 'store/site/sitesTypes'
import FCType from 'libs/FormConstructor/FCType'
import siteSectionMsg from 'messages/groupSectionMessages'
import { OptionsType } from 'common/formElements/Select/SelectTypes'
import { SitesServerResponseType } from 'requests/editor/sites/sitesServerResponseType'
import { getState } from 'utils/miscUtils'
import sitesActions from '../../../../store/site/sitesActions'

/**
 * Хук изменяет имя сайта в поле Название при переключении сайта
 * @param {Object} formState — объект состояния формы
 */
export function useSetSiteName(formState: FCType.StateFormReturn) {
    // id текущего сайта и массив сайтов
    const { currentSiteId, sites } = useGetSitesSelectors()

    useEffect(function () {
        if (!sites.length) return

        // Найти сайт с указанным id
        let site = sites.find(site => site.id === currentSiteId)
        if (!site) return

        const valueFieldData = Object.assign(
            formState.fields['name'],
            { value: [site.name] }
        )

        formState.updateField('name', valueFieldData)
    }, [currentSiteId, sites])
}


/**
 * Хук добавляет в выпадающий список «Шаблон сайта по умолчанию» пункты сформированные из шаблонов сайта
 * @param {Object} formState — объект состояния формы
 */
export function useSetSiteTemplates(formState: FCType.StateFormReturn) {
    // id текущего сайта и массив сайтов
    const { templates } = useGetSitesSelectors().siteTemplatesSection
    const { sites, currentSiteId } = useGetSitesSelectors()

    // Формирование пунктов выпадающего списка
    const options = getOptions(templates)

    useEffect(function () {
        const valueFieldData = Object.assign(
            formState.fields['defaultSiteTemplateId'],
            {
                options,
                value: getValue(sites, currentSiteId),
                disabled: options.length == 1
            }
        )
        formState.updateField('defaultSiteTemplateId', valueFieldData)
    }, [sites, currentSiteId, templates])
}

/**
 * Функция формирует пункты выпадающего списка «Шаблон сайта по умолчанию»
 * @param {Array} templates — массив шаблонов сайта
 */
function getOptions(
    templates: StoreSitesTypes.SiteTemplatesType,
) {
    // Пункты выпадающего списка названий шаблонов сайта
    const options: OptionsType = templates.map(template => {
        return {
            value: template.id.toString(),
            label: template.name
        }
    })

    // Добавление пустого пункта
    options.unshift({
        value: '0',
        label: siteSectionMsg.defaultSiteTemplateNotSelected.toString()
    })

    return options
}

/**
 * Формирование значения (текущий пункт) выпадающего списка «Шаблон сайта по умолчанию»
 * @param {Array} sites — массив сайтов
 * @param {Number} currentSiteId — id текущего сайта
 */
function getValue(
    sites: StoreSitesTypes.SitesType, currentSiteId: StoreSitesTypes.CurrentSiteId
) {
    const currentSite = sites.find(site => site.id === currentSiteId)

    let value = currentSite?.defaultSiteTemplateId?.toString() || ''
    return [value]
}

/**
 * Функция запускаемая после получения ответа от сервера
 * при отправке формы создания нового сайта или изменения существующего
 * @param {Object} response — объект ответа от сервера
 */
export async function afterSubmit(response: SitesServerResponseType) {
    // Если сайт успешно создан...
    if (response.status === 'success') {
        // Скачать новый список сайтов и поставить в Хранилище
        await store.dispatch(sitesActions.requestSites())

        // Найти в Хранилище сайт с таким же id как у только что созданного сайта
        const newSite = getState().sites.sites.find(site => {
            return site.id === response.data.sites[0].id
        })
        // Выделить созданный сайт
        store.dispatch(sitesActions.setCurrentSiteId(newSite.id))
    }
}
