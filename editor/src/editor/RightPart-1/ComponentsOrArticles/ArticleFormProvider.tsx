import React from 'react'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import ArtFolderForm from './ArtFolderForm/FolderForm/ArtFolderForm'
import ArtForm from './ArtForm/ArtForm/ArtForm'


/**
 * Компонент показывает или форму для редактирования папки
 * или для редактирования статьи в зависимости от выбранного элемента
 */
export default function ArticleFormProvider() {

    // Тип выбранного элемента в дереве папок и файлов
    const { currentArtItemType } = useGetSitesSelectors().articleSection

    if (currentArtItemType === 'folder') return <ArtFolderForm />
    if (currentArtItemType === 'file') return <ArtForm />
    return null
}
