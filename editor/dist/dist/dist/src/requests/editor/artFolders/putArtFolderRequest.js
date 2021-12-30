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
const JSON5 = require('json5');
import { makeFetch } from 'requests/reqFn/fetch';
import getApiUrl from 'requests/reqFn/apiUrls';
/**
 * Функция отправляет данные для входа пользователя в редактор
 * @param {Number} artFolderId — id папки с компонентами
 * @param {Array} folders — массив папок статей
 */
export default function putArtFolderRequest(artFolderId, folders) {
    return __awaiter(this, void 0, void 0, function* () {
        const jsonItems = JSON5.stringify(folders);
        const options = {
            method: 'PATCH',
            body: JSON.stringify({ content: jsonItems })
        };
        const rowResponse = yield makeFetch(getApiUrl('artFolder', artFolderId), options);
        // При успешном ответе нужно превратить данные папок с компонентами из строк в массив объектов.
        // За это отвечает код ниже.
        if (rowResponse.status === 'success') {
            try {
                // Составление массива объектов из массива строк
                const parsedFolders = rowResponse.data.artFolders.map(folderData => {
                    return Object.assign(Object.assign({}, folderData), { content: JSON5.parse(folderData.content) });
                });
                // Собрать новый объект ответа сервера с объектами полученными из строк
                let response = Object.assign(Object.assign({}, rowResponse), { data: {
                        artFolders: parsedFolders
                    } });
                return response;
            }
            catch (err) { }
        }
        else if (rowResponse.status === 'fail') {
            return rowResponse;
        }
    });
}
//# sourceMappingURL=putArtFolderRequest.js.map
//# sourceMappingURL=putArtFolderRequest.js.map
//# sourceMappingURL=putArtFolderRequest.js.map