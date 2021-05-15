import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import { AppState } from 'store/rootReducer'
import StoreSitesTypes from 'store/site/sitesTypes'
import FHTypes from 'libs/formHandler/types'
import makeImmutableObj from 'libs/makeImmutableCopy/makeImmutableCopy'
import StoreSettingsTypes from 'store/settings/settingsTypes'
import messages from '../../messages'


/**
 * Хук отслеживает выделение существующего сайта или нового и изменяет форму чтобы отражать выделенный сайт
 * @param {Object} formState — объект состояния формы
 * @param {Function} setFormState — функция ставящая новое состояние формы
 */
export function useGetAnotherTemplate(formState: FHTypes.FormState, setFormState: FHTypes.SetFormState) {
    // id текущего шаблона и массив шаблонов
    const {currentTemplateId, templates} = useSelector((store: AppState) => store.sites.incFilesTemplatesSection)

    useEffect(function () {
        // Найти шаблон с указанным id
        const template = templates.find((template: StoreSitesTypes.IncFilesTemplateType) => {
            return template.id === currentTemplateId
        })

        // Поставить новые значения в поля...
        let newFormState = changeField(formState, 'name', template)
        newFormState = changeField(newFormState, 'head', template)
        newFormState = changeField(newFormState, 'body', template)

        // Если выделели новый шаблон, то на кнопке отправки поставить значёк Плюс.
        // Если выделили существующий, то значёк Сохранения.
        const submitBtn = formState.fields.submit
        const newSubmitBtn = {...submitBtn}
        newSubmitBtn.data.icon = 'btnSignAdd'
        if (template) newSubmitBtn.data.icon = 'btnSignSave'

        // В данные формы поставить актуальный тип формы чтобы знать назначение формы:
        // createTemplate если хотят создать новый шаблон
        // или saveTemplate если хотят сохранить новые данные шаблона
        const newFormData = {
            ...formState.form.data,
            formType: template ? 'saveTemplate' : 'createTemplate'
        }

        newFormState = makeImmutableObj(newFormState, formState.form.data, newFormData)

        // Поставить новое состояние формы
        setFormState(newFormState)
    }, [currentTemplateId, templates])
}

/**
 * Функция формирует новое значение поля формы по переданным данным
 * @param {Object} formState — объект состояния формы
 * @param {String} fieldName — имя изменяемого поля
 * @param {Object} template — данные о шаблоне
 */
function changeField(
    formState: FHTypes.FormState,
    fieldName: 'name' | 'head' | 'body',
    template: null | StoreSitesTypes.IncFilesTemplateType
) {
    // Получение поля формы по имени
    const field = formState.fields[fieldName]
    // Создание копии поля
    const newField = {...field}
    // Обнуление ошибки
    newField.data.error = null
    // Занесение нового значения. Если в template ничего, то поставить пустое значение.
    const val = template ? template[fieldName] : ''
    newField.value = [val]

    // Поставить новое значение поля name
    return makeImmutableObj(formState, field, newField)
}


export function useGetSubmitButtonText(lang: StoreSettingsTypes.EditorLanguage) {
    // id текущего шаблона
    const {currentTemplateId} = useSelector((store: AppState) => store.sites.incFilesTemplatesSection)
    const [submitName, setSubmitName] = useState('')

    useEffect(function () {
        if (!currentTemplateId) {
            setSubmitName(messages.IncFilesTemplateSection.submitBtnTextNewSite[lang])
        }
        else {
            setSubmitName(messages.IncFilesTemplateSection.submitBtnTextSave[lang])
        }
    }, [currentTemplateId])

    return submitName
}


/**
 * Функция возвращает булево значение нужно ли показывать кнопку удаления сайта.
 * Она видна только если выделен существующий сайт.
 */
export function useGetDeleteTemplateVisibilityStatus() {
    // id текущего шаблона
    const { currentTemplateId } = useSelector((store: AppState) => store.sites.incFilesTemplatesSection)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(function () {
        if (!currentTemplateId) setIsVisible(false)
        else setIsVisible(true)
    }, [currentTemplateId])

    return isVisible
}
