var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods';
import putArtFolderRequest from 'requests/editor/artFolders/putArtFolderRequest';
import putCompFolderRequest from 'requests/editor/compFolders/putCompFolderRequest';
import { store } from 'store/rootReducer';
/**
 * Функция сохраняет массив папок на сервере
 * @param {String} type — тип папок: компонентов или статей.
 * @param {Array} items — массив папок и файлов.
 */
export default function saveFoldersOnServer(type, items) {
    return __awaiter(this, void 0, void 0, function* () {
        // Подготовить сохраняемый массив папок и файлов
        const preparedItems = filesTreePublicMethods.prepareItemsToSaveInServer(items);
        // Сохранить данные на сервере
        if (type === 'components') {
            const { compFolderId } = store.getState().sites.compFolderSection;
            yield putCompFolderRequest(compFolderId, preparedItems);
        }
        else {
            const { artFolderId } = store.getState().sites.artFolderSection;
            yield putArtFolderRequest(artFolderId, preparedItems);
        }
    });
}
//# sourceMappingURL=saveFoldersOnServer.js.map