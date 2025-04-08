import { useEffect, useState } from 'react'
// @ts-ignore
import faviconWhite_1x from '../favicons/faviconWhite@1x.png'
// @ts-ignore
import faviconWhite_2x from '../favicons/faviconWhite@2x.png'
// @ts-ignore
import faviconBlack_1x from '../favicons/faviconBlack@1x.png'
// @ts-ignore
import faviconBlack_2x from '../favicons/faviconBlack@2x.png'


/** Изменение фавиконки в зависимости от темы и плотности пикселей */
export function useManageFavicon() {
    const [scheme, setScheme] = useState<'light' | 'dark'>('light')

    useEffect(function () {
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', setColorScheme(setScheme))
        setColorScheme(setScheme)()
    }, [])

    useEffect(function () {
        let faviconUrl = ''

        if (scheme === 'light') {
            if (window.devicePixelRatio === 1) {
                faviconUrl = faviconBlack_1x
            }
            else {
                faviconUrl = faviconBlack_2x
            }
        }
        else if (scheme === 'dark') {
            if (window.devicePixelRatio === 1) {
                faviconUrl = faviconWhite_1x
            }
            else {
                faviconUrl = faviconWhite_2x
            }
        }

        const $favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement
        if ($favicon) {
            $favicon.href = faviconUrl
        }
    }, [scheme])
}

function setColorScheme(setScheme: (colorScheme: 'light' | 'dark') => void) {
    return function (e?: any) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setScheme('dark')
        }
        else {
            setScheme('light')
        }
    }
}
