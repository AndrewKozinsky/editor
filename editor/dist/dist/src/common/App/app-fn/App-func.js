import { useEffect } from 'react';
import useGetUserSelectors from 'store/user/userSelectors';
import { useHistory, useLocation } from 'react-router-dom';
/** Хук перенаправляет на определённые страницы в зависимости от статуса токена авторизации. */
export function useRedirectPage() {
    let history = useHistory();
    let location = useLocation();
    // Статус токена авторизации пользователя. Значения: 'unknown', 'fail' или 'success'.
    const { authTokenStatus } = useGetUserSelectors();
    // При изменении authTokenStatus или адреса страницы...
    useEffect(function () {
        // Ничего не делать если сервер еще не проверил токен входа
        if (authTokenStatus === 'unknown')
            return;
        // Текущий адрес
        const pathname = window.location.pathname;
        // Если нахожусь на странице редактора и у пользователя нет правильного токена авторизации...
        if (pathname === '/editor/' && authTokenStatus === 'fail') {
            // ...то перебросить на страницу входа
            history.push('/enter');
        }
    }, [authTokenStatus, location.pathname]);
}
//# sourceMappingURL=App-func.js.map
//# sourceMappingURL=App-func.js.map