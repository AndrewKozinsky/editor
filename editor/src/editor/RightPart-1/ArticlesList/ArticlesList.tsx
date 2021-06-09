import React from 'react'
//@ts-ignore
import {createEvent, createStore} from 'effector'
//@ts-ignore
import {useStore} from 'effector-react'
import { useSelector } from 'react-redux'
import { AppState } from 'store/rootReducer'
import FilesTree from 'libs/FilesTree/FilesTree/FilesTree'
import FilesTreeType from 'libs/FilesTree/types'
import {
    useGetFoldersFromServerAndPutInEffector,
    afterCollapseFolder,
    useGetOnItemClick,
    afterAddingNewItem,
    saveItemsOnServer,
    afterDeleteItem
} from './ArticlesList-func'
import messages from '../messages'


// Установщик нового Состояния с папками и файлами
export const setItems = createEvent()

// Создание Хранилища Эффектора где будут содержаться данные по папкам шаблонов компонентов
export const articlesTreeStore = createStore<null | FilesTreeType.Items>(null)
// Добавление экшена изменнеия Хранилища
articlesTreeStore
    .on(setItems, (state: null | FilesTreeType.Items, items: null | FilesTreeType.Items) => items)


/** Папки и файлы шаблонов компонентов выбранного сайта */
export default function ArticlesList() {

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Получение с сервера папок со статьями и установка в Эффектор
    useGetFoldersFromServerAndPutInEffector()

    // Папки статей из Эффектора
    const items = useStore(articlesTreeStore)

    // Обработчик щелчка по папке или файлу
    const onItemClick = useGetOnItemClick()

    return (
        <FilesTree
            items={items}
            setItems={setItems}
            newFolderName={messages.FoldersArticlesSection.createNewFolderBth[lang]}
            newFileName={messages.FoldersArticlesSection.createNewFileBth[lang]}
            afterAddingNewItem={afterAddingNewItem}
            afterChangingTree={saveItemsOnServer}
            afterCollapseFolder={afterCollapseFolder}
            afterSelectItem={onItemClick}
            afterDeleteItem={afterDeleteItem}
        />
    )
}
