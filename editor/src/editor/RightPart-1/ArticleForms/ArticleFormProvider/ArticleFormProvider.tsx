import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'store/rootReducer'
import ArticleForm from '../ArticleForm/ArticleForm'
import FolderForm from '../FolderForm/FolderForm'

/**
 * Компонент показывает или форму для редактирования папки
 * или для редактирования статьи в зависимости от выбранного элемента
 */
export default function ArticleFormProvider() {

    // Тип выбранного элемента в дереве папок и файлов
    const {currentArtItemType} = useSelector((store: AppState) => store.sites.articlesSection)

    if (currentArtItemType === 'folder') return <FolderForm />
    if (currentArtItemType === 'file') return <ArticleForm />
    return null
}
