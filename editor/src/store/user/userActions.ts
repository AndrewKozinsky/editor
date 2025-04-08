import { MiscTypes } from 'types/miscTypes'
import getUserToken from 'requests/user/getUserToken'
import StoreUserTypes from './userTypes'

const userActions = {
    // Запрос данных пользователя и установка в Хранилище
    requestUserData() {
        return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {
            // Запрос на получение статуса токена
            const response = await getUserToken()

            if (!response || response.status !== 'success') {
                dispatch( userActions.setUserData('fail', null) )
                return
            }

            const { token, email } = response.data.user
            const tokenStatus = token ? 'success' : 'fail'

            // Установка сайтов в Хранилище
            dispatch( userActions.setUserData(tokenStatus, email) )
        }
    },

    // Установка данных пользователя в Хранилище
    setUserData(tokenStatus: StoreUserTypes.AuthTokenStatusType, email: null | string): StoreUserTypes.SetUserDataActionType {
        return {
            type: StoreUserTypes.SET_USER_DATA,
            payload: {
                tokenStatus,
                email
            }
        }
    },
}

export default userActions