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
import {componentsTreeStore} from '../../ComponentsList/ComponentsList'
import filesTreePublicMethods from 'libs/FilesTree/publicMethods'
import {saveItemsOnServer} from '../../ComponentsList/ComponentsList-func'


// Хук возвращает функцию удаляющая учётную запись пользователя
export default function useGetDeleteFolder() {
    const dispatch = useDispatch()

    // Открыто ли модальное окно
    const isOpen = useSelector((store: AppState) => store.modal.isOpen)

    // Должно ли быть открыто модальное окно подтверждения изменения почты
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Следить за моментом когда был запрос на открытие окна
    useEffect(function () {
        if (isModalOpen) {
            // Открыть окно подтверждения удаления шаблона подключаемых файлов
            dispatch(actions.modal.openModal(
                <ModalContent />
            ))
        }

        // Если модальное окно закрыли, то и тут поменять статус
        // потому что без этого я не смогу его открыть более одного раза
        if (!isOpen && isModalOpen) setIsModalOpen(false)
    }, [isModalOpen])

    return () => setIsModalOpen(true)
}


function ModalContent() {
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
        filesTreePublicMethods.setItems(newItems)
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
            <Wrapper t={10} align='right'>
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
