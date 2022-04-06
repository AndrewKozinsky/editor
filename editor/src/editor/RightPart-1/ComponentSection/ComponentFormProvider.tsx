import React from 'react'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import CompForm from './CompForm/CompForm/CompForm'
import CompFolderForm from './CompFolderForm/FolderForm/CompFolderForm'


/**
 * Компонент показывает или форму для редактирования папки
 * или для редактирования компонента в зависимости от выбранного элемента
 */
export default function ComponentFormProvider() {

    // Тип выбранного элемента в дереве папок и файлов
    const { currentCompItemType } = useGetSitesSelectors().componentSection

    if (currentCompItemType === 'folder') return <CompFolderForm />
    else if (currentCompItemType === 'file') return <CompForm />
    return null
}
