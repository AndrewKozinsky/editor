import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'store/rootReducer'
import FilesTree from 'libs/FilesTree/FilesTree/FilesTree'
import {
    addNewFile,
    changeTreeHandler,
    collapseFolder,
    getOpenedFoldersUuId,
    useFetchComponentsOrder,
    useGetOnItemClick
} from './ComponentsList-func'
import messages from '../messages'


/** Папки и файлы шаблонов компонентов выбранного сайта */
export default function ComponentsList() {

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Получить с сервера порядок следования шаблонов компонентов и поставить в Хранилище
    useFetchComponentsOrder()

    // Порядок следования шаблонов компонентов из Хранилища
    const items = useSelector((store: AppState) => store.sites.componentsSection.order)

    // Обработчик щелчка по папке или файлу
    const onItemClick = useGetOnItemClick()

    return (
        <FilesTree
            items={items}
            newFolderName={messages.OrderComponentsSection.createNewFolderBth[lang]}
            newFileName={messages.OrderComponentsSection.createNewFileBth[lang]}
            openFolderIds={getOpenedFoldersUuId()}
            outAfterChangingTree={changeTreeHandler}
            outAfterAddingNewFile={addNewFile}
            outCollapseFolder={collapseFolder}
            outOnItemClick={onItemClick}
        />
    )
}