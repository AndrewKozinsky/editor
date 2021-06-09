import React from 'react'
//@ts-ignore
import {useStore} from 'effector-react'
import { useSelector } from 'react-redux'
import { AppState } from 'store/rootReducer'
//@ts-ignore
import {createEvent, createStore} from 'effector'
import FilesTree from 'libs/FilesTree/FilesTree/FilesTree'
import FilesTreeType from 'libs/FilesTree/types'
import {
    useGetFoldersFromServerAndPutInEffector,
    afterCollapseFolder,
    useGetOnItemClick,
    afterAddingNewItem,
    saveItemsOnServer,
    afterDeleteItem
} from './ComponentsList-func'
import messages from '../messages'


// Установщик нового Состояния с папками и файлами
export const setItems = createEvent()

// Создание Хранилища Эффектора где будут содержаться данные по папкам шаблонов компонентов
export const componentsTreeStore = createStore<null | FilesTreeType.Items>(null)
// Добавление экшена изменнеия Хранилища
componentsTreeStore
    .on(setItems, (state: null | FilesTreeType.Items, items: null | FilesTreeType.Items) => items)


/** Папки и файлы шаблонов компонентов выбранного сайта */
export default function ComponentsList() {

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Получение с сервера порядка следования шаблонов компонентов
    // и установка в Эффектор
    useGetFoldersFromServerAndPutInEffector()

    // Папки компонентов из Эффектора
    const items = useStore(componentsTreeStore)

    // Обработчик щелчка по папке или файлу
    const onItemClick = useGetOnItemClick()

    return (
        <FilesTree
            items={items}
            setItems={setItems}
            newFolderName={messages.FoldersComponentsSection.createNewFolderBth[lang]}
            newFileName={messages.FoldersComponentsSection.createNewFileBth[lang]}
            afterAddingNewItem={afterAddingNewItem}
            afterChangingTree={saveItemsOnServer}
            afterCollapseFolder={afterCollapseFolder}
            afterSelectItem={onItemClick}
            afterDeleteItem={afterDeleteItem}
        />
    )
}