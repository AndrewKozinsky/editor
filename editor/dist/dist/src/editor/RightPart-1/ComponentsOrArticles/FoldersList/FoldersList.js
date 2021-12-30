import React from 'react';
import DragFilesTree from 'libs/DragFilesTree/DragFilesTree/DragFilesTree';
import { useGetFolders, useGetFoldersFromServerAndPutInStore, useGetSetFolders, afterCollapseFolder, useGetOnItemClick, afterAddingNewFile, saveFoldersOnServer, afterDeleteItem, useGetNewItemsName } from './FoldersList-func';
/** Папки и файлы шаблонов компонентов выбранного сайта */
export default function FoldersList(props) {
    const { type } = props;
    // Получение с сервера порядка следования папок и установка в Хранилище
    useGetFoldersFromServerAndPutInStore(type);
    // Папки компонентов или статей
    const folders = useGetFolders(type);
    // Установщик Состояния папок
    const setItems = useGetSetFolders(type);
    // Имена нового файла и папки при создании
    const [newFileName, newFolderName] = useGetNewItemsName(type);
    // Обработчик щелчка по папке или файлу
    const onItemClick = useGetOnItemClick(type);
    return (React.createElement(DragFilesTree, { items: folders, setItems: setItems, newFolderName: newFolderName, newFileName: newFileName, afterAddingNewFile: () => afterAddingNewFile(type, newFileName), afterChangingTree: (items) => saveFoldersOnServer(type, items), afterCollapseFolder: (arrId) => afterCollapseFolder(type, arrId), afterSelectItem: onItemClick, afterDeleteItem: (originalItems, newItems, item) => {
            afterDeleteItem(type, originalItems, newItems, item);
        } }));
}
//# sourceMappingURL=FoldersList.js.map
//# sourceMappingURL=FoldersList.js.map