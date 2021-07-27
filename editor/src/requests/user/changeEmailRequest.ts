// import {useFetch} from 'requests/reqFn/fetch'
// import getApiUrl from 'requests/reqFn/apiUrls'


// Функция меняет почту, на которую зарегистрирована учётная запись пользователя
/*export function useChangeEmailRequest(newEmail: string) {

    // Параметры запроса
    const options = { method: 'PUT', body: JSON.stringify({email: newEmail})}

    // Хук делающий запрос данных с сервера. В data приходят данные полученные с сервера
    const {data: response, doFetch} =
        useFetch<ChangeEmailServerResponse>(getApiUrl('changeEmail'), options)

    return { response, doFetch }
}*/


// Тип данных с ответом от пользователя
// type ChangeEmailServerResponse = ErrorServerResponseType | UserServerResponseType

// Ошибочный ответ
/*type FailResponse = {
    status: "fail"
}*/
