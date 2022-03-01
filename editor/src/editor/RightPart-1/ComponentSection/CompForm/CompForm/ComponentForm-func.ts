import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import FCType from 'libs/FormConstructor/FCType'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import sitesActions from 'store/site/sitesActions'


/** Хук отслеживает выбор другого компонента и скачивает данные по нему с сервера и ставит их в Хранилище */
export function useGetComDataFromServerAndSetInStore() {
    const dispatch = useDispatch()
    const { currentCompItemId } = useGetSitesSelectors().componentSection

    // Скачать данные при выделении другого компонента
    useEffect(function () {
        dispatch( sitesActions.requestComponentTemplate() )
    }, [currentCompItemId])
}

/**
 * Хук изменяет значения полей формы компонента после скачивания других данных компонента
 * @param {Object} formState — объект состояния формы
 */
export function useSetAnotherFormData(formState: FCType.StateFormReturn) {
    const { currentCompCode } = useGetSitesSelectors().componentSection

    useEffect(function () {
        const valueFieldNewData = Object.assign(
            formState.fields['content'],
            { value: [currentCompCode] }
        )
        formState.updateField('content', valueFieldNewData)
    }, [currentCompCode])
}
