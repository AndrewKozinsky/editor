import { useEffect } from 'react'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import FCType from 'libs/FormConstructor/FCType'
import DragFilesTreeType from 'libs/DragFilesTree/types'
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods'


/**
 * Хук отслеживает выделение другой папки с компонентами и изменяет форму,
 * чтобы отражать данные выделенной папки
 * @param {Object} formState — объект состояния формы
 */
export function useGetAnotherFolderData(formState: FCType.StateFormReturn) {
    // Массив папок
    const foldersArr = useGetSitesSelectors().artFolderSection.artFolder
    // id выделенной папки
    const { currentArtItemId } = useGetSitesSelectors().articleSection

    useEffect(function () {
        setNewFolderName(foldersArr, currentArtItemId, formState)
    }, [foldersArr, currentArtItemId])
}

/**
 * Функция получает название выделенной папки и ставит её в поле name у формы.
 * Поэтому при выборе какой-либо папки в форме меняется её имя.
 * @param {Array} foldersArr — массив данных по папкам и файлам.
 * @param {String} currentItemId — id выделенной папки
 * @param {Object} formState — объект состояния формы
 */
function setNewFolderName(
    foldersArr: DragFilesTreeType.Items,
    currentItemId: DragFilesTreeType.ItemId,
    formState: FCType.StateFormReturn
) {
    if (!foldersArr || !currentItemId) return

    // Найти папку с указанным id в массиве папок и файлов
    const folder = filesTreePublicMethods.getItemById(foldersArr, currentItemId)
    if (!folder) return

    // Поставить новое значение поля имени папки
    const valueFieldData = Object.assign(
        formState.fields['name'],
        { value: [folder.name] }
    )

    // Обновление поля name
    formState.updateField('name', valueFieldData)
}
