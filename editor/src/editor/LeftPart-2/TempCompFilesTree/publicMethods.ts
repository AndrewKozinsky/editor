import {
    getItemDataById,
    getOpenedFoldersUuid
} from './StoreManage/manageState'


/** Объект с публичными методами манипулирования Состояния Эффектора массива папок и файлов */
const filesTreePublicMethods = {
    // Функция находит в массиве объект данных с переданным id.
    getItemById: getItemDataById,
    getOpenedFoldersUuid
}

export default filesTreePublicMethods