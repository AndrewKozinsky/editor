import makeImmutableCopy from 'libs/makeImmutableCopy/makeImmutableCopy'
import DragFilesTreeType from '../types'


/**
 * Функция разворачивающая/сворачивающая папку.
 * @param {Array} items — массив данных по папкам и файлам.
 * @param {String} folderId — id папки, которую нужно расвернуть/свернуть
 */
export function toggleFolder(items: DragFilesTreeType.Items, folderId: DragFilesTreeType.FolderItemId) {
    // Получение папки с заданным идентификатором
    const folder = getItemDataById(items, folderId)
    if (!folder || folder.type !== 'folder') return

    // Перевернуть значение открыта ли папка
    const folderCopy = {...folder, open: !(folder.open)}

    // Создание нового массива папок и файлов
    return makeImmutableCopy(items, folder, folderCopy)
}


/**
 * Функция находит в массиве объект данных с переданным id.
 * @param {Array} items — массив данных по папкам и файлам.
 * @param {String} itemId — id папки или файла, которую нужно найти
 */
export function getItemDataById(items: DragFilesTreeType.Items, itemId: DragFilesTreeType.ItemId): null | DragFilesTreeType.Item {
    for (let i = 0; i < items.length; i++) {
        const item = items[i]

        if (item.id === itemId) {
            return item
        }
        else if (item.type === 'folder' && item.content) {
            const foundedItem = getItemDataById(item.content, itemId)
            if (foundedItem) return foundedItem
        }
    }

    return null
}

/**
 * Функция возвращает булево значение имеет ли папка вложенный элемент
 * @param {Object} folderData — данные папки где возможно есть указанный вложенный элемент
 * @param {String} itemId — id элемента, который возможно есть в указанной папке
 */
export function hasFolderAnItem(folderData: DragFilesTreeType.Item, itemId: DragFilesTreeType.ItemId) {
    if (folderData.type === 'folder' && folderData.content) {
        return Boolean(
            getItemDataById(folderData.content, itemId)
        )
    }

    return false
}

/**
 * Функция вставляющая указатель помещения перетаскиваемого элемента.
 * Возвращает новый массив папок и файлов.
 * @param {Array} items — массив данных по папкам и файлам
 * @param {String} itemId — id элемента под которым находится курсор
 * @param {String} place — место, которое нужно подсветить. Три варианта: 'after' | 'inside' | 'before'
 */
export function showPlaceMark(
    items: DragFilesTreeType.Items,
    itemId: DragFilesTreeType.ItemId,
    place: 'after' | 'inside' | 'before'
) {
    // Стереть имеющиеся метки
    const itemsCopy = erasePropInItems(items, 'placeMark')

    // Получение папки/файла с заданным идентификатором
    const item = getItemDataById(itemsCopy, itemId)
    if (!item) return

    // Поставить новое значение свойству placeMark
    const itemCopy = {...item, placeMark: place}

    // Создание и возвращение нового массива элементов
    return makeImmutableCopy(itemsCopy, item, itemCopy)
}


/**
 * Рекурсивная функция проходит по всем элементам массива items и у каждого элемента удаляет указанное свойство
 * @param {Array} items — массив данных по папкам и файлам
 * @param {String} propName — имя свойства, значение которого нужно удалить
 */
function erasePropInItems(items: DragFilesTreeType.Items, propName: string) {
    return items.map(item => {
        const newItem = {...item}
        //@ts-ignore
        delete newItem[propName]

        if (newItem.type === 'folder' && newItem.content) {
            newItem.content = erasePropInItems(newItem.content, propName)
        }

        return  newItem
    })
}


/**
 * Функция помещает указанный элемент в другую часть дерева папок и файлов и обновляет Состояние
 * @param {String} movedItemId — id перемещаемого элемента
 * @param {String} anchorItemId — id элемента относительно которого будет позиционироваться перемещаемый элемент
 * @param {String} position — позиция перемещаемого элемента относительно якорного
 * @param {Array} items — массив данных по папкам и файлам
 */
