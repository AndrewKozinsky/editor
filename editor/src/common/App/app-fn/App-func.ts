import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'src/store/rootReducer'
// @ts-ignore
// import { useHistory, useLocation } from 'react-router-dom'
// import {makeCN} from 'src/utils/StringUtils'


/** Хук возвращает классы обёртки компонента App */
/*export function useGetAppClasses() {
    // Получение текущей темы интерфейса
    const editorTheme = useSelector((store: AppState) => store.settings.editorTheme)

    // Составление классов приложения
    let classes = ['app']
    if (editorTheme === 'dark') classes.push('dark-theme')

    // Текущий адрес
    const pathname = window.location.pathname // Напр.: /editor/enter

    // Если нахожусь на страницах с формами, то поставить более тёмный фон
    const formPages = ['/enter', '/reg', '/reset-password', '/change-reset-password', '/confirm-email']
    if (formPages.includes(pathname.slice(7))) {
        classes.push('app--second-bg')
    }

    return makeCN(classes)
}*/


/** Хук перенаправляет на определённые страницы в зависимости от статуса токена авторизации. */
/*export function useRedirectPage() {
    let history = useHistory()
    let location = useLocation()

    // Статус токена авторизации пользователя. Значения: 0, 1 или 2.
    const { authTokenStatus } = useSelector((store: AppState) => store.user)

    // При изменении authTokenStatus или адреса страницы...
    useEffect(function () {
        // Ничего не делать если сервер еще не проверил токен входа
        if (authTokenStatus === 0) return

        // Текущий адрес
        const pathname = window.location.pathname

        // Если нахожусь на странице редактора и у пользователя нет правильного токена авторизации...
        if (pathname === '/editor/' && authTokenStatus === 1) {
            // то перебросить на страницу входа
            history.push('/enter')
        }
    }, [authTokenStatus, location.pathname])
}*/
