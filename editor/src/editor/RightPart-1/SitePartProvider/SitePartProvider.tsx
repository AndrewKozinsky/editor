import React, {ReactElement, ReactNode, useEffect, useState} from 'react'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import SiteSection from '../SiteSection/SiteSection/SiteSection'
import HeaderPage from 'common/HeaderPage/HeaderPage'
// import { NewTemplateButton, TemplatesList } from '../SiteTemplateList/SiteTemplateList'
// import SiteTemplateForm from '../SiteTemplateForm/SiteTemplateForm'
// import FoldersList from '../ComponentsOrArticles/FoldersList/FoldersList'
// import ComponentFormProvider from '../ComponentsOrArticles/ComponentFormProvider'
// import ArticleFormProvider from '../ComponentsOrArticles/ArticleFormProvider'
import { rightTabsMessages } from 'messages/rightTabsMessages'
import useGetMessages from 'messages/fn/useGetMessages'


/**
 * Компонент возвращает компоненты, которые должны быть показаны в правой части выбранного сайта
 * в зависимости от выбранной вкладки
 */
export default function SitePartProvider(): ReactElement {
    // Current site id and active tab number
    const { currentSiteId, rightMainTab } = useGetSitesSelectors()

    // id выделенного шаблона сайта
    const { currentTemplateId } = useGetSitesSelectors().siteTemplatesSection

    // Возвращаемые компоненты
    const [partComponents, setPartComponents] = useState<ReactElement>(null)

    // Тексты названий вкладок на первой правой вкладке
    const rightTabsMsg = useGetMessages(rightTabsMessages)

    useEffect(function () {
        // Составление массива из четырёх элементов. Элементу, который соответствует вкладке, задаётся видимость.
        const parts: ReactNode = [0, 1, 2, 3].map((num) => {
            if (num === 0) {
                return (
                    <HeaderPage headerText={rightTabsMsg.sites} display={num === rightMainTab} key={num}>
                        <SiteSection />
                    </HeaderPage>
                )
            }
            else if (num === 1) {
                return (
                    <HeaderPage headerText={rightTabsMsg.siteTemplates} display={num === rightMainTab} key={num}>
                        <>
                            {/*<NewTemplateButton />*/}
                            {/*<TemplatesList />*/}
                        </>
                        {/*Если id текущего шаблона равен null, то ни выделен ни новый сайт, ни текущий,*/}
                        {/*поэтому ничего не отрисовывать.*/}
                        {/*{currentTemplateId !== null && <SiteTemplateForm />}*/}
                    </HeaderPage>
                )
            }
            else if (num === 2) {
                return (
                    <HeaderPage headerText={rightTabsMsg.components} display={num === rightMainTab} key={num}>
                        {/*<FoldersList type='components' />*/}
                        {/*<ComponentFormProvider />*/}
                    </HeaderPage>
                )
            }
            else if (num === 3) {
                return (
                    <HeaderPage headerText={rightTabsMsg.articles} display={num === rightMainTab} key={num}>
                        {/*<FoldersList type='articles' />*/}
                        {/*<ArticleFormProvider />*/}
                    </HeaderPage>
                )
            }
        })

        // Поставить элементы в Местное состояние чтобы компонент их вернул
        setPartComponents( <>{parts}</> )
    }, [currentSiteId, rightMainTab, currentTemplateId])

    return partComponents
}
