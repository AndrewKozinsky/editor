var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            }
        }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import putArtFolderRequest from 'requests/editor/artFolders/putArtFolderRequest';
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods';
import { store } from 'store/rootReducer';
import putCompFolderRequest from 'requests/editor/compFolders/putCompFolderRequest';
// TODO Что делает эта функция?
export function addResource(category, folders) {
    return __awaiter(this, void 0, void 0, function* () {
        // Подготовить сохраняемый массив папок и файлов для сохранения на сервере
        const preparedFolders = filesTreePublicMethods.prepareItemsToSaveInServer(folders);
        // Сохранить данные на сервере
        if (category === 'components') {
            const { compFolderId } = store.getState().sites.compFolderSection;
            yield putCompFolderRequest(compFolderId, preparedFolders);
            // Обновить папки компонентов у редактируемой статьи если отредактировали
            // папки компонентов сайта, к которому принадлежит редактируемая статья.
            this.updateTempCompFolders();
        }
        else if (category === 'articles') {
            const { artFolderId } = store.getState().sites.artFolderSection;
            yield putArtFolderRequest(artFolderId, preparedFolders);
        }
    });
}
//# sourceMappingURL=addResource.js.map
//# sourceMappingURL=addResource.js.map
//# sourceMappingURL=addResource.js.map