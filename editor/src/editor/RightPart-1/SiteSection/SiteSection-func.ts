// import {useEffect, useState} from 'react'
// import {useSelector} from 'react-redux'
// import { AppState } from 'store/rootReducer'
// import StoreSitesTypes from 'store/site/sitesTypes'
// import StoreSettingsTypes from 'store/settings/settingsTypes'
// import FHTypes from 'libs/formHandler/types'
// import makeImmutableObj from 'libs/makeImmutableCopy/makeImmutableCopy'
// import { OptionsType } from 'common/formElements/Select/SelectTypes'
// import messages from '../messages'


/**
 * Хук отслеживает выделение существующего сайта или нового и изменяет форму чтобы отражать выделенный сайт
 * @param {Object} formState — объект состояния формы
 * @param {Function} setFormState — функция ставящая новое состояние формы
 */
/*export function useGetAnotherSite(formState: FHTypes.FormState, setFormState: FHTypes.SetFormState) {
    // id текущего сайта и массив сайтов
    const {currentSiteId, sites} = useSelector((store: AppState) => store.sites)

    useEffect(function () {
        if (!sites.length) return

        // Найти сайт с указанным id
        let site = sites.find((site: StoreSitesTypes.SiteType) => site.id === currentSiteId)

        if (!site) site = { id: null, name: '', defaultIncFilesTemplateId: null }

        // Поставить новые значения в поля...
        let newFormState = changeField(formState, 'name', site)
        newFormState = changeField(newFormState, 'defaultIncFilesTemplateId', site)

        // Если выделели новый сайт, то на кнопке отправки поставить значёк Плюс.
        // Если выделили существующий сайт, то значёк Сохранения.
        const submitBtn = formState.fields.submit
        const newSubmitBtn = {...submitBtn}
        newSubmitBtn.data.icon = 'btnSignAdd'
        if (site) newSubmitBtn.data.icon = 'btnSignSave'

        newFormState = makeImmutableObj(newFormState, submitBtn, newSubmitBtn)

        // В данные формы поставить тип формы:
        // createSite если хотят создать новый сайт
        // или saveSite если хотят сохранить новое имя сайта
        const newFormData = {
            ...formState.form.data,
            formType: site.name ? 'saveSite' : 'createSite'
        }

        newFormState = makeImmutableObj(newFormState, formState.form.data, newFormData)

        // Поставить новое состояние формы
        setFormState(newFormState)
    }, [currentSiteId, sites])
}*/


/**
 * Функция формирует новое значение поля формы по переданным данным
 * @param {Object} formState — объект состояния формы
 * @param {String} fieldName — имя изменяемого поля
 * @param {Object} site — данные о сайте
 */
/*function changeField(
    formState: FHTypes.FormState,
    fieldName: 'name' | 'defaultIncFilesTemplateId',
    site: null | StoreSitesTypes.SiteType
) {
    // Получение поля формы по имени
    const field = formState.fields[fieldName]
    // Создание копии поля
    const newField = {...field}
    // Обнуление ошибки
    newField.data.error = null
    // Занесение нового значения. Если в site ничего, то поставить пустое значение.
    const val = site ? site[fieldName] : ''
    newField.value = [val]

    // Поставить новое значение поля name
    return makeImmutableObj(formState, field, newField)
}*/


/**
 * Функция возвращает текст на кнопке отправки формы
 * @param lang
 */
/*export function useGetSubmitButtonText(lang: StoreSettingsTypes.EditorLanguage) {
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
}*/

/**
 * Функция возвращает булево значение нужно ли показывать кнопку удаления сайта.
 * Она видна только если выделен существующий сайт.
 */
/*export function useGetDeleteSiteVisibilityStatus() {
    // id текущего сайта
    const { currentSiteId } = useSelector((store: AppState) => store.sites)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(function () {
        if (!currentSiteId) setIsVisible(false)
        else setIsVisible(true)
    }, [currentSiteId])

    return isVisible
}*/

/**
 * Хук контролирует выпадающий список выбора шаблона по умолчанию для всего сайта.
 * Возвращает объект со свойствами:
 * showSelect — показывать ли выпадающий список со списком шаблонов,
 * один из которых можно указать в качестве шаблона по умолчанию для всего сайта.
 * selectOptions — массив пунктов выпадающего списка
 */
/*
export function useManageTemplatesSelect(fh: FHTypes.ReturnObj) {
    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Массив шаблонов подключаемых файлов
    const templates:StoreSitesTypes.IncFilesTemplatesType  = useSelector((store: AppState) => {
        return store.sites.incFilesTemplatesSection.templates
    })

    const [isVisible, setIsVisible] = useState(false)
    const [selectOptions, setSelectOptions] = useState([])

    useEffect(function () {
        // Если есть массив шаблонов...
        if (templates && templates.length) {

            // Формирование массива пунктов выпадающего списка
            const options: OptionsType = templates.map(template => {
                return {
                    value: template.id,
                    label: template.name
                }
            })
            options.unshift({
                value: 'none',
                label: messages.SiteSection.defaultTemplateSelectNoValue[lang]
            })

            // Установка пунктов выпадающего списка
            setSelectOptions(options)
            // Сделать <select> видимым
            setIsVisible(true)
        }
        // Если нет массива шаблонов...
        else {
            // Скрыть <select>
            setIsVisible(false)

            // Очистить значение выпадающего списка в обработчике форм
            const templatesField = fh.formState.fields.defaultTemplate
            const newTemplatesField = {
                ...templatesField,
                fieldValue: ['']
            }
            fh.setFormState = makeImmutableObj(fh.formState, templatesField, newTemplatesField)
        }
    }, [templates])

    return {
        isVisible,
        selectOptions
    }
}*/
