import React from 'react'
//@ts-ignore
import {useStore} from 'effector-react'
import { useSelector } from 'react-redux'
import { AppState } from 'store/rootReducer'
//@ts-ignore
import {createStore} from 'effector'
import FilesTree from 'libs/FilesTree/FilesTree/FilesTree'
import {setItems} from 'libs/FilesTree/StoreManage/manageState'
import {
    useGetFoldersFromServerAndPutInEffector,
    afterCollapseFolder,
    useGetOnItemClick,
    afterAddingNewItem,
    saveItemsOnServer,
} from './ComponentsList-func'
import messages from '../messages'
import FilesTreeType from 'libs/FilesTree/types'



export const componentsTreeStore = createStore<null | FilesTreeType.Items>(null)
componentsTreeStore
    .on(setItems, (state: null | FilesTreeType.Items, items: null | FilesTreeType.Items) => {
        return items
    })


/** Папки и файлы шаблонов компонентов выбранного сайта */
export default function ComponentsList() {

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Получение с сервера порядка следования шаблонов компонентов
    // и установка в Эффектор
    useGetFoldersFromServerAndPutInEffector()

    // Порядок из Эффектора
    const items = useStore(componentsTreeStore)

    // Обработчик щелчка по папке или файлу
    const onItemClick = useGetOnItemClick()

    return (
        <FilesTree
            items={items}
            newFolderName={messages.FoldersComponentsSection.createNewFolderBth[lang]}
            newFileName={messages.FoldersComponentsSection.createNewFileBth[lang]}
            afterAddingNewItem={afterAddingNewItem}
            afterChangingTree={saveItemsOnServer}
            afterCollapseFolder={afterCollapseFolder}
            afterSelectItem={onItemClick}
            afterDeleteItem={saveItemsOnServer}
        />
    )
}