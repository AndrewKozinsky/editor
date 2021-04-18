// import { useFetch } from 'requests/fetch'
// import apiUrls from 'requests/apiUrls'
// import {useEffect, useState} from 'react';

// Тип данных отправляемый сервером
/*type SendAnotherConfirmLetterResponse = {
    status: 'success' | 'fail'
}*/

/**
 * Хук возвращает функцию делающую запрос на отправку еще одного письма с подтверждением почты
 * @param {String} email — почта пользователя, которую нужно подтвердить.
 */
/*
export function useGetSendAnotherConfirmLetter(email: string) {

    const [success, setSuccess] = useState(false)

    // Параметры запроса
    const options = {
        method: 'POST',
        body: JSON.stringify({email: email})
    }

    // Хук делающий запрос данных с сервера. В data приходят данные полученные с сервера
    const { isLoading, data, error, doFetch } = useFetch<SendAnotherConfirmLetterResponse>(apiUrls.sendAnotherConfirmLetter, options)

    // При получении данных с сервера...
    useEffect(function () {
        if (!data) return

        if (data.status === 'success') {
            setSuccess(true)
        }

    }, [data])

    return {
        isLoading, // Идёт ли загрузка
        success, // Письмо отправлено успешно
        error, // В процессе запроса возникли ошибки
        doFetch // Функция делающая запрос
    }
}*/
