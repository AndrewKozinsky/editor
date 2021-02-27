import { useSelector } from 'react-redux'
import {
    useEffect,
    useState
} from 'react'
import {AppState} from '../../../store/rootReduser'


/** Хук возвращает классы обёртки компонента App */
export function useGetAppClasses() {
    // Получение текущей темы интерфейса
    const editorTheme = useSelector((store: AppState) => store.settings.editorTheme)

    // Составить
    let classes = 'app'
    if (editorTheme === 'dark') classes += ' dark-theme'

    return classes
}


/** Хук возвращает адрес на который нужно переадресации если пользователя нужно
 * перебросить на другую страницу */
export function useGetRedirectPageAddress() {
    // Возвращаемый адрес страницы
    const [redirectPage, setRedirectPage] = useState<null | string>(null)

    // Статус токена авторизации пользователя
    const { authTokenStatus } = useSelector((store: AppState) => store.user)


    // При изменении authTokenStatus
    useEffect(function () {
        // Ничего не делать если authTokenStatus равен нулю
        if (!authTokenStatus) return

        // Текущий адрес
        const pathname = window.location.pathname

        // Если нахожусь на главной странице (странице редактора)
        // и у пользователя нет правильного токена авторизации то отправить на страницу входа
        if (pathname === '/' && authTokenStatus === 1) setRedirectPage('/enter')
    }, [authTokenStatus])


    return redirectPage
}

