import FilesTreeType from './types';
import {
    changeName,
    deleteItem,
    getItemDataById,
    prepareItemsToSaveInServer,
    setItems
} from './StoreManage/manageState'
import {removeItem} from './Item/Item-func'

/**
 * Объект с публичными методами манипулирования Состояния Эффектора массива папок и файлов
 */
const filesTreePublicMethods = {
    // Установка элементов в Хранилище Эффектора
    setItems,
    // Метод изменяет имя у элемента с переданным id
    changeItemName: changeName,
    // Функция удаляет элемент из массива папок и файлов и возвращает новый массив
    deleteItem,
    // Функция находит в массиве объект данных с переданным id.
    getItemById: getItemDataById,
    prepareItemsToSaveInServer: prepareItemsToSaveInServer
}

export default filesTreePublicMethods