export function moveItemTo(
    movedItemId: DragFilesTreeType.ItemId,
    anchorItemId: DragFilesTreeType.ItemId,
    position: DragFilesTreeType.PlaceMark,
    items: DragFilesTreeType.Items,
) {
    // Получение данных перемещаемого объекта по его id
    const movedItem = getItemDataById(items, movedItemId)
    if (!movedItem) return

    // Удалить перемещаемый элемент и возвратить массив папок без него
    let itemsCopy = deleteItem(items, movedItemId)

    // Поставить перемещаемый элемент в указанное место и возвратить новый массив
    itemsCopy = addItem(itemsCopy, movedItem, anchorItemId, position)

    // Стереть имеющиеся метки и возвратить новый массив папок и файлов
    return erasePropInItems(itemsCopy, 'placeMark')
}

/**
 * Функция удаляет папку или файл с переданным id из массива папок и файлов и возвращает новый массив
 * @param {Array} items — массив папок и файлов
 * @param {String} itemId — id папки или файла, который нужно найти и удалить
 */
export function deleteItem(items: DragFilesTreeType.Items, itemId: DragFilesTreeType.ItemId): DragFilesTreeType.Items {
    // Найду массив в котором находится удаляемая папка или файл
    let itemsArr = getParentArray(items, itemId)
    if (!itemsArr) return

    // Получить индекс удаляемого элемента в массиве parentArr
    const itemIdx = itemsArr.findIndex((elem: DragFilesTreeType.Item) => elem.id === itemId)
    if (itemIdx < 0) return

    const newItemsArr = [...itemsArr]
    newItemsArr.splice(itemIdx, 1)

    return makeImmutableCopy(items, itemsArr, newItemsArr)
}

/**
 * Функция добавляет папку или файл в указанное место в массиве папок и файлов
 * @param {Array} items — массив данных по папкам и файлам
 * @param {Object} movedItem — данные элемента, который нужно добавить в другое место
 * @param {String} anchorItemId — id элемента относительно которого будет вставлен новый элемент
 * @param {String} position — в какую позицию относительно якорного элемента поставить новый элемент
 */
function addItem(
    items: DragFilesTreeType.Items,
    movedItem: DragFilesTreeType.Item,
    anchorItemId: DragFilesTreeType.ItemId,
    position: DragFilesTreeType.PlaceMark
) {
    // Найду массив в котором находится якорная папка или файл
    let itemsArr = getParentArray(items, anchorItemId)
    if (!itemsArr) return

    // Получить индекс якорного элемента в массиве parentArr
    const anchorIdx = itemsArr.findIndex(elem => elem.id === anchorItemId)
    if (anchorIdx < 0) return

    if (position === 'before') {
        const newItemsArr = [...itemsArr]
        newItemsArr.splice(anchorIdx, 0, movedItem)
        return makeImmutableCopy(items, itemsArr, newItemsArr)
    }
    else if (position === 'after') {
        const newItemsArr = [...itemsArr]
        newItemsArr.splice(anchorIdx + 1, 0, movedItem)
        return makeImmutableCopy(items, itemsArr, newItemsArr)
    }
    else if (position === 'inside' && itemsArr[anchorIdx].type === 'folder') {
        // @ts-ignore
        if (itemsArr[anchorIdx].content) {
            // @ts-ignore
            const contentArr = itemsArr[anchorIdx].content
            const contentArrCopy = [movedItem, ...contentArr]
            return makeImmutableCopy(items, contentArr, contentArrCopy)
        }
        else {
            const anchorObj = itemsArr[anchorIdx]
            const anchorObjCopy = {...anchorObj}
            // @ts-ignore
            anchorObjCopy.content = [movedItem]
            return makeImmutableCopy(items, anchorObj, anchorObjCopy)
        }
    }

    return items
}

