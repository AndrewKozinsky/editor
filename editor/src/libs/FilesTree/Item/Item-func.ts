import {SyntheticEvent, useCallback} from 'react'
import FilesTreeType from '../types'
import {makeCN} from 'utils/StringUtils'
import {
    addNewItem,
    getOpenedFoldersUuid,
    toggleFolder
} from '../FilesTree/manageStateDataFunc'

/*
    Хук возвращает обработчик наведения и увода мыши на главную обёртку папки.
    В обёртке есть интерактивные кнопки.
    Нужно сделать чтобы всегда подсвечивался только один элемент: или обёртка или кнопки.
    Так как кнопки находятся в обёртке, то такое поведение нельзя реализовать через CSS.
    Поэтому при наведении на обёртку задаётся атрибут data-ft-hover.
    А если навели на кнопки, то у обёртки удаляется атрибут data-ft-hover.
    Для элементов с data-ft-hover в CSS прописан подсвечивающий стиль.
*/
export function useMarkItemElemWhenItHovered() {

    return useCallback(function (event: SyntheticEvent): void {
        const $target = <HTMLElement>event.target
        const $folder = $target.closest('[data-ft-item]').querySelector('[data-ft-inner-folder]')

        if (!$target || !$folder) return

        // Если на элемент навели и это не кнопка...
        if(event.type === 'mouseover' && !$target.closest('[data-ft-item-btn]')) {
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
 * Функция возвращает классы кнопки сворачивания/разворачивания папки.
 * @param {String} CN — класс компонента
 * @param {Object} folderData — данные папки
 */
export function getTriangleBtnClasses(CN: string, folderData: FilesTreeType.Item) {
    const classes  = [`${CN}__btn`, `${CN}__btn-triangle`]

    // Если папка открыта
    if (folderData.open) {
        classes.push(`${CN}__btn-triangle--open`)
    }

    // Если в папке нет данных, то сделать кнопку невидимой
    if (!folderData.content || !folderData.content.length) {
        classes.push(`${CN}__btn-triangle--invisible`)
    }

    return makeCN(classes)
}

/**
 * Функция возвращает классы кнопки сворачивания/разворачивания папки.
 * @param {String} CN — класс компонента
 * @param {Object} folderData — данные папки
 * @param {String} activeItemId — Uuid выделенной папки или файла.
 */
export function getFolderInnerWrapperClasses(
    CN: string, folderData: FilesTreeType.Item, activeItemId: FilesTreeType.UuId
) {
    const classes  = [`${CN}__inner`]

    // Добавить обводку если нужно показать метку inside
    if (folderData.placeMark === 'inside') {
        classes.push(`${CN}__inner-round-flash`)
    }

    // Добавить дополнительный класс если это выделенная папка
    if (folderData.uuid === activeItemId) {
        classes.push(`${CN}__inner-active`)
    }

    return makeCN(classes)
}

/**
 * Обработчик щелчка по треугольной кнопке сворачивания/разворачивания содержимого папки
 * @param {String} folderId — id папки которую нужно свернуть/развернуть
 * @param {Array} items — массив с данными по папкам и файлам
 * @param {Function} setItems — функция устанавливающая новые данные в массив папок и файлов
 * @param {Object} out — с различными свойствами и методами переданными в параметрах FilesTree.
 */
export function useGetToggleFolder(
    folderId: FilesTreeType.UuId,
    items: FilesTreeType.Items,
    setItems: FilesTreeType.SetItemsFn,
    out: FilesTreeType.Out
) {
    return useCallback(function (e) {
        e.stopPropagation()

        const newItems = toggleFolder(items, folderId)

        // Запустить функцию, переданную в аргументах FilesTree,
        // которая должна запускаться при разворачивании/сворачивании папки
        // и передать массив открытых папок
        if (out.collapseFolder) {
            // Получить uuid раскрытых папок
            const openedFoldersUuid = getOpenedFoldersUuid(newItems)
            out.collapseFolder(openedFoldersUuid)
        }

        if (newItems) setItems(newItems)
    }, [items, folderId, setItems])
}

/**
 * Обработчик щелчка по кнопке добавления нового элемента в массив папок и файлов.
 * @param {Object} e — объект события
 * @param {String} newItemType — тип нового элемента
 * @param {Object} folderData — данные папки в которой нужно добавить новую папку или файл
 * @param {Array} items — массив данных по папкам и файлам
 * @param {Function} setItems — функция устанавливающая новые данные в массив папок и файлов
 * @param {Object} out — объект с различными свойствами и методами переданными в параметрах FilesTree.
 * @param {Function} setActiveItemId — функция изменяющая uuid выделенной папки или файла.
 */
export function createNewItem(
    e: any,
    newItemType: FilesTreeType.ItemType,
    folderData: null | FilesTreeType.Item,
    items: FilesTreeType.Items,
    setItems: FilesTreeType.SetItemsFn,
    out: FilesTreeType.Out,
    setActiveItemId: FilesTreeType.SetActiveItemIdFn
) {
    e.stopPropagation()

    // Добавить новую папку или файл и возвратить новый элемент и новое Состояние
    const result = addNewItem(newItemType, folderData, items, out, setActiveItemId)

    // Если добавили файл, то запустить переданную функцию,
    // которая должна быть запущена после добавления файла
    if(newItemType === 'file') {
        if (out.afterAddingNewFile) {
            out.afterAddingNewFile(result.newItem)
        }

        // Если при добавлении файла папка была свёрнута,
        // то после добавления она автоматически раскрывается, поэтому запущу функцию,
        // которая должна быть запущена после раскрытия/скрытия папок
        if (out.collapseFolder) {
            const openedFoldersUuid = getOpenedFoldersUuid(result.newState)
            out.collapseFolder(openedFoldersUuid)
        }
    }

    // Запустить функцию, которая должна быть запущена после изменения дерева файлов и папок
    if (out.afterChangingTree) {
        out.afterChangingTree(result.newState)
    }

    // Сразу перейти к созданному файлу сделав его текущим
    setActiveItemId(result.newItem.uuid)
    // Запустить переданную функцию, которая должна запускаться
    // когда щёлкают по папке или файлу (делают его текущим)
    if (out.onItemClick) out.onItemClick(result.newItem)

    // Обновить Состояние списка папок
    setItems(result.newState)
}


/**
 * Функция возвращает классы кнопки сворачивания/разворачивания папки.
 * @param {String} CN — класс компонента
 * @param {Object} folderData — данные папки
 * @param {String} activeItemId — Uuid выделенной папки или файла.
 */
export function getFileInnerWrapperClasses(
    CN: string, folderData: FilesTreeType.Item, activeItemId: FilesTreeType.UuId
) {
    const classes  = [`${CN}__inner`]

    // Добавить дополнительный класс если это выделенная папка
    if (folderData.uuid === activeItemId) {
        classes.push(`${CN}__inner-active`)
    }

    return makeCN(classes)
}



export function useGetOnClickHandler(
    itemData: FilesTreeType.Item, setActiveItemId: FilesTreeType.SetActiveItemIdFn, out: FilesTreeType.Out
) {
    return useCallback(function (e) {
        // Поставить текущий uuid в качестве активного в местрое Состояние
        setActiveItemId(itemData.uuid)

        // Запустить функцию переданную в FilesTree в качестве атрибута
        if (out.onItemClick) {
            out.onItemClick(itemData)
        }
    }, [itemData, setActiveItemId, out])
}