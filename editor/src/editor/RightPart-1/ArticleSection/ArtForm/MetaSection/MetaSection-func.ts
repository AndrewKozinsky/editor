import { FormEvent, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
const JSON5 = require('json5')
import { OptionsType } from 'common/formElements/Select/SelectTypes'
import { OuterOnChangeHandlerType } from 'common/formElements/outerOnChangeFn'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import sitesActions from 'store/site/sitesActions'
import StoreSitesTypes  from 'store/site/sitesTypes'
import articleSectionMsg from 'messages/articleSectionMessages'
import { updateArticleRequest } from 'requests/editor/article/updateArticleRequest'
import getMetaTemplateRequest from 'requests/editor/metaTemplate/getMetaTemplateRequest'
import matchMetaDataAndMetaTemp from '../Meta/matchMetaDataAndMetaTemp'
import MetaType from '../Meta/MetaType'

/** Хук возвращает обработчик отправки формы изменения метаданных */
export function useGetOnFormSubmit() {
    const { currentArtItemId, metaTemplateId, meta } = useGetSitesSelectors().articleSection

    return useCallback(function (e: FormEvent) {
        e.preventDefault()

        let fixedMetaTemplateId: '' | number = metaTemplateId
        if (typeof fixedMetaTemplateId === null) fixedMetaTemplateId = ''

        // Обновить статью на сервере
        updateArticleRequest(
            currentArtItemId, {metaTemplateId: fixedMetaTemplateId, meta}
        )
    }, [currentArtItemId, metaTemplateId, meta])
}

/** Хук возвращает массив с пунктами выпадающего списка шаблонов метаданных */
export function useGetSelectOptions(): OptionsType {
    const { templates } = useGetSitesSelectors().metaTemplatesSection
    const [options, setOptions] = useState<OptionsType>([])

    useEffect(function () {
        if (!templates) return

        const newOptions: OptionsType = templates.map(template => {
            return {
                value: template.id.toString(),
                label: template.name
            }
        })

        // Добавить пустой элемент
        newOptions.unshift({
            value: '',
            label: articleSectionMsg.defaultSelectItem
        })

        setOptions(newOptions)
    }, [templates])

    return options
}

/** Функция возвращает id выбранного шаблона метаданных в выпадающем списке */
export function useGetSelectValue(): string {
    const { metaTemplateId } = useGetSitesSelectors().articleSection

    if (metaTemplateId) return metaTemplateId.toString()
    return ''
}

/** Функция возвращает обработчик изменения значения в выпадающем списке шаблонов метаданных */
export function useGetOnChangeSelectInput(): OuterOnChangeHandlerType.FieldsHandler {
    const dispatch = useDispatch()

    return useCallback(function (fieldData: OuterOnChangeHandlerType.FieldsData) {
        let value: StoreSitesTypes.CurrentMetaTemplateId = null

        if (!isNaN(parseInt(fieldData.fieldValue[0]))) {
            value = parseInt(fieldData.fieldValue[0])
        }

        dispatch(sitesActions.setArticleMetaTemplateId(value))
    }, [])
}



/**
 * Хук устанавливает метаданные в статью если указан шаблон метаданных по умолчанию, но данных нет.
 * Отрабатывает 1 раз после загрузки данных.
 */
export function useSetInitialMeta() {
    const dispatch = useDispatch()
    const { meta, metaTemplateId, currentArtName } = useGetSitesSelectors().articleSection

    // Отработал ли уже хук
    const [hookIsWorkedOut, setHookIsWorkedOut] = useState(false)

    useEffect(function () {
        // Если в метаданных ничего, но указан шаблон метаданных по умолчанию...
        if (!currentArtName || !metaTemplateId || meta || hookIsWorkedOut) return

        // то загрузить метаданные и поставить в store.sites.articleSection.meta
        dispatch(sitesActions.requestArticleMetaTemplate(metaTemplateId))

        // Если данные статьи загружены (это вычисляется по свойству currentArtName),
        // то значит хук отработал выше и более загружать не требуется
        setHookIsWorkedOut(true)
    }, [currentArtName])
}

/** Функция запускается при получении данных статьи и актуализирует метаданные в соответствии с назначенным шаблоном */
export function useCorrectMetaData() {
    const { meta, metaTemplateId, currentArtName } = useGetSitesSelectors().articleSection

    // Отработал ли уже хук
    const [hookIsWorkedOut, setHookIsWorkedOut] = useState(false)

    useEffect(function () {
        if (!currentArtName || !metaTemplateId || hookIsWorkedOut) return

        // Скачать указанный шаблон метаданных...
        getMetaTemplateRequest(metaTemplateId).then(response => {
            if (response.status === 'success' && response.data.metaTemplates[0]) {
                const metaDataTemplate: MetaType.MetaTemplate = JSON5.parse(response.data.metaTemplates[0].content)

                // Сделать соответствие шаблона метаданных и самих метаданных в статье
                matchMetaDataAndMetaTemp(metaDataTemplate.items, meta)
            }
        })

        setHookIsWorkedOut(true)
    }, [currentArtName])
}

/** Хук отслеживает изменение id выбранного шаблона метаданных и загружает метаданные если он изменился */
export function useUpdateMetaDependsOnTemplateId() {
    const dispatch = useDispatch()
    const { metaTemplateId, currentArtName } = useGetSitesSelectors().articleSection

    // Готов ли хук переписывать метаданные при изменении id шаблона метаданных
    const [hookIsReady, setHookIsReady] = useState(false)

    useEffect(function () {
        if (!currentArtName) return
        // Хук не должен отрабатывать до тех пор, пока данные не загрузились.
        // Это отслеживается по значению имени статьи. Если имя есть, то данные загружены.
        if (currentArtName) setHookIsReady(true)
        if (!hookIsReady) return

        dispatch(sitesActions.requestArticleMetaTemplate(metaTemplateId))
    }, [metaTemplateId])
}


