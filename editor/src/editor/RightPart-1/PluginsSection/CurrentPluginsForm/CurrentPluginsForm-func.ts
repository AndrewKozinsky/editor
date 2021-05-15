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
    const {currentPluginId, plugins} = useSelector((store: AppState) => store.sites.pluginsSection)

    useEffect(function () {
        // Найти шаблон с указанным id
        const plugin = plugins.find((plugin: StoreSitesTypes.PluginType) => {
            return plugin.id === currentPluginId
        })

        // Поставить новые значения в поля...
        let newFormState = changeField(formState, 'name', plugin)
        newFormState = changeField(newFormState, 'head', plugin)
        newFormState = changeField(newFormState, 'body', plugin)

        // Если выделели новый шаблон, то на кнопке отправки поставить значёк Плюс.
        // Если выделили существующий, то значёк Сохранения.
        const submitBtn = formState.fields.submit
        const newSubmitBtn = {...submitBtn}
        newSubmitBtn.data.icon = 'btnSignAdd'
        if (plugin) newSubmitBtn.data.icon = 'btnSignSave'

        // В данные формы поставить актуальный тип формы чтобы знать назначение формы:
        // createPlugin если хотят создать новый шаблон
        // или savePlugin если хотят сохранить новые данные шаблона
        const newFormData = {
            ...formState.form.data,
            formType: plugin ? 'savePlugin' : 'createPlugin'
        }

        newFormState = makeImmutableObj(newFormState, formState.form.data, newFormData)

        // Поставить новое состояние формы
        setFormState(newFormState)
    }, [currentPluginId, plugins])
}

/**
 * Функция формирует новое значение поля формы по переданным данным
 * @param {Object} formState — объект состояния формы
 * @param {String} fieldName — имя изменяемого поля
 * @param {Object} plugin — данные о шаблоне
 */
function changeField(
    formState: FHTypes.FormState,
    fieldName: 'name' | 'head' | 'body',
    plugin: null | StoreSitesTypes.PluginType
) {
    // Получение поля формы по имени
    const field = formState.fields[fieldName]
    // Создание копии поля
    const newField = {...field}
    // Обнуление ошибки
    newField.data.error = null
    // Занесение нового значения. Если в plugin ничего, то поставить пустое значение.
    const val = plugin ? plugin[fieldName] : ''
    newField.value = [val]

    // Поставить новое значение поля name
    return makeImmutableObj(formState, field, newField)
}


export function useGetSubmitButtonText(lang: StoreSettingsTypes.EditorLanguage) {
    // id текущего шаблона
    const {currentPluginId} = useSelector((store: AppState) => store.sites.pluginsSection)
    const [submitName, setSubmitName] = useState('')

    useEffect(function () {
        if (!currentPluginId) {
            setSubmitName(messages.PluginsSection.submitBtnTextNewSite[lang])
        }
        else {
            setSubmitName(messages.PluginsSection.submitBtnTextSave[lang])
        }
    }, [currentPluginId])

    return submitName
}

/**
 * Функция возвращает булево значение нужно ли показывать кнопку удаления сайта.
 * Она видна только если выделен существующий сайт.
 */
export function useGetDeletePluginVisibilityStatus() {
    // id текущего шаблона
    const { currentPluginId } = useSelector((store: AppState) => store.sites.pluginsSection)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(function () {
        if (!currentPluginId) setIsVisible(false)
        else setIsVisible(true)
    }, [currentPluginId])

    return isVisible
}
