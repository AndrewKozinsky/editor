// @ts-ignore
import * as yup from 'yup'
import FHTypes from 'libs/formHandler/types'
import store from 'store/store'
import actions from 'store/rootAction'
import StoreSettingsTypes from 'store/settings/settingsTypes'
import messages from '../messages'
import { makeFetch } from 'requests/fetch'
import getApiUrl from 'requests/apiUrls'


// Объект настройки useFormHandler
export default function getFormConfig(lang: StoreSettingsTypes.EditorLanguage): FHTypes.FormConfig {
    return {
        // Обязательно нужно передать все поля обрабатываемые FormHandler-ом
        fields: {
            name: {
                initialValue: [''],
                initialData: {
                    error: null,
                    disabled: false
                },
                change(formDetails) {
                    // Проверять только если форму отправляли как минимум 1 раз
                    if (formDetails.state.form.data.submitCounter > 0) {
                        return validateForm(formDetails.state, formDetails.setFieldDataPropValue, formDetails.setFormDataPropValue, lang)
                    }
                },
            },
            defaultIncFilesTemplateId: {
                initialValue: [''],
            },
            submit: {
                initialValue: [''],
                initialData: {
                    loading: false,
                    disabled: false
                }
            }
        },
        form: {
            initialData: {
                // Сколько раз пытались отправить форму
                submitCounter: 0,
                // Тип формы: createSite (создать новый сайт) или saveSite (сохранить новое имя сайта)
                formType: 'createSite'
            },
            // Пользовательская функция запускаемая при отправке формы
            submit: async function(formDetails) {

                // Проверить форму и поставить/убрать ошибки
                let formState = validateForm(formDetails.state, formDetails.setFieldDataPropValue, formDetails.setFormDataPropValue, lang)

                // Увеличить счётчик попыток отправки формы и поставить новое Состояние формы в переменную.
                formState = formDetails.setFormDataPropValue(formState, 'submitCounter', formState.form.data.submitCounter + 1)

                // Первое поле, где есть ошибка
                let $firstWrongField = getFirstInvalidField(formState)

                // Заблокировать все поля. Кнопке отправки поставить блокировку и загрузку
                formState = setLoadingStatusToForm(formState, formDetails.setFieldDataPropValue, true)


                // Если поля формы заполнены неверно...
                if($firstWrongField) {
                    // Разблокировать все поля. У кнопки отправки убрать блокировку и загрузку
                    formState = setLoadingStatusToForm(formState, formDetails.setFieldDataPropValue, false)
                    // Заблокировать кнопку отправки
                    formState = formDetails.setFieldDataPropValue(formState, 'disabled', true, 'submit')

                    // Поставить фокус на первое поле где есть ошибка
                    $firstWrongField.focus()

                    // Поставить новое Состояние формы
                    formDetails.setFormState(formState)

                    // Завершить дальнейшее выполнение
                    return
                }

                // Поставить новое Состояние формы
                formDetails.setFormState(formState)

                // В зависимости от типа формы запущу разные функции сохранения данных
                // Если нужно создать новый сайт
                if (formDetails.state.form.data.formType === 'createSite') {
                    await createNewSite(formDetails, lang)
                }
                // Если нужно обновить данные сайта
                else {
                    await updateSite(formDetails, lang)
                }
            }
        }
    }
}


/**
 * Функция возвращает схему Yup для поля с переданным именем
 * @param {Array} fieldName — имя поля
 * @param {String} lang — язык интерфейса
 */
function getSchema(fieldName: string, lang: StoreSettingsTypes.EditorLanguage): any {

    const schemas = {
        name: yup.string()
            .required(messages.SiteSection.siteNameInputRequired[lang])
    }

    // @ts-ignore
    return schemas[fieldName]
}


/**
 * Функция проверяющая форму при изменении полей ввода
 * @param {Object} formState — объект Состояния формы
 * @param {Function} setFieldDataPropValue — установщик значения свойства данных поля
 * @param {Function} setFormDataPropValue — установщик значения свойства данных формы
 * @param lang
 */
