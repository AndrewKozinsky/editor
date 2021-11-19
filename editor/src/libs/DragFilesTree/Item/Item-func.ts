import { SyntheticEvent, useCallback } from 'react'
import makeImmutableCopy from 'libs/makeImmutableCopy/makeImmutableCopy'
import DragFilesTreeType from '../types'
import {
    addNewFolder,
    getOpenedFoldersId,
    toggleFolder,
    deleteItem,
    selectItem,
    addNewLoadingFile
} from '../StoreManage/manageState'

/*
    Хук возвращает обработчик наведения и увода мыши на главную обёртку папки.
    В обёртке папки или документа есть интерактивные кнопки.
    Нужно сделать чтобы всегда подсвечивался только один элемент: или обёртка или кнопки.
    Так как кнопки находятся в обёртке, то такое поведение нельзя реализовать через CSS.
    Поэтому при наведении на обёртку задаётся атрибут data-ft-hover.
    А если навели на кнопки, то у обёртки удаляется атрибут data-ft-hover.
    Для элементов с data-ft-hover в CSS прописан подсвечивающий стиль.
*/
export function useMarkItemElemWhenItHovered() {

    return useCallback(function (event: SyntheticEvent): void {
        const $target = <HTMLElement>event.target
        const $folder = $target.closest('[data-ft-item]').querySelector('[data-ft-inner]')

        if (!$target || !$folder) return

        // Если на элемент навели и это не кнопка...
        if (event.type === 'mouseover' && !$target.closest('[data-ft-item-btn]')) {
            // То поставить обёртке data-ft-hover
            //@ts-ignore
            $folder.dataset.ftHover = 'true'
        }
        // В остальных случаях убрать data-ft-hover
        else {
            //@ts-ignore
            delete $folder.dataset.ftHover
        }
    }, [])
}


/**
 * Обработчик щелчка по треугольной кнопке сворачивания/разворачивания содержимого папки
 * @param {String} folderId — id папки которую нужно свернуть/развернуть
 * @param {Array} items — массив с данными по папкам и файлам
 * @param {Function} setItems — функция устанавливающая новый массив папок и файлов в Хранилище
 * @param {Object} after — с различными свойствами и методами переданными в параметрах FilesTree.
 */
export function useGetToggleFolder(
    folderId: DragFilesTreeType.Id,
    items: DragFilesTreeType.Items,
    setItems: DragFilesTreeType.SetItems,
    after: DragFilesTreeType.After
) {
    return useCallback(function (e) {
        e.stopPropagation()

        // Свернуть/развернуть папку и возвратить новый массив папок и файлов
        const newItems = toggleFolder(items, folderId)

        // Запустить функцию, переданную в аргументах FilesTree,
        // которая должна запускаться при разворачивании/сворачивании папки
        // и передать массив открытых папок
        if (after.collapseFolder) {
            // Получить id раскрытых папок
            const openedFoldersId = getOpenedFoldersId(newItems)
            after.collapseFolder(openedFoldersId)
        }

        if (newItems) setItems(newItems)
    }, [items, folderId])
}

/**
 * Обработчик щелчка по кнопке добавления нового элемента в массив папок и файлов.
 * @param {Object} e — объект события
 * @param {Object} folderData — данные папки в которой нужно добавить новую папку или файл
 * @param {Array} items — массив данных по папкам и файлам
 * @param {Function} setItems — функция устанавливающая новый массив папок и файлов в Хранилище
 * @param {Object} after — объект с различными свойствами и методами переданными в параметрах FilesTree.
 */
export function createNewFolder(
    e: SyntheticEvent,
    folderData: null | DragFilesTreeType.Item,
    items: DragFilesTreeType.Items,
    setItems: DragFilesTreeType.SetItems,
    after: DragFilesTreeType.After,
) {
    e.stopPropagation()

    // Добавить новую папку или файл и возвратить новый элемент и новое Состояние
    const result = addNewFolder(folderData, items, after)

    // Если при добавлении файла папка была свёрнута,
    // то после добавления она автоматически раскрывается, поэтому запущу функцию,
    // которая должна быть запущена после раскрытия/скрытия папок
    if (after.collapseFolder) {
        const openedFoldersId = getOpenedFoldersId(result.newState)
        after.collapseFolder(openedFoldersId)
    }

    // Запустить функцию, которая должна быть запущена после изменения структуры папок
    if (after.changingTree) {
        after.changingTree(result.newState)
    }

    // Сделаю новый элемент текущим
    // const { newItem, newItems } = selectItem(result.newState, result.newItem.id)

    // Запустить функцию, которая должна быть запущена после выделения элемента
    if (after.selectItem) after.selectItem(result.newItem)

    // Обновить Состояние списка папок
    setItems(result.newState)
}


