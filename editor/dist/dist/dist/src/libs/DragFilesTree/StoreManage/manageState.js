import makeImmutableCopy from 'libs/makeImmutableCopy/makeImmutableCopy';
/**
 * Функция разворачивающая/сворачивающая папку.
 * @param {Array} items — массив данных по папкам и файлам.
 * @param {String} folderId — id папки, которую нужно расвернуть/свернуть
 */
export function toggleFolder(items, folderId) {
    // Получение папки с заданным идентификатором
    const folder = getItemDataById(items, folderId);
    if (!folder || folder.type !== 'folder')
        return;
    // Перевернуть значение открыта ли папка
    const folderCopy = Object.assign(Object.assign({}, folder), { open: !(folder.open) });
    // Создание нового массива папок и файлов
    return makeImmutableCopy(items, folder, folderCopy);
}
/**
 * Функция находит в массиве объект данных с переданным id.
 * @param {Array} items — массив данных по папкам и файлам.
 * @param {String} itemId — id папки или файла, которую нужно найти
 */
export function getItemDataById(items, itemId) {
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.id === itemId) {
            return item;
        }
        else if (item.type === 'folder' && item.content) {
            const foundedItem = getItemDataById(item.content, itemId);
            if (foundedItem)
                return foundedItem;
        }
    }
    return null;
}
/**
 * Функция возвращает булево значение имеет ли папка вложенный элемент
 * @param {Object} folderData — данные папки где возможно есть указанный вложенный элемент
 * @param {String} itemId — id элемента, который возможно есть в указанной папке
 */
export function hasFolderAnItem(folderData, itemId) {
    if (folderData.type === 'folder' && folderData.content) {
        return Boolean(getItemDataById(folderData.content, itemId));
    }
    return false;
}
/**
 * Функция вставляющая указатель помещения перетаскиваемого элемента
 * Возвращает новый массив папок и файлов
 * @param {Array} items — массив данных по папкам и файлам
 * @param {String} itemId — id элемента под которым находится курсор
 * @param {String} place — место, которое нужно подсветить. Три варианта: 'after' | 'inside' | 'before'
 */
export function showPlaceMark(items, itemId, place) {
    // Стереть имеющиеся метки
    const itemsCopy = erasePropInItems(items, 'placeMark');
    // Получение папки/файла с заданным идентификатором
    const item = getItemDataById(itemsCopy, itemId);
    if (!item)
        return;
    // Поставить новое значение свойству placeMark
    const itemCopy = Object.assign(Object.assign({}, item), { placeMark: place });
    // Создание и возвращение нового массива элементов
    return makeImmutableCopy(itemsCopy, item, itemCopy);
}
/**
 * Рекурсивная функция проходит по всем элементам массива items и у каждого элемента
 * удаляет свойство placeMark где написана позиция на которой должен быть подсвечивающая линия
 * @param {Array} items — массив данных по папкам и файлам
 * @param {String} propName — имя свойства, значение которого нужно удалить
 */
function erasePropInItems(items, propName) {
    return items.map(item => {
        const newItem = Object.assign({}, item);
        //@ts-ignore
        delete newItem[propName];
        if (newItem.type === 'folder' && newItem.content) {
            newItem.content = erasePropInItems(newItem.content, propName);
        }
        return newItem;
    });
}
/**
 * Функция помещает указанный элемент в другую часть дерева папок и файлов и обновляет Состояние
 * @param {String} movedItemId — id перемещаемого элемента
 * @param {String} anchorItemId — id элемента относительно которого будет позиционироваться перемещаемый элемент
 * @param {String} position — позиция перемещаемого элемента относительно якорного
 * @param {Array} items — массив данных по папкам и файлам
 */
export function moveItemTo(movedItemId, anchorItemId, position, items) {
    // Получение данных перемещаемого объекта по его id
    const movedItem = getItemDataById(items, movedItemId);
    if (!movedItem)
        return;
    // Удалить перемещаемый элемент и возвратить массив папок без него
    let itemsCopy = deleteItem(items, movedItemId);
    // Поставить перемещаемый элемент в указанное место и возвратить новый массив
    itemsCopy = addItem(itemsCopy, movedItem, anchorItemId, position);
    // Стереть имеющиеся метки и возвратить новый массив папок и файлов
    return erasePropInItems(itemsCopy, 'placeMark');
}
/**
 * Функция удаляет папку или файл с переданным id из массива папок и файлов и возвращает новый массив
 * @param {Array} items — массив папок и файлов
 * @param {String} itemId — id папки или файла, который нужно найти и удалить
 */
