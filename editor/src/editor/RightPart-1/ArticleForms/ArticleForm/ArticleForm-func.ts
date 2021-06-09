import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//@ts-ignore
import {useStore} from 'effector-react'
import { AppState } from 'store/rootReducer'
import actions from 'store/rootAction'
import FHTypes from 'libs/formHandler/types'
import {articlesTreeStore} from '../../ArticlesList/ArticlesList'
import filesTreePublicMethods from 'libs/FilesTree/publicMethods'
import makeImmutableObj from 'libs/makeImmutableCopy/makeImmutableCopy'
import { OptionsType } from 'common/formElements/Select/SelectTypes'
import StoreSitesTypes from 'store/site/sitesTypes'
import messages from '../../messages'


/**
 * Хук отслеживает выделение другой статьи и изменяет форму чтобы отражать её данные
 * @param {Object} formState — объект состояния формы
 * @param {Function} setFormState — функция ставящая новое состояние формы
 */
export function useGetAnotherArticle(formState: FHTypes.FormState, setFormState: FHTypes.SetFormState) {
    const dispatch = useDispatch()

    // id текущей статьи
    const {currentArtItemId} = useSelector((store: AppState) => store.sites.articlesSection)

    // Данные статьи
    // const {currentArtCode} = useSelector((store: AppState) => store.sites.articlesSection)


    // При выделении другой статьи скачать её данные и поставить в Хранилище
    useEffect(function () {
        // Сделать запрос на данные статьи на сервер и поставить в Хранилище
        dispatch( actions.sites.requestArticle() )
    }, [currentArtItemId])

    // При изменении uuid статьи поставить в форму новые данные
    useEffect(function () {
        if (!currentArtItemId) return

        // Данные статьи
        // const artData =
        // if (!artData) return

        // let newFormState = changeField(formState, 'name', artData.name)

        // Поставить новое состояние формы
        // setFormState(newFormState)
    }, [currentArtItemId])
}


/**
 * Функция формирует новое значение поля формы по переданным данным
 * @param {Object} formState — объект состояния формы
 * @param {String} fieldName — имя изменяемого поля
 * @param {Object} value — новое значение поля
 */
function changeField(
    formState: FHTypes.FormState,
    fieldName: 'name' | 'code',
    value: null | string
) {
    // Получение поля формы по имени
    const field = formState.fields[fieldName]
    // Создание копии поля
    const newField = {...field}
    // Обнуление ошибки
    newField.data.error = null

    // Занесение нового значения.
    const val = value || ''
    newField.value = [val]

    // Поставить новое значение поля name
    return makeImmutableObj(formState, field, newField)
}


/**
 * Хук контролирует выпадающий список выбора шаблона по умолчанию для всего сайта.
 * Возвращает объект со свойствами:
 * showSelect — показывать ли выпадающий список со списком шаблонов,
 * один из которых можно указать в качестве шаблона по умолчанию для всего сайта.
 * selectOptions — массив пунктов выпадающего списка
 */
export function useManageTemplatesSelect(fh: FHTypes.ReturnObj) {
    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Массив шаблонов подключаемых файлов
    const templates:StoreSitesTypes.IncFilesTemplatesType = useSelector((store: AppState) => {
        return store.sites.incFilesTemplatesSection.templates
    })

    const [isVisible, setIsVisible] = useState(false)
    const [selectOptions, setSelectOptions] = useState([])

    useEffect(function () {
        // Если есть массив шаблонов...
        if (templates?.length) {

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
        isTemplatesSelectVisible: isVisible,
        selectOptions
    }
}