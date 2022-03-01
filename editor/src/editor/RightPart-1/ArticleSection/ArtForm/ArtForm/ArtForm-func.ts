import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import sitesActions from 'store/site/sitesActions'
import articleFormMsg from 'messages/articleFormMessages'
import FCType from 'libs/FormConstructor/FCType'


/** Хук отслеживает выбор другого компонента и скачивает данные по нему с сервера и ставит их в Хранилище */
export function useGetArtDataFromServerAndSetInStore() {
    const dispatch = useDispatch()
    const { currentArtItemId } = useGetSitesSelectors().articleSection

    // Скачать данные при выделении другой статьи
    useEffect(function () {
        dispatch( sitesActions.requestArticle() )
    }, [currentArtItemId])
}

/**
 * Хук наполняет выпадающий список шаблона сайта существующеми значениями
 * @param {Object} formState — объект состояния формы
 */
export function useFillSiteTemplatesSelect(formState: FCType.StateFormReturn) {
    const { templates } = useGetSitesSelectors().siteTemplatesSection
    const { siteTemplateId } = useGetSitesSelectors().articleSection
    const { currentSiteId } = useGetSitesSelectors()

    useEffect(function () {
        const options = templates.map(template => {
            return {
                value: template.id,
                label: template.name
            }
        })

        options.unshift({
            value: 0,
            label: articleFormMsg.templateNotSelected.toString()
        })

        // Наполнение выпадающего списка
        const newSiteTemplateIdField = Object.assign(
            formState.fields['siteTemplateId'],
            {
                options: options,
                value: [siteTemplateId]
            }
        )

        formState.updateField('siteTemplateId', newSiteTemplateIdField)
    }, [templates, currentSiteId, siteTemplateId])
}

/**
 * Хук изменяет значения полей формы компонента после скачивания других данных компонента
 * @param {Object} formState — объект состояния формы
 */
export function useSetAnotherFormData(formState: FCType.StateFormReturn) {
    const { currentArtName, siteTemplateId } = useGetSitesSelectors().articleSection

    useEffect(function () {
        // Обновление поля Имя
        const newNameField = Object.assign(
            formState.fields['name'],
            { value: [currentArtName] }
        )
        formState.updateField('name', newNameField)
    }, [currentArtName, siteTemplateId])
}