/**
 * Обработчик щелчка по кнопке добавления нового элемента в массив папок и файлов.
 * @param {Object} e — объект события
 * @param {Object} folderData — данные папки в которой нужно добавить новую папку или файл
 * @param {Array} items — массив данных по папкам и файлам
 * @param {Function} setItems — функция устанавливающая новый массив папок и файлов в Хранилище
 * @param {Object} after — объект с различными свойствами и методами переданными в параметрах FilesTree.
 */
export async function createNewFile(
    e: SyntheticEvent,
    folderData: null | DragFilesTreeType.Item,
    items: DragFilesTreeType.Items,
    setItems: DragFilesTreeType.SetItems,
    after: DragFilesTreeType.After,
) {
    e.stopPropagation()

    // Добавить новый загружающейся файл и возвратить новый элемент и новое Состояние
    const result = addNewLoadingFile(folderData, items, after)

    // Обновить Состояние списка папок
    setItems(result.newState)

    const normalFile = {...result.newItem}
    normalFile.id = await after.addingNewFile()
    delete normalFile.loading

    // Если при добавлении файла папка была свёрнута,
    // то после добавления она автоматически раскрывается, поэтому запущу функцию,
    // которая должна быть запущена после раскрытия/скрытия папок
    if (after.collapseFolder) {
        const openedFoldersId = getOpenedFoldersId(result.newState)
        after.collapseFolder(openedFoldersId)
    }

    const updatedState = makeImmutableCopy(result.newState, result.newItem, normalFile)

    // Запустить функцию, которая должна быть запущена после изменения структуры папок
    if (after.changingTree) {
        after.changingTree(updatedState)
    }

    // Обновить Состояние списка папок
    setItems(updatedState)
}


/**
 * Обработчик щелчка по кнопке удаления элемента в массив папок и файлов.
 * @param {Object} e — объект события
 * @param {Array} items — массив данных по папкам и файлам.
 * @param {Function} setItems — функция устанавливающая новый массив папок и файлов в Хранилище
 * @param {String} itemId — id папки или файла, которую нужно удалить
 * @param {Object} after — объект с различными свойствами и методами переданными в параметрах FilesTree.
 */
export function removeItem(
    e: null | SyntheticEvent,
    items: DragFilesTreeType.Items,
    setItems: DragFilesTreeType.SetItems,
    itemId: DragFilesTreeType.Id,
    after?: DragFilesTreeType.After,
) {
    if (e) e.stopPropagation()

    // Удалить переданный элемент и возвратить новый список папок и файлов
    const newItems = deleteItem(items, itemId)

    // Запустить функцию, которая должна быть запущена после удаления папки или файла
    if (after && after.deleteItem) {
        after.deleteItem(newItems, itemId)
    }

    // Обновить Состояние списка папок
    setItems(newItems)
}


/**
 * Хук возвращает обработчик щелчка по папке или файлу.
 * В местное состояние ставит id этой папки или файла.
 * @param {Array} items — массив данных по папкам и файлам.
 * @param {Function} setItems — функция устанавливающая новый массив папок и файлов в Хранилище
 * @param {Object} itemData — данные папки или файла.
 * @param {Object} after — объект с различными свойствами и методами переданными в параметрах FilesTree.
 */
export function useGetOnClickHandler(
    items: DragFilesTreeType.Items,
    setItems: DragFilesTreeType.SetItems,
    itemData: DragFilesTreeType.Item,
    after: DragFilesTreeType.After
) {
    return useCallback(function (e) {
        // Поставить текущий id в качестве активного
        const { newItem, newItems } = selectItem(items, itemData.id)

        // Запустить функцию, которая должна быть запущена после выделения элемента
        if (after.selectItem) after.selectItem(newItem)

        // Обновить Состояние списка папок
        setItems(newItems)
    }, [itemData, after])
}
