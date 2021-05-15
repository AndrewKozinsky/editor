import {useFetch} from './fetch'
import getApiUrl from './apiUrls'
import { useSelector } from 'react-redux'
import { AppState } from '../store/rootReducer'

type GetTokenDataServerResponse = {
    status: string
}

// Функция возвращает токен пользователя
export function useGetUserToken() {

    // Параметры запроса
    const options = { method: 'POST' }

    // Хук делающий запрос данных с сервера. В data приходят данные полученные с сервера
    const {data: userToken, doFetch} =
        useFetch<GetTokenDataServerResponse>(getApiUrl('getUserToken'), options)

    return { userToken, doFetch }
}

type ChangeEmailServerResponse = {
    status: string
}

// Функция меняет почту, на которую зарегистрирована учётная запись пользователя
export function useChangeEmail(newEmail: string) {

    // Параметры запроса
    const options = { method: 'PUT', body: JSON.stringify({email: newEmail})}

    // Хук делающий запрос данных с сервера. В data приходят данные полученные с сервера
    const {data: response, doFetch} =
        useFetch<ChangeEmailServerResponse>(getApiUrl('changeEmail'), options)

    return { response, doFetch }
}

type DeleteAccountServerResponse = {
    status: string
}

// Функция удаляет учётная запись пользователя
export function useDeleteAccount() {

    // Параметры запроса
    const options = { method: 'DELETE'}

    // Хук делающий запрос данных с сервера. В data приходят данные полученные с сервера
    const {data: response, doFetch} =
        useFetch<DeleteAccountServerResponse>(getApiUrl('me'), options)

    return { response, doFetch }
}

type DeleteSiteServerResponse = {
    status: 'success',
}

// Функция удаляет сайт
export function useDeleteSite() {

    // id выделенного сайта, который нужно удалить
    const {currentSiteId} = useSelector((store: AppState) => store.sites)

    // Параметры запроса
    const options = { method: 'DELETE'}

    // Хук делающий запрос данных с сервера. В data приходят данные полученные с сервера
    const {data: response, doFetch} =
        useFetch<DeleteSiteServerResponse>(getApiUrl('site', currentSiteId), options)

    return { response, doFetch }
}

type DeletePluginServerResponse = {
    status: 'success',
}

// Функция удаляет шаблон подключаемых файлов
export function useDeletePlugin() {

    // id выделенного шаблона, который нужно удалить
    const { currentPluginId } = useSelector((store: AppState) => store.sites.pluginsSection)

    // Параметры запроса
    const options = { method: 'DELETE'}

    // Хук делающий запрос данных с сервера. В data приходят данные полученные с сервера
    const {data: response, doFetch} =
        useFetch<DeletePluginServerResponse>(getApiUrl('plugin', currentPluginId), options)

    return { response, doFetch }
}