import { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import useGetUserSelectors from 'store/user/userSelectors'
// @ts-ignore
import faviconWhite_1x from '../favicons/faviconWhite@1x.png'
// @ts-ignore
import faviconWhite_2x from '../favicons/faviconWhite@2x.png'
// @ts-ignore
import faviconBlack_1x from '../favicons/faviconBlack@1x.png'
// @ts-ignore
import faviconBlack_2x from '../favicons/faviconBlack@2x.png'

/** Хук перенаправляет на определённые страницы в зависимости от статуса токена авторизации. */
export function useRedirectPage() {
    let history = useHistory()
    let location = useLocation()

    // Статус токена авторизации пользователя. Значения: 'unknown', 'fail' или 'success'.
    const { authTokenStatus } = useGetUserSelectors()

    // При изменении authTokenStatus или адреса страницы...
    useEffect(function () {
        // Ничего не делать если сервер еще не проверил токен входа
        if (authTokenStatus === 'unknown') return

        // Текущий адрес
        const pathname = window.location.pathname

        // Если нахожусь на странице редактора и у пользователя нет правильного токена авторизации...
        if (pathname === '/' && authTokenStatus === 'fail') {
            // ...то перебросить на страницу входа
            history.push('/enter')
        }
    }, [authTokenStatus, location.pathname])
}
