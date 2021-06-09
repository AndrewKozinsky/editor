import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
//@ts-ignore
import {useStore} from 'effector-react'
import {AppState} from 'store/rootReducer'
import actions from 'store/rootAction'
import messages from '../../messages'
import Wrapper from 'common/Wrapper/Wrapper'
import Hr from 'common/misc/Hr/Hr'
import Button from 'src/common/formElements/Button/Button'
import {componentsTreeStore, setItems} from '../../ComponentsList/ComponentsList'
import filesTreePublicMethods from 'libs/FilesTree/publicMethods'
import {saveItemsOnServer} from '../../ComponentsList/ComponentsList-func'


export function ModalContent() {
    const dispatch = useDispatch()

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Массив папок и файлов из Хранилища
    const items = useStore(componentsTreeStore)
    // uuid выделенной папки
    const {currentCompItemId} = useSelector((store: AppState) => store.sites.componentsSection)

    // Функция удаляющая выделенную папку
    const deleteFolder = useCallback(function () {
        // Удалить папку из Хранилища и возвратить новый массив
        const newItems = filesTreePublicMethods.deleteItem(items, currentCompItemId)
        // Сохранить новые данные в Хранилище
        setItems(newItems)
        // Сохранить новый массив папок и файлов на сервере
        saveItemsOnServer(newItems)

        // Обнулить свойство указывающее на uuid активного пункта в папках и шаблонах компонентах
        // потому что папка удалена
        dispatch(actions.sites.setCurrentComp(null, null))

        // Закрыть модальное окно
        dispatch(actions.modal.closeModal())
    }, [])

    return (
        <>
            <p>{messages.ComponentFolderForm.deleteFolderConfirmationTextInModal[lang]}</p>
            <Wrapper t={10}>
                <Hr/>
            </Wrapper>
            <Wrapper t={10} align='right' gap={10}>
                <Button
                    text={messages.ComponentFolderForm.closeDeleteFolderModalBtn[lang]}
                    onClick={() => dispatch(actions.modal.closeModal())}
                />
                <Button
                    text={messages.ComponentFolderForm.deleteFolderBtnInModal[lang]}
                    color='accent'
                    onClick={deleteFolder}
                />
            </Wrapper>
        </>
    )
}
