import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'store/rootReducer'
// @ts-ignore
import { useHistory } from 'react-router-dom'
import {makeCN} from 'utils/StringUtils'


/** Хук возвращает классы обёртки компонента App */
export function useGetAppClasses() {
    // Получение текущей темы интерфейса
    const editorTheme = useSelector((store: AppState) => store.settings.editorTheme)

    // Составить
    let classes = ['app']
    if (editorTheme === 'dark') classes.push('dark-theme')

    // Текущий адрес
    const pathname = window.location.pathname
    // Если нахожусь не на странице редактора, то поставить более тёмный фон
    if (pathname !== '/editor/') classes.push('app__second-bg')

    return makeCN(classes)
}


export function useRedirectPage() {
    let history = useHistory()

    // Статус токена авторизации пользователя. Значения: 0, 1 или 2.
    const { authTokenStatus } = useSelector((store: AppState) => store.user)

    // При изменении authTokenStatus
    useEffect(function () {
        // Ничего не делать если authTokenStatus равен нулю
        if (!authTokenStatus) return

        // Текущий адрес
        const pathname = window.location.pathname

        // Если нахожусь на главной странице (странице редактора)
        // и у пользователя нет правильного токена авторизации то отправить на страницу входа
        if (pathname === '/editor/' && authTokenStatus === 1) {
            // перебросить на другую страницу
            history.push('/enter');
        }
    }, [authTokenStatus])
}
