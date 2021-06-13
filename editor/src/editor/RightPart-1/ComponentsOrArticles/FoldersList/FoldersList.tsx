// import React from 'react'
//@ts-ignore
// import {useStore} from 'effector-react'
// import { useSelector } from 'react-redux'
// import { AppState } from 'store/rootReducer'
// import FilesTree from 'libs/FilesTree/FilesTree/FilesTree'
// import messages from '../../messages'
// import { FolderType } from '../types'
/*import {
    useGetFoldersFromServerAndPutInEffector,
    afterCollapseFolder,
    useGetOnItemClick,
    afterAddingNewItem,
    saveItemsOnServer,
    afterDeleteItem
} from './FoldersList-func'*/
/*import {
    componentsTreeStore,
    articlesTreeStore,
    setCompItems,
    setArtItems
} from '../stores'*/


/*type FoldersListPropType = {
    type: FolderType // Тип списка папок: компоненты или статьи
}*/

/** Папки и файлы шаблонов компонентов выбранного сайта */
/*
export default function FoldersList(props: FoldersListPropType) {
    const { type } = props

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Получение с сервера порядка следования папок и установка в Эффектор
    useGetFoldersFromServerAndPutInEffector(type)

    // Папки компонентов из Эффектора
    let store = componentsTreeStore
    if(type === 'articles') store = articlesTreeStore
    const items = useStore(store)

    // Установщик Состояния папок
    let setItems = setCompItems
    if(type === 'articles') setItems = setArtItems

    // Название папки
    let newFolderName = messages.FoldersComponentsSection.createNewFolderBth[lang]
    if(type === 'articles') newFolderName = messages.FoldersArticlesSection.createNewFolderBth[lang]

    // Название файла
    let newFileName = messages.FoldersComponentsSection.createNewFileBth[lang]
    if(type === 'articles') newFileName = messages.FoldersArticlesSection.createNewFileBth[lang]

    // Обработчик щелчка по папке или файлу
    const onItemClick = useGetOnItemClick(type)

    return (
        <FilesTree
            items={items}
            setItems={setItems}
            newFolderName={newFolderName}
            newFileName={newFileName}
            afterAddingNewItem={(items, item) => afterAddingNewItem(type, items, item)}
            afterChangingTree={(items) => saveItemsOnServer(type, items)}
            afterCollapseFolder={(arrUuId) => afterCollapseFolder(type, arrUuId)}
            afterSelectItem={onItemClick}
            afterDeleteItem={(items, itemUuid) => afterDeleteItem(type, items, itemUuid)}
        />
    )
}*/
