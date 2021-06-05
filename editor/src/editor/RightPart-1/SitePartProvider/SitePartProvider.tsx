import React, {ReactElement, ReactNode, useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import SiteSection from '../SiteSection/SiteSection'
import {AppState} from 'store/rootReducer'
import HeaderPage from 'common/HeaderPage/HeaderPage'
import {NewTemplateButton, TemplatesList} from '../IncFilesTemplateList/IncFilesTemplateList'
import IncFilesTemplateForm from '../IncFilesTemplateForm/IncFilesTemplateForm'
import ComponentsList from '../ComponentsList/ComponentsList'
import messages from '../messages'
import ComponentsFormProvider from '../ComponentForms/ComponentsFormProvider/ComponentsFormProvider'


/**
 * Компонент возвращает компоненты, которые должны быть показаны в правой части выбранного сайта
 * в зависимости от выбранной вкладки
 */
export default function SitePartProvider(): ReactElement {

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Номер активной вкладки
    const { rightMainTab } = useSelector((store: AppState) => store.sites)

    // Возвращаемые компоненты
    const [partComponents, setPartComponents] = useState<ReactElement>(null)

    useEffect(function () {

        // Составление массива из четырёх элементов. Элементу, который соответствует вкладке, задаётся видимость.
        const parts: ReactNode = [0, 1, 2, 3].map((num) => {
            if (num === 0) {
                return (
                    <HeaderPage headerText={messages.Tabs.sites[lang]} display={num === rightMainTab} key={num}>
                        <SiteSection />
                    </HeaderPage>
                )
            }
            else if (num === 1) {
                return (
                    <HeaderPage headerText={messages.Tabs.incFilesTemplates[lang]} display={num === rightMainTab} key={num}>
                        <>
                            <NewTemplateButton />
                            <TemplatesList />
                        </>
                        <IncFilesTemplateForm />
                    </HeaderPage>
                )
            }
            else if (num === 2) {
                return (
                    <HeaderPage headerText={messages.Tabs.components[lang]} display={num === rightMainTab} key={num}>
                        <ComponentsList />
                        <ComponentsFormProvider />
                    </HeaderPage>
                )
            }
            else if (num === 3) {
                return (
                    <HeaderPage headerText={messages.Tabs.articles[lang]} display={num === rightMainTab} key={num}>
                        <p>Статьи</p>
                        <p>Статьи</p>
                    </HeaderPage>
                )
            }
        })

        // Поставить элементы в Местное состояние чтобы компонент их вернул
        setPartComponents( <>{parts}</> )
    }, [rightMainTab, lang])

    return partComponents
}