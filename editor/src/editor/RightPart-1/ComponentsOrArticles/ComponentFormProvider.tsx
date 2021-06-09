import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'store/rootReducer'
import ComponentForm from './ComponentForm/ComponentForm'
import FolderForm from './FolderForm/FolderForm'


/**
 * Компонент показывает или форму для редактирования папки
 * или для редактирования компонента в зависимости от выбранного элемента
 */
export default function ComponentFormProvider() {

    // Тип выбранного элемента в дереве папок и файлов
    const {currentCompItemType} = useSelector((store: AppState) => store.sites.componentsSection)

    if (currentCompItemType === 'folder') return <FolderForm type='components' />
    if (currentCompItemType === 'file') return <ComponentForm />
    return null
}