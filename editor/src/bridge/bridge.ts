import { addResource } from './methods/addResource'
import { deleteResource } from './methods/deleteResource'
import saveFoldersOnServer from './methods/saveFoldersOnServer'
import {
    clearEditableArticle,
    updateTempCompFolders,
    updateTempComps,
    updateSiteTemp
} from './methods/updateTempCompFolders'

// TODO Что делает эта функция?
class Bridge {
    // Добавление папки с компонентами или статьями, или компонента, или статьи
    addResource = addResource
    // Удаление папки с компонентами или статьями, или компонента, или статьи
    deleteResource = deleteResource
    // Сохранение массива папок с компонентами или статьями на сервере
    saveFoldersOnServer = saveFoldersOnServer
    // Обновление хеша версии у папок компонентов в редактируемой статье.
    // Это приведёт к перекачке массива папок компонентов
    updateTempCompFolders = updateTempCompFolders
    updateTempComps = updateTempComps
    updateSiteTemp = updateSiteTemp
    // Очистка статьи если её id совпадает с переданным id
    clearEditableArticle = clearEditableArticle
}

export default new Bridge()