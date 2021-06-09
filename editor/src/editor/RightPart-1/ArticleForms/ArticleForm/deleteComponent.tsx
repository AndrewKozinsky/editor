import React, {ReactElement, useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
//@ts-ignore
import {useStore} from 'effector-react'
import {AppState} from 'store/rootReducer'
import actions from 'store/rootAction'
import messages from '../../messages'
import Wrapper from 'common/Wrapper/Wrapper'
import Hr from 'common/misc/Hr/Hr'
import Button from 'common/formElements/Button/Button'
import {articlesTreeStore, setItems} from '../../ArticlesList/ArticlesList'
import filesTreePublicMethods from 'libs/FilesTree/publicMethods'
import {saveItemsOnServer} from '../../ArticlesList/ArticlesList-func'
import {makeFetch} from 'requests/fetch'
import getApiUrl from 'requests/apiUrls'


export function ModalContent() {
    const dispatch = useDispatch()

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Массив папок и файлов из Хранилища
    const items = useStore(articlesTreeStore)

    // uuid выделенной папки
    const {currentArtItemId} = useSelector((store: AppState) => store.sites.articlesSection)

    // Функция удаляющая выделенную папку
    const deleteArticle = useCallback(function () {
        // Удалить статью из Хранилища и возвратить новый массив
        const newItems = filesTreePublicMethods.deleteItem(items, currentArtItemId)
        // Сохранить новые данные в Хранилище
        setItems(newItems)
        // Сохранить новый массив папок и файлов на сервере
        saveItemsOnServer(newItems)

        // Удалить статью на сервере
        const options = { method: 'DELETE' }
        const response = makeFetch(
            // id сайта передаётся в параметре siteId
            getApiUrl('article', currentArtItemId),
            options
        )

        // Обнулить свойство указывающее на uuid активного пункта в папках и статья
        // потому что папка удалена
        dispatch(actions.sites.setCurrentComp(null, null))

        // Закрыть модальное окно
        dispatch(actions.modal.closeModal())
    }, [])

    return (
        <>
            <p>{messages.ArticleForm.deleteArticleConfirmationTextInModal[lang]}</p>
            <Wrapper t={10}>
                <Hr/>
            </Wrapper>
            <Wrapper t={10} align='right' gap={10}>
                <Button
                    text={messages.ArticleForm.closeDeleteArticleModalBtn[lang]}
                    onClick={() => dispatch(actions.modal.closeModal())}
                />
                <Button
                    text={messages.ArticleForm.deleteArticleBtnInModal[lang]}
                    color='accent'
                    onClick={deleteArticle}
                />
            </Wrapper>
        </>
    )
}