/**
 * Функция возвращает массив, в котором содержится папка или файл с переданным id
 * @param {Array} items — массив папок и файлов
 * @param {String} itemId — id папки или файла у которого нужно найти родительскую папку
 */
export function getParentArray(
    items: DragFilesTreeType.Items,
    itemId: DragFilesTreeType.ItemId
): null | DragFilesTreeType.Items {
    for (let i = 0; i < items.length; i++) {
        const item = items[i]

        if (items[i].id === itemId) {
            return items
        }
        else if (item.type === 'folder' && item.content) {
            const foundedItem = getParentArray(item.content, itemId)
            if (foundedItem) return foundedItem
        }
    }

    return null
}

/**
 * Функция создаёт новую пустую папку или файл
 * @param {Object} after — объект с различными свойствами и методами переданными в параметрах FilesTree.
 * @param {Array} items — массив папок и файлов
 */
export function createNewFolder(
    after: DragFilesTreeType.After,
    items: DragFilesTreeType.Items,
) {
    // Идентификатор новой папки. Номера идут по-порядку.
    const id = getFolderNextId(items)
    const name = after.newFolderName

    const newFolder: DragFilesTreeType.FolderItem = {
        type: 'folder',
        id,
        name // Имя файла или папки
    }

    return newFolder
}

/**
 * Функция создаёт новую пустую папку или файл
 * @param {Object} after — объект с различными свойствами и методами переданными в параметрах FilesTree.
 * @param {Array} items — массив папок и файлов
 */
export function createNewLoadingFile(
    after: DragFilesTreeType.After,
    items: DragFilesTreeType.Items,
) {
    const newItem: DragFilesTreeType.Item = {
        id: 1000000000 + Math.round(Math.random() * 1000),
        type: 'file', // Тип элемента: файл или папка
        name: after.newFileName,
        loading: true
    }

    return newItem
}


/**
 * Функция анализирует массив папок и файлов и возвращает следующий id для создаваемой папки
 * @param {Array} items — массив папок и файлов
 */
function getFolderNextId(items: DragFilesTreeType.Items): string {
    let maxId = 0

    function maxIdFinder(elems: DragFilesTreeType.Items) {
        if (!elems || !elems.length) return

        for (let i = 0; i < elems.length; i++) {
            if (elems[i].type == 'file') continue

            const strId = elems[i].id.toString().slice(7)
            const numId = parseInt(strId)

            if (numId > maxId) {
                maxId = numId

                // @ts-ignore
                if (elems[i].content) {
                    // @ts-ignore
                    maxIdFinder(elems[i].content)
                }
            }
        }
    }

    maxIdFinder(items)

    return 'folder_' + (maxId + 1)
}

/**
 * Функция готовит массив папок и файлов для сохранения на сервере: убирает лишние детали.
 * @param {Array} items — массив папок и файлов
 */
export function prepareItemsToSaveInServer(items: DragFilesTreeType.Items) {
    return items.map(item => {
        const newItem: DragFilesTreeType.Item = {...item}

        delete newItem.placeMark
        delete newItem.active


        if (newItem.type === 'file') {
            delete newItem.loading
        }
        else if (newItem.type === 'folder') {
            delete newItem.open

            if (newItem.content) {
                newItem.content = prepareItemsToSaveInServer(newItem.content)
            }
        }

        return  newItem
    })
}


/**
 * Функция добавляет новую папку в массив папок и файлов
 * @param {Object} folderData — данные папки
 * @param {Array} items — массив данных по папкам и файлам
 * @param {Object} after — объект с различными свойствами и методами переданными в параметрах FilesTree.
 */
