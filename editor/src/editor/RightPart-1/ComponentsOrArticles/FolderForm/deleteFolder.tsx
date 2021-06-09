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
import messages from '../../messages'
import {
    componentsTreeStore,
    articlesTreeStore,
    setCompItems,
    setArtItems
} from '../stores'
import { FolderType } from '../types'


type ModalContentPropType = {
    type: FolderType // Тип списка папок: компоненты или статьи
}

export default function ModalContent(props: ModalContentPropType) {
    const { type } = props

    const dispatch = useDispatch()

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Массив папок и файлов из Хранилища
    const componentsItems = useStore(componentsTreeStore)
    const articlesItems = useStore(articlesTreeStore)

    // id папки или компонента, который должнен быть выделен
    const {currentCompItemId} = useSelector((store: AppState) => store.sites.componentsSection)
    const {currentArtItemId} = useSelector((store: AppState) => store.sites.articlesSection)

    // Функция удаляющая выделенную папку
    const deleteFolder = useCallback(function () {
        // Удалить папку из Хранилища и возвратить новый массив
        let newItems: FilesTreeType.Items
        if(type === 'components') {
            newItems = filesTreePublicMethods.deleteItem(componentsItems, currentCompItemId)
        } else if(type === 'articles') {
            newItems = filesTreePublicMethods.deleteItem(articlesItems, currentArtItemId)
        }

        // Сохранить новые данные в Хранилище
        if(type === 'components') setCompItems(newItems)
        else if(type === 'articles') setArtItems(newItems)

        // Сохранить новый массив папок и файлов на сервере
        saveItemsOnServer(type, newItems)

        // Обнулить свойство указывающее на uuid активного пункта в папках и шаблонах компонентах
        // потому что папка удалена
        if(type === 'components') {
            dispatch(actions.sites.setCurrentComp(null, null))
        } else if(type === 'articles') {
            dispatch(actions.sites.setCurrentArt(null, null))
        }

        // Закрыть модальное окно
        dispatch(actions.modal.closeModal())
    }, [])

    // Текст сообщения
    let text = messages.ComponentFolderForm.deleteFolderConfirmationTextInModal[lang]
    if(type === 'articles') {
        text = messages.ArticlesFolderForm.deleteFolderConfirmationTextInModal[lang]
    }

    // Текст на кнопке отмены
    let cancelBtnText = messages.ComponentFolderForm.closeDeleteFolderModalBtn[lang]
    if(type === 'articles') {
        cancelBtnText = messages.ArticlesFolderForm.closeDeleteFolderModalBtn[lang]
    }

    // Текст на кнопке удаления
    let deleteBtnText = messages.ComponentFolderForm.deleteFolderBtnInModal[lang]
    if(type === 'articles') {
        deleteBtnText = messages.ArticlesFolderForm.deleteFolderBtnInModal[lang]
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
