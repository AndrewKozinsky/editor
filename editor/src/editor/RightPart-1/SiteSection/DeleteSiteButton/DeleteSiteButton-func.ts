import {useCallback, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import actions from 'store/rootAction'
import { useDeleteSite } from 'requests/editor/sites/deleteSiteRequest'

/* Хук возвращает функцию закрывающую модальное окно с вопросом удалить ли сайт */
export function useGetCloseModal() {
    const dispatch = useDispatch()

    return useCallback(function () {
        dispatch(actions.modal.closeModal())
    }, [])
}

/* Хук возвращает функцию удаляющую сайт и закрывающую модальное окно с вопросом удалить ли сайт */
export function useGetDeleteSite() {
    const dispatch = useDispatch()

    // Запрос на удаление сайта
    const { response: deleteResponse, doFetch: deleteSite } = useDeleteSite()

    useEffect(function () {
        // Ничего не делать если статус не равен success
        if (!deleteResponse || deleteResponse.status !== 'success') return

        // Закрыть модальное окно
        dispatch(actions.modal.closeModal())

        // Скачать новый список сайтов и поставить в Хранилище
        dispatch(actions.sites.requestSites())

        // Обнулить id выбранного сайта
        dispatch(actions.sites.setCurrentSiteId(null))
    }, [deleteSite])

    return deleteSite
}