export function deleteItem(items, itemId) {
    // Найду массив в котором находится удаляемая папка или файл
    let itemsArr = getParentArray(items, itemId);
    if (!itemsArr)
        return;
    // Получить индекс удаляемого элемента в массиве parentArr
    const itemIdx = itemsArr.findIndex((elem) => elem.id === itemId);
    if (itemIdx < 0)
        return;
    const newItemsArr = [...itemsArr];
    newItemsArr.splice(itemIdx, 1);
    return makeImmutableCopy(items, itemsArr, newItemsArr);
}
/**
 * Функция добавляет папку или файл в указанное место в массиве папок и файлов
 * @param {Array} items — массив данных по папкам и файлам
 * @param {Object} movedItem — данные элемента, который нужно добавить в другое место
 * @param {String} anchorItemId — id элемента относительно которого будет вставлен новый элемент
 * @param {String} position — в какую позицию относительно якорного элемента поставить новый элемент
 */
function addItem(items, movedItem, anchorItemId, position) {
    // Найду массив в котором находится якорная папка или файл
    let itemsArr = getParentArray(items, anchorItemId);
    if (!itemsArr)
        return;
    // Получить индекс якорного элемента в массиве parentArr
    const anchorIdx = itemsArr.findIndex(elem => elem.id === anchorItemId);
    if (anchorIdx < 0)
        return;
    if (position === 'before') {
        const newItemsArr = [...itemsArr];
        newItemsArr.splice(anchorIdx, 0, movedItem);
        return makeImmutableCopy(items, itemsArr, newItemsArr);
    }
    else if (position === 'after') {
        const newItemsArr = [...itemsArr];
        newItemsArr.splice(anchorIdx + 1, 0, movedItem);
        return makeImmutableCopy(items, itemsArr, newItemsArr);
    }
    else if (position === 'inside' && itemsArr[anchorIdx].type === 'folder') {
        // @ts-ignore
        if (itemsArr[anchorIdx].content) {
            // @ts-ignore
            const contentArr = itemsArr[anchorIdx].content;
            const contentArrCopy = [movedItem, ...contentArr];
            return makeImmutableCopy(items, contentArr, contentArrCopy);
        }
        else {
            const anchorObj = itemsArr[anchorIdx];
            const anchorObjCopy = Object.assign({}, anchorObj);
            // @ts-ignore
            anchorObjCopy.content = [movedItem];
            return makeImmutableCopy(items, anchorObj, anchorObjCopy);
        }
    }
    return items;
}
/**
 * Функция возвращает массив, в котором содержится папка или файл с переданным id
 * @param {Array} items — массив папок и файлов
 * @param {String} itemId — id папки или файла у которого нужно найти родительскую папку
 */
export function getParentArray(items, itemId) {
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (items[i].id === itemId) {
            return items;
        }
        else if (item.type === 'folder' && item.content) {
            const foundedItem = getParentArray(item.content, itemId);
            if (foundedItem)
                return foundedItem;
        }
    }
    return null;
}
/**
 * Функция создаёт новую пустую папку или файл
 * @param {Object} after — объект с различными свойствами и методами переданными в параметрах FilesTree.
 * @param {Array} items — массив папок и файлов
 */
export function createNewFolder(after, items) {
    // Идентификатор новой папки. Номера идут по-порядку.
    const id = getFolderNextId(items);
    const name = after.newFolderName;
    const newFolder = {
        type: 'folder',
        id,
        name // Имя файла или папки
    };
    return newFolder;
}
/**
 * Функция создаёт новую пустую папку или файл
 * @param {Object} after — объект с различными свойствами и методами переданными в параметрах FilesTree.
 * @param {Array} items — массив папок и файлов
 */
export function createNewLoadingFile(after, items) {
    const newItem = {
        id: 1000000000 + Math.round(Math.random() * 1000),
        type: 'file',
        name: after.newFileName,
        loading: true
    };
    return newItem;
}
/**
 * Функция анализирует массив папок и файлов и возвращает следующий id для создаваемой папки
 * @param {Array} items — массив папок и файлов
 */