function validateForm(
    formState: FHTypes.FormState,
    setFieldDataPropValue: FHTypes.SetFieldDataPropValue,
    setFormDataPropValue: FHTypes.SetFormDataPropValue,
    lang: StoreSettingsTypes.EditorLanguage
): FHTypes.FormState {

    // Правильно ли заполнена форма
    let isFormValid = true

    // Проверка всех полей формы
    for(let fieldName in formState.fields) {
        const field = formState.fields[fieldName]

        // Игнорировать кнопки и выпадающие списки
        if (field.fieldType === 'button' || field.fieldType === 'select') continue

        // Значение перебираемого поля
        const fieldValue = field.value[0]

        // Попытаться проверить поле. И в зависимости от результата или поставить или обнулить ошибку
        try {
            getSchema(fieldName, lang).validateSync(fieldValue)
            formState = setFieldDataPropValue(formState, 'error', null, fieldName)
        } catch (err) {
            isFormValid = false
            formState = setFieldDataPropValue(formState, 'error', err.message, fieldName)
        }
    }

    // Если поля формы заполнены верно...
    if(isFormValid) {
        // Разблокировать кнопку отправки
        return setFieldDataPropValue(formState, 'disabled', false, 'submit')
    }
    // Если в форме допущены ошибки...
    else {
        // Заблокировать кнопку отправки
        return setFieldDataPropValue(formState, 'disabled', true, 'submit')
    }
}


/**
 * Функция возвращает ссылку на элемент первого поля с ошибкой
 * @param {Object} formState — объект с Состоянием формы
 */
function getFirstInvalidField(formState: FHTypes.FormState) {

    // Первое поле, где есть ошибка
    let $firstWrongField: null | HTMLInputElement = null

    // Перебор всех полей чтобы найти поле с первой ошибкой
    for(let fieldName in formState.fields) {
        const field = formState.fields[fieldName]

        if (field.data.error) {
            $firstWrongField = field.$field
            break
        }
    }

    return $firstWrongField
}


/**
 * Функция ставит блокирует или разблокирует поля и кнопку отправки перед/после отправки
 * @param {Object} formState — объект с Состоянием формы
 * @param {Function} setFieldDataPropValue — установщик значения свойства данных поля
 * @param {Boolean} status — блокировать или разблокировать поля
 */
function setLoadingStatusToForm(
    formState: FHTypes.FormState, setFieldDataPropValue: FHTypes.SetFieldDataPropValue, status: boolean
) {
    formState = setFieldDataPropValue(formState, 'disabled', status, 'name')
    formState = setFieldDataPropValue(formState, 'disabled', status, 'submit')
    formState = setFieldDataPropValue(formState, 'loading', status, 'submit')

    return formState
}


/**
 * Функция создающая новый сайт
 * @param {Object} formDetails — объект с данными и методами манипулирования формой
 * @param {String} lang — язык интерфейса
 */
async function createNewSite(
    formDetails: FHTypes.FormDetailsInSubmitHandler,
    lang: StoreSettingsTypes.EditorLanguage
) {
    // Отправить данные на сервер...
    const options = {
        method: 'POST',
        body: JSON.stringify(formDetails.readyFieldValues)
    }
    const response = await makeFetch(getApiUrl('sites'), options, lang)

    // Разблокировать все поля. У кнопки отправки убрать блокировку и загрузку
    let newFormState = setLoadingStatusToForm(formDetails.state, formDetails.setFieldDataPropValue, false)
    formDetails.setFormState(newFormState)

    // Если сайт успешно создан...
    if (response.status === 'success') {
        // Скачать новый список сайтов и поставить в Хранилище
        await store.dispatch(actions.sites.requestSites())

        // Найти в Хранилище сайт с таким же именем и выделить его
        const newSite = store.getState().sites.sites.find((site: any) => site.id === response.data.site.id)

        store.dispatch(actions.sites.setCurrentSiteId(newSite.id))
    }
}


/**
 * Функция редактирующая данные существующего сайта
 * @param {Object} formDetails — объект с данными и методами манипулирования формой
 * @param {String} lang — язык интерфейса
 */
async function updateSite(
    formDetails: FHTypes.FormDetailsInSubmitHandler,
    lang: StoreSettingsTypes.EditorLanguage
) {

    // id выбранного сайта
    const selectedSiteId = store.getState().sites.currentSiteId

    // Отправить данные на сервер...
    const options = {
        method: 'PATCH',
        body: JSON.stringify(formDetails.readyFieldValues)
    }
    // console.log(formDetails.readyFieldValues.defaultIncFilesTemplateId)
    const response = await makeFetch(getApiUrl('site', selectedSiteId), options, lang)

    // Разблокировать все поля. У кнопки отправки убрать блокировку и загрузку
    let newFormState = setLoadingStatusToForm(formDetails.state, formDetails.setFieldDataPropValue, false)
    formDetails.setFormState(newFormState)

    // Если сайт успешно создан...
    if (response.status === 'success') {
        // Скачать новый список сайтов и поставить в Хранилище
        await store.dispatch(actions.sites.requestSites())
    }
}