export function addNewFolder(
    folderData: null | DragFilesTreeType.FolderItem,
    items: DragFilesTreeType.Items,
    after: DragFilesTreeType.After,
) {
    let newItem: DragFilesTreeType.FolderItem
    let newState: DragFilesTreeType.Items

    // Если папка передана, то поставить новый элемент внутрь папки
    if (folderData) {
        const thisFolderData = getItemDataById(items, folderData.id) as DragFilesTreeType.FolderItem

        // Скопировать данные папки
        const folderDataCopy: DragFilesTreeType.FolderItem = {...thisFolderData}

        // Раскрыть папку
        folderDataCopy.open = true

        // Поставить пустой массив content если в папке его нет
        if (!folderDataCopy.content) {
            folderDataCopy.content = []
        }

        // Поставить в него новый элемент
        newItem = createNewFolder(after, items)
        folderDataCopy.content.push( newItem )

        // Создать новый массив всех папок и файлов с учётом изменений
        newState = makeImmutableCopy(items, thisFolderData, folderDataCopy)
    }
    // Если папка не передана, то поставить новый элемент в корень
    else {
        // Скопировать корневой массив
        newState = items ? [...items] : []

        // Поставить в корневой массив новый элемент
        newItem = createNewFolder(after, items)
        newState.push( newItem )
    }

    // Возвратить созданный элемент и обновлённый массив папок и файлов
    return {
        newItem,
        newState
    }
}


/**
 * Функция добавляет новый файл в массив папок и файлов
 * @param {Object} folderData — данные папки
 * @param {Array} items — массив данных по папкам и файлам
 * @param {Object} after — объект с различными свойствами и методами переданными в параметрах FilesTree.
 */
export function addNewLoadingFile(
    folderData: null | DragFilesTreeType.FolderItem,
    items: DragFilesTreeType.Items,
    after: DragFilesTreeType.After,
) {
    let newItem: DragFilesTreeType.Item
    let newState: DragFilesTreeType.Items

    // Если папка передана, то поставить новый элемент внутрь папки
    if (folderData) {
        const thisFolderData = getItemDataById(items, folderData.id) as DragFilesTreeType.FolderItem

        // Скопировать данные папки
        const folderDataCopy = {...thisFolderData}

        // Раскрыть папку
        folderDataCopy.open = true

        // Поставить пустой массив content если в папке его нет
        if (!folderDataCopy.content) {
            folderDataCopy.content = []
        }

        // Поставить в него новый элемент
        newItem = createNewLoadingFile(after, items)
        folderDataCopy.content.unshift( newItem )

        // Создать новый массив всех папок и файлов с учётом изменений
        newState = makeImmutableCopy(items, thisFolderData, folderDataCopy)
    }
    // Если папка не передана, то поставить новый элемент в корень
    else {
        // Скопировать корневой массив
        newState = []
        if (items) newState = [...items]

        // Поставить в корневой массив новый элемент
        newItem = createNewLoadingFile(after, items)
        newState.unshift( newItem )
    }

    // Возвратить созданный элемент и обновлённый массив папок и файлов
    return {
        newItem,
        newState
    }
}

/**
 * Функция возвращает id раскрытых папок
 * @param {Array} items — массив данных по папкам и файлам
 * @param {Array} arr — массив с id открытых папок (требуется внутри работы функции, в саму функцию передавать не нужно)
 */
export function getOpenedFoldersId(items: DragFilesTreeType.Items, arr: DragFilesTreeType.FolderItemId[] = []): DragFilesTreeType.FolderItemId[] {
    items.forEach((item: DragFilesTreeType.Item) => {
        if (item.type === 'folder' && item.open) {
            arr.push(item.id)

            if (item.content) {
                getOpenedFoldersId(item.content, arr)
            }
        }
    })

    return arr
}

/**
 * Функция возвращает максимальную глубину вложенности файлов
 * @param {Array} items — массив с данными по папкам и файлам
 */
