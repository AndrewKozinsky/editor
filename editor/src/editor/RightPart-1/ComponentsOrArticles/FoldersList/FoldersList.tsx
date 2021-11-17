import React from 'react'
import DragFilesTree from 'libs/DragFilesTree/DragFilesTree/DragFilesTree'
import { FolderType } from '../types'
import {
    useGetFolders,
    useGetFoldersFromServerAndPutInStore,
    useGetSetFolders,
    afterCollapseFolder,
    useGetOnItemClick,
    afterAddingNewFile,
    saveFoldersOnServer,
    afterDeleteItem, useGetNewItemsName
} from './FoldersList-func'
import DragFilesTreeType from 'libs/DragFilesTree/types'
import useGetMessages from 'messages/fn/useGetMessages'
import { compFoldersSectionMessages } from 'messages/compFoldersSectionMessages'
/*import {
    componentsTreeStore,
    articlesTreeStore,
    setCompItems,
    setArtItems
} from '../stores'*/
// import { foldersArticlesSectionMessages } from 'messages/foldersArticlesSectionMessages'


type FoldersListPropType = {
    type: FolderType // Тип списка папок: компоненты или статьи
}

/** Папки и файлы шаблонов компонентов выбранного сайта */
export default function FoldersList(props: FoldersListPropType) {
    const { type } = props

    // Получение с сервера порядка следования папок и установка в Хранилище
    useGetFoldersFromServerAndPutInStore(type)

    // Папки компонентов или статей
    const folders = useGetFolders(type)

    // Установщик Состояния папок
    const setItems = useGetSetFolders(type)

    // Имена нового файла и папки при создании
    const [newFileName, newFolderName] = useGetNewItemsName(type)

    // Обработчик щелчка по папке или файлу
    const onItemClick = useGetOnItemClick(type)


    return (
        <DragFilesTree
            items={folders}
            setItems={setItems}
            newFolderName={newFolderName}
            newFileName={newFileName}
            afterAddingNewFile={() => afterAddingNewFile(type)}
            afterChangingTree={(items) => saveFoldersOnServer(type, items)}
            afterCollapseFolder={(arrUuId) => afterCollapseFolder(type, arrUuId)}
            afterSelectItem={onItemClick}
            afterDeleteItem={(items, itemId) => afterDeleteItem(type, items, itemId)}
        />
    )
}
