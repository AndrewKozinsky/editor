import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppState} from '../../../store/rootReduser'
import {UserReducerType} from '../../../store/user/userReducer'
import {useGetUserToken} from '../../../requests/authRequests'
import {setAuthTokenStatus} from '../../../store/user/userActions'


/** Хук устанавливающий статус токена пользователя если он не известен (равен нулю). */
export function useSetTokenStatus() {

    const dispatch = useDispatch()

    // Получение статуса токена из Хранилища
    const { authTokenStatus } = useSelector<AppState, UserReducerType>(store => store.user)

    // Токен пользователя и функция для его запроса
    const { userToken, doFetch } = useGetUserToken()

    // При загрузке компонента...
    useEffect(function () {
        // Получение токена пользователя если не известен его статус
        if (!authTokenStatus) doFetch()
    }, [])

    // При обновлении значения данных по токену...
    useEffect(function () {
        if (!userToken) return

        // Статус токена пользователя: 0, 1 или 2
        const userTokenStatus = userToken.status === 'success' ? 2 : 1

        // Установка статуса токена в Хранилище
        dispatch( setAuthTokenStatus(userTokenStatus) )

    }, [userToken])
}