function getFolderNextId(items) {
    let maxId = 0;
    function maxIdFinder(elems) {
        if (!elems || !elems.length)
            return;
        for (let i = 0; i < elems.length; i++) {
            if (elems[i].type == 'file')
                continue;
            const strId = elems[i].id.toString().slice(7);
            const numId = parseInt(strId);
            if (numId > maxId) {
                maxId = numId;
                // @ts-ignore
                if (elems[i].content) {
                    // @ts-ignore
                    maxIdFinder(elems[i].content);
                }
            }
        }
    }
    maxIdFinder(items);
    return 'folder_' + (maxId + 1);
}
/**
 * Функция готовит массив папок и файлов для сохранения на сервере: убирает лишние детали.
 * @param {Array} items — массив папок и файлов
 */
export function prepareItemsToSaveInServer(items) {
    return items.map(item => {
        const newItem = Object.assign({}, item);
        delete newItem.placeMark;
        // @ts-ignore
        delete newItem.open;
        delete newItem.active;
        // @ts-ignore
        delete newItem.loading;
        // @ts-ignore
        if (newItem.content) {
            // @ts-ignore
            newItem.content = prepareItemsToSaveInServer(newItem.content);
        }
        return newItem;
    });
}
/**
 * Функция добавляет новую папку в массив папок и файлов
 * @param {Object} folderData — данные папки
 * @param {Array} items — массив данных по папкам и файлам
 * @param {Object} after — объект с различными свойствами и методами переданными в параметрах FilesTree.
 */
export function addNewFolder(folderData, items, after) {
    let newItem;
    let newState;
    // Если папка передана, то поставить новый элемент внутрь папки
    if (folderData) {
        const thisFolderData = getItemDataById(items, folderData.id);
        // Скопировать данные папки
        const folderDataCopy = Object.assign({}, thisFolderData);
        // Раскрыть папку
        folderDataCopy.open = true;
        // Поставить пустой массив content если в папке его нет
        if (!folderDataCopy.content) {
            folderDataCopy.content = [];
        }
        // Поставить в него новый элемент
        newItem = createNewFolder(after, items);
        folderDataCopy.content.unshift(newItem);
        // Создать новый массив всех папок и файлов с учётом изменений
        newState = makeImmutableCopy(items, thisFolderData, folderDataCopy);
    }
    // Если папка не передана, то поставить новый элемент в корень
    else {
        // Скопировать корневой массив
        newState = items ? [...items] : [];
        // Поставить в корневой массив новый элемент
        newItem = createNewFolder(after, items);
        newState.unshift(newItem);
    }
    // Возвратить созданный элемент и обновлённый массив папок и файлов
    return {
        newItem,
        newState
    };
}
/**
 * Функция добавляет новый файл в массив папок и файлов
 * @param {Object} folderData — данные папки
 * @param {Array} items — массив данных по папкам и файлам
 * @param {Object} after — объект с различными свойствами и методами переданными в параметрах FilesTree.
 */
export function addNewLoadingFile(folderData, items, after) {
    let newItem;
    let newState;
    // Если папка передана, то поставить новый элемент внутрь папки
    if (folderData) {
        const thisFolderData = getItemDataById(items, folderData.id);
        // Скопировать данные папки
        const folderDataCopy = Object.assign({}, thisFolderData);
        // Раскрыть папку
        folderDataCopy.open = true;
        // Поставить пустой массив content если в папке его нет
        if (!folderDataCopy.content) {
            folderDataCopy.content = [];
        }
        // Поставить в него новый элемент
        newItem = createNewLoadingFile(after, items);
        folderDataCopy.content.unshift(newItem);
        // Создать новый массив всех папок и файлов с учётом изменений
        newState = makeImmutableCopy(items, thisFolderData, folderDataCopy);
    }
    // Если папка не передана, то поставить новый элемент в корень
    else {
        // Скопировать корневой массив
        newState = [];
        if (items)
            newState = [...items];
        // Поставить в корневой массив новый элемент
        newItem = createNewLoadingFile(after, items);
        newState.unshift(newItem);
    }
    // Возвратить созданный элемент и обновлённый массив папок и файлов
    return {
        newItem,
        newState
    };
}
/**
 * Функция возвращает id раскрытых папок
 * @param {Array} items — массив данных по папкам и файлам
 * @param {Array} arr — массив с id открытых папок (требуется внутри работы функции, в саму функцию передавать не нужно)
 */
