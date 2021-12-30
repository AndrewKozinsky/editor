import { useEffect, useState } from 'react';
import useGetArticleSelectors from 'store/article/articleSelectors';
/** Hook sets <main> in IFrame to put an article in */
export function useSetRootDivToIFrame() {
    const { $links } = useGetArticleSelectors();
    const [wrapperInstalled, setWrapperInstalled] = useState(false);
    useEffect(function () {
        if (!$links.$body || wrapperInstalled)
            return;
        const rootDiv = document.createElement('main');
        $links.$body.append(rootDiv);
        setWrapperInstalled(true);
    }, [$links]);
}
//# sourceMappingURL=useSetRootDivToIFrame.js.map