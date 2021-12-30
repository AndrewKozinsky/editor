import { addResource } from './methods/addResource';
import { deleteResource } from './methods/deleteResource';
import saveFoldersOnServer from './methods/saveFoldersOnServer';
import { clearEditableArticle, updateTempCompFolders, updateTempComps, updateSiteTemp } from './methods/updateTempCompFolders';
// TODO Что делает эта функция?
class Bridge {
    constructor() {
        // Добавление папки с компонентами или статьями, или компонента, или статьи
        this.addResource = addResource;
        // Удаление папки с компонентами или статьями, или компонента, или статьи
        this.deleteResource = deleteResource;
        // Сохранение массива папок с компонентами или статьями на сервере
        this.saveFoldersOnServer = saveFoldersOnServer;
        // Обновление хеша версии у папок компонентов в редактируемой статье.
        // Это приведёт к перезакачке массива папок компонентов
        this.updateTempCompFolders = updateTempCompFolders;
        this.updateTempComps = updateTempComps;
        this.updateSiteTemp = updateSiteTemp;
        // Очистка статьи если её id совпадает с переданным id
        this.clearEditableArticle = clearEditableArticle;
    }
}
export default new Bridge();
//# sourceMappingURL=bridge.js.map
//# sourceMappingURL=bridge.js.map
//# sourceMappingURL=bridge.js.map