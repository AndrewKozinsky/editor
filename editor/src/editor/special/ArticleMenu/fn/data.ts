import { useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'

/** Хук возвращает булево значение заблокирована ли кнопка показа данных статьи */
export function useIsDataBtnDisabled() {
    // Is button disabled
    const [isDisabled, setIsDisabled] = useState(true)

    const { history } = useGetArticleSelectors()

    useEffect(function () {
        setIsDisabled(
            !history.length
        )
    }, [history])

    return isDisabled
}

