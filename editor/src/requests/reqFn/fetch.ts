import { useEffect, useState } from 'react'
import { store } from 'store/rootReducer'
// import config from 'utils/config'
import { getFromLocalStorage, getState } from 'utils/miscUtils'


// Тип параметров запроса
type OptionsType = {
    // Request method
    method: string,
    // Additional headers
    headers?: {[key: string]: string},
    // What is it need for?
    // [key: string]: undefined | string | {}
}

/** Хук загружающий данные с сервера
 * @param {String} url — строка c адресом запроса
 * @param {Object} options — параметры запроса
 */
export function useFetch<T>(url: string, options: OptionsType) {

    // Идёт ли сейчас загрузка
    const [isLoading, setIsLoading] = useState(false)

    // Загруженные данные
    const [data, setData] = useState<null|T>(null)

    // Значение ошибки
    const [error, setError] = useState(false)

    // Язык интерфейса
    // const lang = getFromLocalStorage(config.ls.editorLanguage)
    const lang = 'rus'

    // Функция запускающая процесс загрузки данных с сервера
    function doFetch() {
        setIsLoading(true)
    }

    useEffect(function () {
        // Если загрузка не требуется, то ничего не делать
        if (!isLoading) return

        // Добавление заголовка языка интерфейса в параметры запроса
        const extraOptions = setExtraOptions(options, lang)

        try {
            fetch(url, extraOptions)
                .then(rowData => rowData.json())
                .then(jsonData => {
                    setIsLoading(false)
                    setData(jsonData)
                })
        }
        catch (err) {
            setIsLoading(false)
            setError(err)
        }
    }, [isLoading])

    return {
        isLoading,
        data,
        error,
        doFetch
    }
}

/** Функция загружающая данные с сервера
 * @param {String} url — строка c адресом запроса
 * @param {Object} options — параметры запроса
 */
export async function makeFetch(url: string, options: OptionsType) {
    // Добавление заголовка языка интерфейса в параметры запроса
    const extraOptions = setExtraOptions(options)

    try {
        const rowData = await fetch(url, extraOptions)
        return await rowData.json()
    }
    catch (err) {
        let message = `Couldn't get data.`
        throw new Error(message)
    }
}

/**
 * Функция добавляет в объект параметров запроса заголовок Editor-Language с языком
 * @param {Object} optionsObj — объект параметров запроса
 * @param {String} lang — язык интерфейса пользователя
 */
function setExtraOptions(optionsObj: OptionsType, lang = 'eng') {
    return {
        ...optionsObj,
        headers: {
            ...optionsObj.headers,
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'Editor-Language': lang
        }
    }
}
