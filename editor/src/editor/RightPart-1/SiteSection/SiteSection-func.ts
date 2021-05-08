import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import { AppState } from 'store/rootReducer'
import StoreSitesTypes from 'store/site/sitesTypes'
import FHTypes from 'libs/formHandler/types'
import makeImmutableObj from 'libs/makeImmutableCopy/makeImmutableCopy'
import StoreSettingsTypes from 'store/settings/settingsTypes';
import messages from '../messages'
import {log} from 'util';


/**
 * Хук отслеживает выделение существующего сайта или нового и изменяет форму чтобы отражать выделенный сайт
 * @param {Object} formState — объект состояния формы
 * @param {Function} setFormState — функция ставящая новое состояние формы
 */
export function useGetAnotherSite(formState: FHTypes.FormState, setFormState: FHTypes.SetFormState) {
    // id текущего сайта и массив сайтов
    const {currentSiteId, sites} = useSelector((store: AppState) => store.sites)

    useEffect(function () {
        // Найти сайт с указанным id
        const site = sites.find((site: StoreSitesTypes.SiteType) => site.id === currentSiteId)

        let siteName = ''
        // Если сайт найден, то в siteName поставить его имя
        if (site) siteName = site.name

        // Обновить значение поля name в форме и стереть ошибку
        const field = formState.fields.name
        const newField = {...field}
        newField.value = [siteName]
        newField.data.error = null

        // Поставить новое значение поля
        let newFormState: FHTypes.FormState = makeImmutableObj(formState, field, newField)

        // В данные формы поставить тип формы:
        // createSite если хотят создать новый сайт
        // или saveSite если хотят сохранить новое имя сайта
        const newFormData = {
            ...formState.form.data,
            formType: siteName === '' ? 'createSite' : 'saveSite'
        }

        newFormState = makeImmutableObj(newFormState, formState.form.data, newFormData)

        // Поставить новое состояние формы
        setFormState(newFormState)
    }, [currentSiteId, sites])
}

export function useGetSubmitButtonText(lang: StoreSettingsTypes.EditorLanguage) {
    // id текущего сайта
    const { currentSiteId } = useSelector((store: AppState) => store.sites)
    const [submitName, setSubmitName] = useState('')

    useEffect(function () {
        if (!currentSiteId) {
            setSubmitName(messages.SiteSection.submitBtnTextNewSite[lang])
        }
        else {
            setSubmitName(messages.SiteSection.submitBtnTextSave[lang])
        }
    }, [currentSiteId])

    return submitName
}