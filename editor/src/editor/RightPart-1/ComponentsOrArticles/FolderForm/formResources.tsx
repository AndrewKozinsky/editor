// @ts-ignore
// import * as yup from 'yup'
// import FHTypes from 'libs/formHandler/types'
// import messages from '../../messages'
// import store from 'store/store'
// import StoreSettingsTypes from 'store/settings/settingsTypes'
// import {componentsTreeStore, setItems} from '../../ComponentsList/ComponentsList'
// import filesTreePublicMethods from 'libs/FilesTree/publicMethods'
// import { makeFetch } from 'requests/fetch'
// import getApiUrl from 'requests/apiUrls'
// import {FolderType} from '../types'
/*import {
    componentsTreeStore,
    articlesTreeStore,
    setCompItems,
    setArtItems
} from '../stores'*/
// import {useSelector} from 'react-redux';
// import {AppState} from '../../../../store/rootReducer';


/**
 * Объект настройки useFormHandler
 * @param {String} lang — язык интерфейса
 * @param {String} type — тип выбранной папки: с компонентами или со статьями
 */
/*export default function getFormConfig(lang: StoreSettingsTypes.EditorLanguage, type: FolderType): FHTypes.FormConfig {
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
                        return validateForm(type, formDetails.state, formDetails.setFieldDataPropValue, formDetails.setFormDataPropValue, lang)
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
                let formState = validateForm(
                    type, formDetails.state, formDetails.setFieldDataPropValue,
                    formDetails.setFormDataPropValue, lang
                )

                // Увеличить счётчик попыток отправки формы и поставить новое Состояние формы в переменную.
                formState = formDetails.setFormDataPropValue(
                    formState, 'submitCounter', formState.form.data.submitCounter + 1
                )

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

                // Разблокировать все поля. У кнопки отправки убрать блокировку и загрузку
                let newFormState = setLoadingStatusToForm(formDetails.state, formDetails.setFieldDataPropValue, false)
                formDetails.setFormState(newFormState)

                // Сохранить папки с компонентами на сервере и обновить их Состояние
                saveItemsOnServer(type, formDetails)
            }
        }
    }
}*/


/**
 * Функция возвращает схему Yup для поля с переданным именем
 * @param {String} type — тип выбранной папки: с компонентами или со статьями
 * @param {Array} fieldName — имя поля
 * @param {String} lang — язык интерфейса
 */
/*function getSchema(type: FolderType, fieldName: string, lang: StoreSettingsTypes.EditorLanguage): any {

    // Сообщение об ошибке про обязательное имя статьи
    let nameRequiredText = messages.ComponentFolderForm.formNameInputRequired[lang]
    if (type === 'articles') nameRequiredText = messages.ArticlesFolderForm.formNameInputRequired[lang]

    const schemas = {
        name: yup.string().required(nameRequiredText)
    }

    // @ts-ignore
    return schemas[fieldName]
}*/


/**
 * Функция проверяющая форму при изменении полей ввода
 * @param {String} type — тип выбранной папки: с компонентами или со статьями
 * @param {Object} formState — объект Состояния формы
 * @param {Function} setFieldDataPropValue — установщик значения свойства данных поля
 * @param {Function} setFormDataPropValue — установщик значения свойства данных формы
 * @param lang
 */
/*function validateForm(
    type: FolderType,
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
            getSchema(type, fieldName, lang)?.validateSync(fieldValue)
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
    formState = setFieldDataPropValue(formState, 'disabled', status, 'submit')
    formState = setFieldDataPropValue(formState, 'loading', status, 'submit')

    return formState
}*/


/**
 * Функция сохраняет папки с компонентами на сервере и обновить их Состояние
 * @param {String} type — тип выбранной папки: с компонентами или со статьями
 * @param {Object} formDetails — объект с данными и методами манипулирования формой
 */
/*function saveItemsOnServer( type: FolderType, formDetails: FHTypes.FormDetailsInSubmitHandler ) {

    // Массив папок и файлов из Хранилища
    let items
    if (type === 'components') items = componentsTreeStore.getState()
    if (type === 'articles') items = articlesTreeStore.getState()

    // id выбранной папки у компонентов и статей
    const {currentCompItemId} = store.getState().sites.componentsSection
    const {currentArtItemId} = store.getState().sites.articlesSection

    // Изменить название папки на введённое и обновить Хранилище папок
    let result
    if (type === 'components') {
        result = filesTreePublicMethods.changeItemName(
            items,
            currentCompItemId,
            formDetails.state.fields.name.value[0]
        )
        setCompItems(result.newItems)
    }
    else if (type === 'articles') {
        result = filesTreePublicMethods.changeItemName(
            items,
            currentArtItemId,
            formDetails.state.fields.name.value[0]
        )
        setArtItems(result.newItems)
    }

    // Подготовить массив папок и файлов для сохранения на сервере
    const preparedItems = filesTreePublicMethods.prepareItemsToSaveInServer(result.newItems)
    const jsonItems = JSON.stringify(preparedItems)

    // Данные для отправки на сервер...
    const options = {
        method: 'PUT',
        body: JSON.stringify({content: jsonItems})
    }
    // id текущего сайта
    const currentSiteId = store.getState().sites.currentSiteId

    if (type === 'components') {
        makeFetch(getApiUrl('componentsFolders', currentSiteId), options)
    }
    else if (type === 'articles') {
        makeFetch(getApiUrl('articlesFolders', currentSiteId), options)
    }
}*/
