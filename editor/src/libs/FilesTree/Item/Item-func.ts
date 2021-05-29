import {SyntheticEvent, useCallback} from 'react'
import FilesTreeType from '../types'
import {makeCN} from 'utils/StringUtils'
import {createNewItem, getItemDataById, getParentArray, toggleFolder } from '../FilesTree/manageStateDataFunc'
import makeImmutableCopy from '../../makeImmutableCopy/makeImmutableCopy';

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
 */
export function getInnerWrapperClasses(CN: string, folderData: FilesTreeType.Item) {
    const classes  = [`${CN}__inner`]

    if (folderData.placeMark === 'inside') {
        classes.push(`${CN}__inner-round-flash`)
    }

    return makeCN(classes)
}

/**
 * Обработчик щелчка по треугольной кнопке сворачивания/разворачивания содержимого папки
 * @param {String} folderId — id папки которую нужно свернуть/развернуть
 * @param {Array} items — массив с данными по папкам и файлам
 * @param {Function} setItems — функция устанавливающая новые данные в массив папок и файлов
 */
export function useGetToggleFolder(
    folderId: FilesTreeType.Id,
    items: FilesTreeType.Items,
    setItems: FilesTreeType.SetItemsFn
) {
    return useCallback(function (e) {
        const newItems = toggleFolder(items, folderId)

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
 * @param {String} itemName — название новой папки или файла
 */
export function addNewItem(
    e: any,
    newItemType: FilesTreeType.ItemType,
    folderData: null | FilesTreeType.Item,
    items: FilesTreeType.Items,
    setItems: FilesTreeType.SetItemsFn,
    itemName: string
) {
    // Если папка передана, то поставить новый элемент внутрь папки
    if (folderData) {
        const thisFolderData = getItemDataById(items, folderData.id)

        // Скопировать данные папки
        const folderDataCopy = {...thisFolderData}

        // Раскрыть папку
        folderDataCopy.open = true

        // Поставить пустой массив content если в папке его нет
        if (!folderDataCopy.content) {
            folderDataCopy.content = []
        }

        // Поставить в него новый элемент
        const newItem = createNewItem(newItemType, itemName)
        folderDataCopy.content.unshift( newItem )

        // Создать новый массив всех папок и файлов с учётом изменений
        const newItems = makeImmutableCopy(items, thisFolderData, folderDataCopy)

        // Обновить состояние списка папок
        setItems(newItems)
    }
    // Если папка не передана, то поставить новый элемент в корень
    else {
        // Скопировать корневой массив
        const rootItemsCopy = [...items]

        // Поставить в корневой массив новый элемент
        const newItem = createNewItem(newItemType, itemName)
        rootItemsCopy.unshift( newItem )

        // Обновить состояние списка папок
        setItems(rootItemsCopy)
    }
}