export function getMaxDeep(items: DragFilesTreeType.Items) {
    let maxDeep = 0

    function crawler(items: DragFilesTreeType.Items, prevDeep = -1) {
        items.forEach((item: DragFilesTreeType.Item) => {
            const currentDeep = prevDeep + 1
            if (maxDeep < currentDeep) maxDeep = currentDeep

            if (item.type === 'folder' && item.content) {
                crawler(item.content, currentDeep)
            }
        })
    }

    if (items) {
        crawler(items)
    }

    return maxDeep
}


/**
 * Функция получает массив с данными по папкам и файлам
 * и массив с идентификаторами папок, которые должны быть открыты,
 * и формирует массив где в данных папок, которые должны быть открыты,
 * ставит свойство open в true. Возвращает новый массив.
 * @param {Array} items — массив данных по папкам и файлам.
 * @param {Array} openFolderIds — id папок, которые должны быть изначально открыты
 */
export function addOpenPropToFolders(
    items: DragFilesTreeType.Items, openFolderIds: DragFilesTreeType.FolderItemId[]
): DragFilesTreeType.Items {
    return items.map(item => {
        const newItem: DragFilesTreeType.Item = {...item}

        if (newItem.type === 'folder' && openFolderIds.includes(newItem.id)) {
            newItem.open = true
        }

        if (newItem.type === 'folder' && newItem.content) {
            //@ts-ignore
            newItem.content = addOpenPropToFolders(item.content, openFolderIds)
        }

        return newItem
    })
}

/**
 * Функция выделяет элемент с переданным id и возвращает новый массив папок и файлов.
 * @param {Array} items — массив данных по папкам и файлам.
 * @param {String} itemId — id элемента, который должен быть выбран.
 */
export function selectItem(items: DragFilesTreeType.Items, itemId: DragFilesTreeType.ItemId) {
    // Уберу свойство active у всех элементов
    const itemsCopy = erasePropInItems(items, 'active')

    // Найду элемент, который нужно выделить
    const item = getItemDataById(itemsCopy, itemId)

    // Скопирую и поставлю выделяющее свойство
    const itemCopy = {...item, active: true}

    // Возвратить созданный элемент и обновлённый массив папок и файлов
    return {
        newItem: itemCopy,
        newItems: makeImmutableCopy(itemsCopy, item, itemCopy)
    }
}

/**
 * Функция выделяет элемент с переданным id и возвращает новый массив папок и файлов.
 * @param {Array} items — массив данных по папкам и файлам.
 * @param {String} itemId — id папки или файла, которую нужно выделить
 * @param {String} newName — новое название папки или файла
 */
export function changeName(items: DragFilesTreeType.Items, itemId: DragFilesTreeType.ItemId, newName: string) {
    // Скопировать оригинальный массив
    const itemsCopy = [...items]

    // Найду элемент, у которого нужно изменить имя
    const item = getItemDataById(itemsCopy, itemId)

    // Скопирую и поставлю переданное имя
    const itemCopy = {...item, name: newName}

    // Возвратить созданный элемент и обновлённый массив папок и файлов
    return {
        newItem: itemCopy,
        newItems: makeImmutableCopy(itemsCopy, item, itemCopy)
    }
}


/**
 * Функция возвращает массив идентификаторов файлов существующих в переданной папке
 * @param {Array} folders — массив всех папок
 * @param {Number} folderId — id папки в которой нужно найти идентификаторы файлов
 */
export function getFilesIdsInFolder(folders: DragFilesTreeType.Items, folderId: DragFilesTreeType.FolderItemId): number[] {
    const targetFolder = getItemDataById(folders, folderId)
    if (!targetFolder || targetFolder.type === 'file' || targetFolder.type === 'folder' && !targetFolder.content?.length) {
        return []
    }

    const ids: number[] = []

    findItems(targetFolder.content)

    function findItems(items: DragFilesTreeType.Items) {
        items.forEach(function (item) {
            if (item.type === 'file') {
                ids.push(item.id)
            }
            else if (item.content?.length) {
                findItems(item.content)
            }
        })
    }

    return ids
}
