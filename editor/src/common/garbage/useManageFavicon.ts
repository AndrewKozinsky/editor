/** Изменение адреса фавиконки в зависимости от темы и плотности пикселей */
/*export function useManageFavicon() {
    const [scheme, setScheme] = useState<'light' | 'dark'>('light')

    useEffect(function () {
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', setColorScheme(setScheme))
        setColorScheme(setScheme)
    }, [])

    useEffect(function () {
        let faviconUrl = 'favicon'

        if (scheme === 'dark') faviconUrl += '-white'

        if (window.devicePixelRatio === 1) faviconUrl += '@1x'
        else faviconUrl += '@2x'

        faviconUrl += '.png'

        const $favicon = document.getElementById('favicon') as HTMLLinkElement
        if (!$favicon) return

        $favicon.href = faviconUrl
    }, [scheme])
}*/

/*
function setColorScheme(setScheme: (colorScheme: 'light' | 'dark') => void) {
    return function (e: any) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setScheme('dark')
        }
        else {
            setScheme('light')
        }
    }
}*/
