import { useEffect, useState } from 'react';
import useGetArticleSelectors from 'store/article/articleSelectors';
/** Хук создаёт и ставит служебные стили в IFrame */
export default function useSetServiceStyleToIFrame() {
    const { $links } = useGetArticleSelectors();
    // Was style installed?
    const [wasInstalled, setWasInstalled] = useState(false);
    useEffect(function () {
        if (!$links.$body || wasInstalled)
            return;
        // Create and set <style> into <head>
        const styleElem = document.createElement('style');
        // Стиль изменяющий тег, в котором находится текст, который пользователь может редактировать
        styleElem.innerText = `text-component {display:block;}text-component:focus {outline:none;}`;
        $links.$head.appendChild(styleElem);
        setWasInstalled(true);
    }, [$links, wasInstalled]);
}
//# sourceMappingURL=useSetServiceStyleToIFrame.js.map
//# sourceMappingURL=useSetServiceStyleToIFrame.js.map