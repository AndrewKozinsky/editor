import {useCallback, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from 'store/rootAction'
// import StoreSitesTypes from 'store/site/sitesTypes'
// import makeImmutableObj from 'libs/makeImmutableCopy/makeImmutableCopy'
// import { OptionsType } from 'common/formElements/Select/SelectTypes'
// import { siteSectionMessages } from 'messages/siteSectionMessages'
// import { store } from 'store/rootReducer'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import FCType from 'libs/FormConstructor/FCType'

/** Хук отслеживает выбор другого компонента и скачивает данные по нему с сервера и ставит их в Хранилище */
export function useGetArtDataFromServerAndSetInStore() {
    const dispatch = useDispatch()
    const { currentArtItemId } = useGetSitesSelectors().articleSection

    // Скачать данные при выделении другой статьи
    useEffect(function () {
        dispatch( actions.sites.requestArticle() )
    }, [currentArtItemId])
}

/**
 * Хук наполняет выпадающий список шаблона сайта существующеми значениями
 * @param {Object} formState — объект состояния формы
 */
export function useFillSiteTemplatesSelect(formState: FCType.StateFormReturn) {
    const siteTemplates = useGetSitesSelectors().siteTemplatesSection.templates

    useEffect(function () {
        const options = siteTemplates.map(template => {
            return {
                value: template.id,
                label: template.name
            }
        })

        // Наполнение выпадающего списка
        const newSiteTemplateIdField = Object.assign(
            formState.fields['siteTemplateId'],
            { options: options }
        )
        formState.updateField('siteTemplateId', newSiteTemplateIdField)
    }, [siteTemplates])
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

        // Обновление поля Шаблон сайта
        const newSiteTemplateIdField = Object.assign(
            formState.fields['siteTemplateId'],
            { value: [siteTemplateId] }
        )
        formState.updateField('siteTemplateId', newSiteTemplateIdField)
    }, [currentArtName, siteTemplateId])
}
