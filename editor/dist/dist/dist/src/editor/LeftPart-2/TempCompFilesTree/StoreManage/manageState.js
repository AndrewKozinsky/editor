import makeImmutableCopy from 'libs/makeImmutableCopy/makeImmutableCopy';
/**
 * Функция разворачивающая/сворачивающая папку.
 * @param {Array} items — массив данных по папкам и файлам.
 * @param {String} folderId — id папки, которую нужно расвернуть/свернуть
 */
export function toggleFolder(items, folderId) {
    // Получение папки с заданным идентификатором
    const folder = getItemDataById(items, folderId);
    if (!folder)
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
//# sourceMappingURL=manageState.js.map
//# sourceMappingURL=manageState.js.map
//# sourceMappingURL=manageState.js.map