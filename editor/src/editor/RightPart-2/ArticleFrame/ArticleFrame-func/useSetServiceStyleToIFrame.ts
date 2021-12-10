import {useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'

/**
 * Хук создаёт и ставит служебные стили в IFrame
 */
export function useSetServiceStyleToIFrame() {
    const { $links, history } = useGetArticleSelectors()

    // Was style installed?
    const [wasInstalled, setWasInstalled] = useState(false)

    useEffect(function () {
        if (!$links.$body || !history.length || wasInstalled) return

        // Create and set <style> into <head>
        const styleElem = document.createElement('style')
        // Стиль изменяющий тег, в котором находится текст, который пользователь может редактировать
        styleElem.innerText = `text-component {display:block;}text-component:focus {outline:none;}`

        $links.$head.appendChild(styleElem)
    }, [$links, history, wasInstalled])

    useEffect(function () {
        if (!history.length) {
            // Set flag that files are not set
            setWasInstalled(false)
        }
    }, [history])
}