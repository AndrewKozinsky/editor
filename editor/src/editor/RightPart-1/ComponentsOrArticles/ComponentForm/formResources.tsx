// @ts-ignore
// import * as yup from 'yup'
// import store from 'store/store'
// import StoreSettingsTypes from 'store/settings/settingsTypes'
// import FHTypes from 'libs/formHandler/types'
// import filesTreePublicMethods from 'libs/FilesTree/publicMethods'
// import { makeFetch } from 'requests/fetch'
// import getApiUrl from 'requests/apiUrls'
// import {componentsTreeStore, setItems} from '../../ComponentsList/ComponentsList'
// import messages from '../../messages'


/**
 * Объект настройки useFormHandler
 * @param {String} lang — язык интерфейса
 */
/*export default function getFormConfig(lang: StoreSettingsTypes.EditorLanguage): FHTypes.FormConfig {
    return {
        // Обязательно нужно передать все поля обрабатываемые FormHandler-ом
        fields: {
            name: {
                initialValue: [''],
                initialData: {
                    error: null,
                    disabled: false
                },
                /!*change(formDetails) {
                    // Проверять только если форму отправляли как минимум 1 раз
                    if (formDetails.state.form.data.submitCounter > 0) {
                        return validateForm(formDetails.state, formDetails.setFieldDataPropValue, formDetails.setFormDataPropValue, lang)
                    }
                },*!/
            },
            code: {
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
            submit: {
                initialValue: [''],
                initialData: {
                    loading: false,
                    disabled: false,
                }
            }
        },
        form: {
            initialData: {
                // Сколько раз пытались отправить форму
                submitCounter: 0,
            },
            // Пользовательская функция запускаемая при отправке формы
            submit: async function(formDetails) {

                // Проверить форму и поставить/убрать ошибки
                // let formState = validateForm(formDetails.state, formDetails.setFieldDataPropValue, formDetails.setFormDataPropValue, lang)

                // Увеличить счётчик попыток отправки формы и поставить новое Состояние формы в переменную.
                // formState = formDetails.setFormDataPropValue(formState, 'submitCounter', formState.form.data.submitCounter + 1)

                // Первое поле, где есть ошибка
                // let $firstWrongField = getFirstInvalidField(formState)

                // Заблокировать все поля. Кнопке отправки поставить блокировку и загрузку
                // formState = setLoadingStatusToForm(formState, formDetails.setFieldDataPropValue, true)


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
                // formDetails.setFormState(formState)

                // Разблокировать все поля. У кнопки отправки убрать блокировку и загрузку
                // let newFormState = setLoadingStatusToForm(formDetails.state, formDetails.setFieldDataPropValue, false)
                // formDetails.setFormState(newFormState)

                // Сохранить компонент на сервере
                // saveComponentOnServer(formDetails)
                // Сохранить папки с компонентами на сервере и обновить их Состояние
                // saveItemsOnServer(formDetails)
            }
        }
    }
}*/


/**
 * Функция возвращает схему Yup для поля с переданным именем
 * @param {Array} fieldName — имя поля
 * @param {String} lang — язык интерфейса
 */
/*function getSchema(fieldName: string, lang: StoreSettingsTypes.EditorLanguage): any {

    const schemas = {
        name: yup.string()
            .required(messages.ComponentTemplateForm.componentNameRequired[lang])
    }

    // @ts-ignore
    return schemas[fieldName]
}*/


/**
 * Функция проверяющая форму при изменении полей ввода
 * @param {Object} formState — объект Состояния формы
 * @param {Function} setFieldDataPropValue — установщик значения свойства данных поля
 * @param {Function} setFormDataPropValue — установщик значения свойства данных формы
 * @param {String} lang — язык интерфейса
 */
/*function validateForm(
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

        // Игнорировать кнопки
        if (field.fieldType === 'button') continue

        // Значение перебираемого поля
        const fieldValue = field.value[0]

        // Попытаться проверить поле. И в зависимости от результата или поставить или обнулить ошибку
        try {
            getSchema(fieldName, lang)?.validateSync(fieldValue)
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
}*/


/**
 * Функция возвращает ссылку на элемент первого поля с ошибкой
 * @param {Object} formState — объект с Состоянием формы
 */
/*function getFirstInvalidField(formState: FHTypes.FormState) {

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
}*/


/**
 * Функция ставит блокирует или разблокирует поля и кнопку отправки перед/после отправки
 * @param {Object} formState — объект с Состоянием формы
 * @param {Function} setFieldDataPropValue — установщик значения свойства данных поля
 * @param {Boolean} status — блокировать или разблокировать поля
 */
/*function setLoadingStatusToForm(
    formState: FHTypes.FormState, setFieldDataPropValue: FHTypes.SetFieldDataPropValue, status: boolean
) {
    formState = setFieldDataPropValue(formState, 'disabled', status, 'name')
    formState = setFieldDataPropValue(formState, 'disabled', status, 'code')
    formState = setFieldDataPropValue(formState, 'disabled', status, 'submit')
    formState = setFieldDataPropValue(formState, 'loading', status, 'submit')

    return formState
}*/


/**
 * Функция сохраняет шаблон компонента на сервере
 * @param {Object} formDetails — объект с данными и методами манипулирования формой
 */
/*function saveComponentOnServer( formDetails: FHTypes.FormDetailsInSubmitHandler ) {
    // id выбранного шаблона компонента
    const {currentCompItemId} = store.getState().sites.componentsSection

    // Сформировать объект с данными шаблона подключаемых файлов
    const componentData = {
        code: formDetails.readyFieldValues.code
    }

    // Параметры запроса
    const options = {
        method: 'PATCH',
        body: JSON.stringify(componentData)
    }
    // Отправить данные на сервер...
    makeFetch(getApiUrl('component', currentCompItemId), options)
}*/

/**
 * Функция сохраняет папки с компонентами на сервере и обновить их Состояние
 * @param {Object} formDetails — объект с данными и методами манипулирования формой
 */
/*
function saveItemsOnServer( formDetails: FHTypes.FormDetailsInSubmitHandler ) {
    // id текущего сайта
    const currentSiteId = store.getState().sites.currentSiteId

    // Массив папок и файлов из Хранилища
    const items = componentsTreeStore.getState()

    // id выбранного шаблона компонента
    const {currentCompItemId} = store.getState().sites.componentsSection

    // Изменить название файла на введённое и обновить Хранилище папок
    let result = filesTreePublicMethods.changeItemName(
        items,
        currentCompItemId,
        formDetails.state.fields.name.value[0]
    )
    setItems(result.newItems)

    // Подготовить массив папок и файлов для сохранения на сервере
    const preparedItems = filesTreePublicMethods.prepareItemsToSaveInServer(result.newItems)
    const jsonItems = JSON.stringify(preparedItems)

    // Отправить данные на сервер...
    const options = {
        method: 'PUT',
        body: JSON.stringify({content: jsonItems})
    }
    makeFetch(getApiUrl('componentsFolders', currentSiteId), options)
}*/
