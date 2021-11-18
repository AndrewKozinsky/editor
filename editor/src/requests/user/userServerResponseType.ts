import StoreSettingsTypes from 'store/settings/settingsTypes'

// Тип данных о пользователе от сервера
type UserServerResponseType = {
    status: 'success',
    statusCode: number,
    data: {
        user: {
            id: number, // 1
            name: string, // 'Andrew'
            email: string, // 'andkozinskiy@yandex.ru'
            language: StoreSettingsTypes.EditorLanguage, // 'rus'
            token?: string // 'ewhjw643gjwfsht667GS'
        }
    }
}

export default UserServerResponseType