export function getOpenedFoldersId(items, arr = []) {
    items.forEach((item) => {
        if (item.type === 'folder' && item.open) {
            arr.push(item.id);
            if (item.content) {
                getOpenedFoldersId(item.content, arr);
            }
        }
    });
    return arr;
}
/**
 * Функция возвращает максимальную глубину вложенности файлов
 * @param {Array} items — массив с данными по папкам и файлам
 */
export function getMaxDeep(items) {
    let maxDeep = 0;
    function crawler(items, prevDeep = -1) {
        items.forEach((item) => {
            const currentDeep = prevDeep + 1;
            if (maxDeep < currentDeep)
                maxDeep = currentDeep;
            if (item.type === 'folder' && item.content) {
                crawler(item.content, currentDeep);
            }
        });
    }
    if (items) {
        crawler(items);
    }
    return maxDeep;
}
/**
 * Функция получает массив с данными по папкам и файлам
 * и массив с идентификаторами папок, которые должны быть открыты,
 * и формирует массив где в данных папок, которые должны быть открыты,
 * ставит свойство open в true. Возвращает новый массив.
 * @param {Array} items — массив данных по папкам и файлам.
 * @param {Array} openFolderIds — id папок, которые должны быть изначально открыты
 */
export function addOpenPropToFolders(items, openFolderIds) {
    return items.map(item => {
        const newItem = Object.assign({}, item);
        if (newItem.type === 'folder' && openFolderIds.includes(newItem.id)) {
            newItem.open = true;
        }
        if (newItem.type === 'folder' && newItem.content) {
            //@ts-ignore
            newItem.content = addOpenPropToFolders(item.content, openFolderIds);
        }
        return newItem;
    });
}
/**
 * Функция выделяет элемент с переданным id и возвращает новый массив папок и файлов.
 * @param {Array} items — массив данных по папкам и файлам.
 * @param {String} itemId — id элемента, который должен быть выбран.
 */
export function selectItem(items, itemId) {
    // Уберу свойство active у всех элементов
    const itemsCopy = erasePropInItems(items, 'active');
    // Найду элемент, который нужно выделить
    const item = getItemDataById(itemsCopy, itemId);
    // Скопирую и поставлю выделяющее свойство
    const itemCopy = Object.assign(Object.assign({}, item), { active: true });
    // Возвратить созданный элемент и обновлённый массив папок и файлов
    return {
        newItem: itemCopy,
        newItems: makeImmutableCopy(itemsCopy, item, itemCopy)
    };
}
/**
 * Функция выделяет элемент с переданным id и возвращает новый массив папок и файлов.
 * @param {Array} items — массив данных по папкам и файлам.
 * @param {String} itemId — id папки или файла, которую нужно выделить
 * @param {String} newName — новое название папки или файла
 */
export function changeName(items, itemId, newName) {
    // Скопировать оригинальный массив
    const itemsCopy = [...items];
    // Найду элемент, у которого нужно изменить имя
    const item = getItemDataById(itemsCopy, itemId);
    // Скопирую и поставлю переданное имя
    const itemCopy = Object.assign(Object.assign({}, item), { name: newName });
    // Возвратить созданный элемент и обновлённый массив папок и файлов
    return {
        newItem: itemCopy,
        newItems: makeImmutableCopy(itemsCopy, item, itemCopy)
    };
}
/**
 * Функция возвращает массив идентификаторов файлов существующих в переданной папке
 * @param {Array} folders — массив всех папок
 * @param {Number} folderId — id папки в которой нужно найти идентификаторы файлов
 */
export function getFilesIdsInFolder(folders, folderId) {
    var _a;
    const targetFolder = getItemDataById(folders, folderId);
    if (!targetFolder || targetFolder.type === 'file' || targetFolder.type === 'folder' && !((_a = targetFolder.content) === null || _a === void 0 ? void 0 : _a.length)) {
        return [];
    }
    const ids = [];
    findItems(targetFolder.content);
    function findItems(items) {
        items.forEach(function (item) {
            var _a;
            if (item.type === 'file') {
                ids.push(item.id);
            }
            else if ((_a = item.content) === null || _a === void 0 ? void 0 : _a.length) {
                findItems(item.content);
            }
        });
    }
    return ids;
}
//# sourceMappingURL=manageState.js.map
//# sourceMappingURL=manageState.js.map
//# sourceMappingURL=manageState.js.map