import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//@ts-ignore
import {useStore} from 'effector-react'
import { AppState } from 'store/rootReducer'
import actions from 'store/rootAction'
import FHTypes from 'libs/formHandler/types'
import {componentsTreeStore} from '../../ComponentsList/ComponentsList'
import filesTreePublicMethods from 'libs/FilesTree/publicMethods'
import makeImmutableObj from 'libs/makeImmutableCopy/makeImmutableCopy'


/**
 * Хук отслеживает выделение существующего сайта или нового и изменяет форму чтобы отражать выделенный сайт
 * @param {Object} formState — объект состояния формы
 * @param {Function} setFormState — функция ставящая новое состояние формы
 */
export function useGetAnotherComponent(formState: FHTypes.FormState, setFormState: FHTypes.SetFormState) {
    const dispatch = useDispatch()

    // id текущего шаблона компонента
    const {currentCompItemId} = useSelector((store: AppState) => store.sites.componentsSection)

    // Код шаблона компонента
    const {currentCompCode} = useSelector((store: AppState) => store.sites.componentsSection)

    // Массив папок и файлов из Хранилища
    const items = useStore(componentsTreeStore)

    // При выделении другого компонента скачать его данные и поставить в Хранилище
    useEffect(function () {
        // Сделать запрос на данные шаблона компонента на сервер и поставить в Хранилище
        dispatch( actions.sites.requestComponentTemplate() )
    }, [currentCompItemId])

    // При изменении uuid или кода шаблона компонента поставить в форму новые данные
    useEffect(function () {
        if (!items || !currentCompItemId) return

        // Данные компонента из структуры папок
        const compData = filesTreePublicMethods.getItemById(items, currentCompItemId)
        if (!compData) return

        let newFormState = changeField(formState, 'name', compData.name)
        newFormState = changeField(newFormState, 'code', currentCompCode)

        // Поставить новое состояние формы
        setFormState(newFormState)
    }, [items, currentCompItemId, currentCompCode])
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
