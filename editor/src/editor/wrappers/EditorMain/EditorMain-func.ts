import { useEffect, useState } from 'react'
import useGetSettingsSelectors from 'store/settings/settingsSelectors'

/** Функция возвращает булево значение нужно ли отрисовать редактор */
export function useGetPageVisibility() {

    // Какой компонент должен быть отрисован
    const { entryAndEditorViewState } = useGetSettingsSelectors()

    const [isVisible, setIsVisible] = useState(false)

    useEffect(function () {

        // В зависимости от вида показывать или нормальный вид редактора или отдалённый
        // или он вообще не будет отрисоваться.
        // Если нужно показать редактор
        if (entryAndEditorViewState === 'editor') {
            setIsVisible(true)
        }
        // Если нужно показать плавный переход от форм входа к редактору
        else if (entryAndEditorViewState === 'toEditor') {
            setIsVisible(true)
        }
        // Если нужно показать плавный переход от редактора к формам входа
        else if (entryAndEditorViewState === 'toEntry') {
            setIsVisible(true)
        }
        // Если нужно показать редактор
        else if (entryAndEditorViewState === 'entry') {
            setIsVisible(false)
        }
        // В противном случае ничего не отрисовать
        else {
            setIsVisible(false)
        }
    }, [entryAndEditorViewState])

    return isVisible
}
