import React, {useCallback } from 'react'
import {useDispatch, useSelector} from 'react-redux'
//@ts-ignore
import {useStore} from 'effector-react'
import {AppState} from 'store/rootReducer'
import actions from 'store/rootAction'
import messages from '../../messages'
import Wrapper from 'common/Wrapper/Wrapper'
import Hr from 'common/misc/Hr/Hr'
import Button from 'src/common/formElements/Button/Button'
import {articlesTreeStore, setItems} from '../../ArticlesList/ArticlesList'
import filesTreePublicMethods from 'libs/FilesTree/publicMethods'
import {saveItemsOnServer} from '../../ArticlesList/ArticlesList-func'


export function ModalContent() {
    const dispatch = useDispatch()

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Массив папок и файлов из Хранилища
    const items = useStore(articlesTreeStore)
    // uuid выделенной папки
    const {currentArtItemId} = useSelector((store: AppState) => store.sites.articlesSection)

    // Функция удаляющая выделенную папку
    const deleteFolder = useCallback(function () {
        // Удалить папку из Хранилища и возвратить новый массив
        const newItems = filesTreePublicMethods.deleteItem(items, currentArtItemId)
        // Сохранить новые данные в Хранилище
        setItems(newItems)
        // Сохранить новый массив папок и файлов на сервере
        saveItemsOnServer(newItems)

        // Обнулить свойство указывающее на uuid активного пункта в папках и шаблонах компонентах
        // потому что папка удалена
        dispatch(actions.sites.setCurrentArt(null, null))

        // Закрыть модальное окно
        dispatch(actions.modal.closeModal())
    }, [])

    return (
        <>
            <p>{messages.ArticlesFolderForm.deleteFolderConfirmationTextInModal[lang]}</p>
            <Wrapper t={10}>
                <Hr/>
            </Wrapper>
            <Wrapper t={10} align='right' gap={10}>
                <Button
                    text={messages.ArticlesFolderForm.closeDeleteFolderModalBtn[lang]}
                    onClick={() => dispatch(actions.modal.closeModal())}
                />
                <Button
                    text={messages.ArticlesFolderForm.deleteFolderBtnInModal[lang]}
                    color='accent'
                    onClick={deleteFolder}
                />
            </Wrapper>
        </>
    )
}
