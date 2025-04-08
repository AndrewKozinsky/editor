import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import useGetUserSelectors from 'store/user/userSelectors'
import userActions from 'store/user/userActions'

/**
 * Хук устанавливающий статус токена пользователя если он не известен.
 * Изначально токен статуса авторизации пользователя равен unknown.
 * Это значит не известно есть ли токен в куках и правилен ли он.
 * Поэтому делается запрос на сервер для его проверки. И в зависимости от этого статус становится
 * или fail (токена нет или он неверный) или success (токен правильный)
 */
export function useGetUserDataAndStatus() {
    const dispatch = useDispatch()

    // Статус токена
    const { authTokenStatus } = useGetUserSelectors()

    // Проинициализировано ли приложение
    const [isUserDataReceived, setIsUserDataReceived] = useState(false)

    useEffect(function () {
        // Запрос токена пользователя с сервера если не известен его статус
        if (authTokenStatus === 'unknown') {
            dispatch(userActions.requestUserData())
        }
        else if (['fail', 'success'].includes(authTokenStatus)) {
            setIsUserDataReceived(true)
        }
    }, [authTokenStatus])

    // Возвратить проинициализировано ли приложение.
    return isUserDataReceived
}