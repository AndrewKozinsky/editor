import React, {ReactElement, ReactNode, useEffect, useState} from 'react'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import rightTabsMsg from 'messages/rightTabsMessages'
import SiteSection from '../SiteSection/SiteSection/SiteSection'
import HeaderPage from 'common/HeaderPage/HeaderPage'
import { NewTemplateButton, TemplatesList } from '../SiteTemplateList/SiteTemplateList'
import { NewMetaTemplateButton, MetasTemplateList } from '../MetaTemplateList/MetaTemplateList'
import SiteTemplateForm from '../SiteTemplateForm/TemplateSection/siteTemplateForm'
import FoldersList from '../FoldersList/FoldersList'
import ComponentFormProvider from '../ComponentSection/ComponentFormProvider'
import MetaTemplateForm from '../MetaTemplateForm/MetaTemplateSection/metaTemplateForm'
import ArticleSection from '../ArticleSection/ArticleSection/ArticleSection'


/**
 * Компонент возвращает компоненты, которые должны быть показаны в правой части выбранного сайта
 * в зависимости от выбранной вкладки
 */
export default function SitePartProvider(): ReactElement {
    // Current site id and active tab number
    const { currentSiteId, rightMainTab } = useGetSitesSelectors()

    // id выделенного шаблона сайта
    const currentSiteTemplateId = useGetSitesSelectors().siteTemplatesSection.currentTemplateId
    const currentMetaTemplateId = useGetSitesSelectors().metaTemplatesSection.currentTemplateId

    // Возвращаемые компоненты
    const [partComponents, setPartComponents] = useState<ReactElement>(null)

    useEffect(function () {
        // Составление массива из четырёх элементов. Элементу, который соответствует вкладке, задаётся видимость.
        const parts: ReactNode = [0, 1, 2, 3, 4].map((num) => {
            if (num === 0) {
                return (
                    <HeaderPage headerText={rightTabsMsg.groups} display={num === rightMainTab} key={num}>
                        <SiteSection />
                    </HeaderPage>
                )
            }
            else if (num === 1) {
                return (
                    <HeaderPage headerText={rightTabsMsg.groupTemplates} display={num === rightMainTab} key={num}>
                        <>
                            <NewTemplateButton />
                            <TemplatesList />
                        </>
                        {/*Если id текущего шаблона равен null, то ни выделен ни новый сайт, ни текущий,*/}
                        {/*поэтому ничего не отрисовать.*/}
                        {currentSiteTemplateId !== null && <SiteTemplateForm />}
                    </HeaderPage>
                )
            }
            else if (num === 2) {
                return (
                    <HeaderPage headerText={rightTabsMsg.meta} display={num === rightMainTab} key={num}>
                        <>
                            <NewMetaTemplateButton />
                            <MetasTemplateList />
                        </>
                        {/*Если id текущего шаблона равен null, то ни выделен ни новый сайт, ни текущий,*/}
                        {/*поэтому ничего не отрисовать.*/}
                        {currentMetaTemplateId !== null && <MetaTemplateForm />}
                    </HeaderPage>
                )
            }
            else if (num === 3) {
                return (
                    <HeaderPage headerText={rightTabsMsg.components} display={num === rightMainTab} key={num}>
                        <FoldersList type='components' />
                        <ComponentFormProvider />
                    </HeaderPage>
                )
            }
            else if (num === 4) {
                return (
                    <HeaderPage headerText={rightTabsMsg.articles} display={num === rightMainTab} key={num}>
                        <FoldersList type='articles' />
                        <ArticleSection />
                    </HeaderPage>
                )
            }
        })

        // Поставить элементы в Местное состояние чтобы компонент их вернул
        setPartComponents( <>{parts}</> )
    }, [currentSiteId, rightMainTab, currentSiteTemplateId, currentMetaTemplateId])

    return partComponents
}
