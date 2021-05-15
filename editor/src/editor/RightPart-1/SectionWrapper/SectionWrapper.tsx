import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import ArticlesSection from '../ArticlesSection/ArticlesSection'
import ComponentsSection from '../ComponentsSection/ComponentsSection'
import PluginsSection from '../PluginsSection/PluginsSection/PluginsSection'
import SiteSection from '../SiteSection/SiteSection'
import Header from 'common/textBlocks/Header/Header'
import Wrapper from 'common/Wrapper/Wrapper'
import { useGetHeaderText } from './SectionWrapper-func'
import {AppState} from 'store/rootReducer'
import './SectionWrapper.scss'


export default function SectionWrapper() {

    // Текст заголовка в зависимости от текущей вкладки
    const headerText = useGetHeaderText()

    const CN = 'site-right-section-wrapper'

    return (
        <div className={CN}>
            <Header text={headerText} type='h1' />
            <Wrapper t={10}>
                <SitePartProvider />
            </Wrapper>
        </div>
    )
}


/**
 * Компонент возвращает компоненты, которые должны быть показаны в правой части выбранного сайта
 * в зависимости от выбранной вкладки
 */
function SitePartProvider() {

    // Номер активной вкладки
    const { rightMainTab } = useSelector((store: AppState) => store.sites)

    // Возвращаемые компоненты
    const [partComponents, setPartComponents] = useState(<></>)

    useEffect(function () {
        // Список всех компонентов во всех вкладках
        const components = [
            SiteSection,
            PluginsSection,
            ComponentsSection,
            ArticlesSection
        ]

        // Составление массива из трёх элементов. Элемент, который соответствует вкладке задаётся видимость.
        const parts = components.map((Component, i) => {
            return <Component display={i === rightMainTab} key={i} />
        })

        // Поставить элементы в Местное состояние чтобы компонент их вернул
        setPartComponents( <>{parts}</> )
    }, [rightMainTab])

    return partComponents
}