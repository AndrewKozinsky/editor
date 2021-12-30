import { useEffect, useState } from 'react';
import { useFetch } from 'requests/reqFn/fetch';
import getApiUrl from 'requests/reqFn/apiUrls';
// import ErrorServerResponseType from 'requests/errorServerResponseType'
// import UserServerResponseType from './userServerResponseType'
/**
 * Функция отправляет еще одно письмо для подтверждения почты пользователя
 * @param {Object} email — Почта пользователя, которую нужно подтвердить
 */
/*export default async function sendConfirmLetterRequest(email: string) {
    const options = {
        method: 'POST',
        body: JSON.stringify({email: email})
    }
    const response: UserServerResponse = await makeFetch(getApiUrl('sendConfirmLetter'), options)

    return response
}*/
/**
 * Хук возвращает функцию делающую запрос на отправку еще одного письма с подтверждением почты
 * @param {String} email — почта пользователя, которую нужно подтвердить.
 */
export function useGetSendConfirmLetter(email) {
    const [success, setSuccess] = useState(false);
    // Параметры запроса
    const options = {
        method: 'POST',
        body: JSON.stringify({ email: email })
    };
    // Хук делающий запрос данных с сервера. В data приходят данные полученные с сервера
    const { isLoading, data, error, doFetch } = useFetch(getApiUrl('sendConfirmLetter'), options);
    // При получении данных с сервера...
    useEffect(function () {
        if (!data)
            return;
        if (data.status === 'success') {
            setSuccess(true);
        }
    }, [data]);
    return {
        isLoading,
        success,
        error,
        doFetch // Функция делающая запрос
    };
}
//# sourceMappingURL=sendConfirmLetterRequest.js.map
//# sourceMappingURL=sendConfirmLetterRequest.js.map
//# sourceMappingURL=sendConfirmLetterRequest.js.map