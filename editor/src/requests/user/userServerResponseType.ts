import ErrorServerResponseType from '../errorServerResponseType'

// Тип данных о пользователе от сервера
type UserServerResponseType = {
    status: 'success',
    statusCode: number,
    data: {
        user: {
            id: number, // 1
            name: string, // 'Andrew'
            email: string, // 'andkozinskiy@yandex.ru'
            language: 'eng' | 'rus', // 'rus'
            token?: string // 'ewhjw643gjwfsht667GS'
        }
    }
}


// Тип данных с ответом от сервера
export type UserServerResponse = ErrorServerResponseType | UserServerResponseType