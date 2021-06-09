import {useEffect} from 'react'
import {useSelector} from 'react-redux'
//@ts-ignore
import {useStore} from 'effector-react'
import { AppState } from 'store/rootReducer'
import FHTypes from 'libs/formHandler/types'
import makeImmutableObj from 'libs/makeImmutableCopy/makeImmutableCopy'
import FilesTreeType from 'libs/FilesTree/types'
import { articlesTreeStore } from '../../ArticlesList/ArticlesList'
import filesTreePublicMethods from 'libs/FilesTree/publicMethods'


/**
 * Хук отслеживает выделение другой папки со статьями и изменяет форму чтобы отражать данные выделенной папки
 * @param {Object} formState — объект состояния формы
 * @param {Function} setFormState — функция ставящая новое состояние формы
 */
export function useGetAnotherFolderData(formState: FHTypes.FormState, setFormState: FHTypes.SetFormState) {
    // Массив папок и файлов из Хранилища
    const items = useStore(articlesTreeStore)

    // id текущей папки статей
    const {currentArtItemId} = useSelector((store: AppState) => store.sites.articlesSection)

    useEffect(function () {
        if (!items || !currentArtItemId) return

        // Найти папку с указанным uuid в массиве папок и файлов
        const folder = filesTreePublicMethods.getItemById(items, currentArtItemId)

        // Поставить новые значения в поля...
        let newFormState = changeField(formState, 'name', folder)

        newFormState = makeImmutableObj(newFormState, formState.fields, newFormState)

        // Поставить новое состояние формы
        setFormState(newFormState)
    }, [items, currentArtItemId])
}

/**
 * Функция формирует новое значение поля формы по переданным данным
 * @param {Object} formState — объект состояния формы
 * @param {String} fieldName — имя изменяемого поля
 * @param {Object} folder — данные о папке
 */
function changeField(
    formState: FHTypes.FormState,
    fieldName: 'name',
    folder: FilesTreeType.Item
) {
    // Получение поля формы по имени
    const field = formState.fields[fieldName]
    // Создание копии поля
    const newField = {...field}
    // Обнуление ошибки
    newField.data.error = null
    newField.value = [folder[fieldName]]

    // Поставить новое значение поля name
    return makeImmutableObj(formState, field, newField)
}
