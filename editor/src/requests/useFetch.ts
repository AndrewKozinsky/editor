import { useEffect, useState } from 'react'

type OptionsType = {
    method: string
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

    // Функция запускающая процесс загрузки данных с сервера
    function doFetch() {
        setIsLoading(true)
    }

    useEffect(function () {
        // Если загрузка не требуется, то ничего не делать
        if (!isLoading) return

        try {
            fetch(url, options)
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