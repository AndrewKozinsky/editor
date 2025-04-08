import { useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'

/** Хук создаёт и ставит служебные стили в IFrame */
export default function useSetServiceStyleToIFrame() {
    const { $links } = useGetArticleSelectors()

    // Was style installed?
    const [wasInstalled, setWasInstalled] = useState(false)

    useEffect(function () {
        if (!$links.$body || wasInstalled) return

        // Create and set <style> into <head>
        const styleElem = document.createElement('style')
        // Стиль изменяющий тег, в котором находится текст, который пользователь может редактировать
        // Если поставить display:inline, то возникает странная ошибка если два <text-component> стоят рядом: если написать текст во втором <text-component>, то текст почему-то попадает в первый <text-component>.
        styleElem.innerText = `text-component {display:inline-block;cursor:text}text-component:focus {outline:none;}*[contenteditable]:empty:after {content:attr(placeholder);color: rgba(0, 0, 0, .3);}`

        $links.$head.appendChild(styleElem)

        setWasInstalled(true)
    }, [$links, wasInstalled])
}
