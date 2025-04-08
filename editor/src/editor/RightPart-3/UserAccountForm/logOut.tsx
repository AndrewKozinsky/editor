import { useDispatch } from 'react-redux'
import actions from 'store/rootAction'
import { smoothMoveToEntrance } from 'entrance/EntrancePages/EntrancePages-func'

// Хук возвращает функцию выводящую пользователя из учётной записи
export default function useGetLogOut() {
    const dispatch = useDispatch()

    return function () {
        // Удалить куку авторизации
        document.cookie = 'token=logout; max-age=0'

        setTimeout(function () {
            // Smooth hide the editor and show entrance forms wrapper
            smoothMoveToEntrance()

            setTimeout(function() {
                // Поставить authTokenStatus в 1 чтобы выкинуть пользователя из редактора
                dispatch(actions.user.setUserData('fail', null))
            }, 600)
        }, 1000)
    }
}
