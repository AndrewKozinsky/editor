import React, {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
//@ts-ignore
import {useStore} from 'effector-react'
import {AppState} from 'store/rootReducer'
import FilesTreeType from 'libs/FilesTree/types';
import actions from 'store/rootAction'
import Wrapper from 'common/Wrapper/Wrapper'
import Hr from 'common/misc/Hr/Hr'
import Button from 'common/formElements/Button/Button'
import { saveItemsOnServer } from '../FoldersList/FoldersList-func'
import filesTreePublicMethods from 'libs/FilesTree/publicMethods'
import {
    componentsTreeStore,
    articlesTreeStore,
    setCompItems,
    setArtItems
} from '../stores'
import { FolderType } from '../types'
import { componentFolderFormMessages } from 'messages/componentFolderFormMessages'
import { articleFolderFormMessages } from 'messages/articleFolderFormMessages'


type ModalContentPropType = {
    type: FolderType // Тип списка папок: компоненты или статьи
}

export default function ModalContent(props: ModalContentPropType) {
    const { type } = props

    const dispatch = useDispatch()

    // Массив папок и файлов из Хранилища
    const componentsItems = useStore(componentsTreeStore)
    const articlesItems = useStore(articlesTreeStore)

    // id папки или компонента, который должнен быть выделен
    const {currentCompItemId} = useSelector((store: AppState) => store.sites.componentsSection)
    const {currentArtItemId} = useSelector((store: AppState) => store.sites.articlesSection)

    // Функция удаляющая выделенную папку
    const deleteFolder = useCallback(function () {

        if(type === 'components') {
            // Удалить папку из Хранилища и возвратить новый массив
            const newItems = filesTreePublicMethods.deleteItem(componentsItems, currentCompItemId)
            // Сохранить новые данные в Хранилище
            setCompItems(newItems)
            // Сохранить новый массив папок и файлов на сервере
            saveItemsOnServer(type, newItems)
            // Обнулить свойство указывающее на uuid активного пункта в папках и шаблонах компонентах
            // потому что папка удалена
            dispatch(actions.sites.setCurrentComp(null, null))
        } else if(type === 'articles') {
            const newItems = filesTreePublicMethods.deleteItem(articlesItems, currentArtItemId)
            setArtItems(newItems)
            saveItemsOnServer(type, newItems)
            dispatch(actions.sites.setCurrentArt(null, null))
        }

        // Закрыть модальное окно
        dispatch(actions.modal.closeModal())
    }, [])

    // Текст сообщения
    let text = componentFolderFormMessages.deleteFolderConfirmationTextInModal
    if(type === 'articles') {
        text = articleFolderFormMessages.deleteFolderConfirmationTextInModal
    }

    // Текст на кнопке отмены
    let cancelBtnText = componentFolderFormMessages.closeDeleteFolderModalBtn
    if(type === 'articles') {
        cancelBtnText = articleFolderFormMessages.closeDeleteFolderModalBtn
    }

    // Текст на кнопке удаления
    let deleteBtnText = componentFolderFormMessages.deleteFolderBtnInModal
    if(type === 'articles') {
        deleteBtnText = articleFolderFormMessages.deleteFolderBtnInModal
    }

    return (
        <>
            <p>{text}</p>
            <Wrapper t={10}>
                <Hr/>
            </Wrapper>
            <Wrapper t={10} align='right' gap={10}>
                <Button
                    text={cancelBtnText}
                    onClick={() => dispatch(actions.modal.closeModal())}
                />
                <Button
                    text={deleteBtnText}
                    color='accent'
                    onClick={deleteFolder}
                />
            </Wrapper>
        </>
    )
}
