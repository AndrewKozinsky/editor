import {useFetch, makeFetch} from 'src/requests/reqFn/fetch'
import getApiUrl from 'src/requests/reqFn/apiUrls'
import {useEffect, useState} from 'react';

/**
 * Функция отправляет еще одно письмо для подтверждения почты пользователя
 * @param {Object} email — Почта пользователя, которую нужно подтвердить
 */
export default async function sendConfirmLetterRequest(email: string) {
    const options = {
        method: 'POST',
        body: JSON.stringify({email: email})
    }
    const response: SendConfirmLetterServerResponse = await makeFetch(getApiUrl('login'), options)

    return response
}


/**
 * Хук возвращает функцию делающую запрос на отправку еще одного письма с подтверждением почты
 * @param {String} email — почта пользователя, которую нужно подтвердить.
 */
export function useGetSendConfirmLetter(email: string) {

    const [success, setSuccess] = useState(false)

    // Параметры запроса
    const options = {
        method: 'POST',
        body: JSON.stringify({email: email})
    }

    // Хук делающий запрос данных с сервера. В data приходят данные полученные с сервера
    const { isLoading, data, error, doFetch } = useFetch<SendConfirmLetterServerResponse>(
        getApiUrl('sendAnotherConfirmLetter'), options
    )

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
}


// Тип данных с ответом от пользователя
type SendConfirmLetterServerResponse = FailResponse | SuccessResponse

// Ошибочный ответ
type FailResponse = {
    status: "fail"
    errors: {
        field: null
        isOperational: true
        message: string
        statusCode: 400
    }
}

// Успешный ответ
type SuccessResponse = {
    status: "success"
    data: {
        user: {
            name: string
            email: string
        }
    }
}