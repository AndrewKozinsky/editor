import React, {useEffect, useState} from 'react'
import ArticlesSection from '../ArticlesSection/ArticlesSection'
import ComponentsSection from '../ComponentsSection/ComponentsSection'
import PluginSection from '../PluginSection/PluginSection'
import SiteSection from '../SiteSection/SiteSection'
import Header from 'common/textBlocks/Header/Header'
import Wrapper from 'common/Wrapper/Wrapper'
import { useGetHeaderText } from './SectionWrapper-func'
import './SectionWrapper.scss'
import {useSelector} from 'react-redux';
import {AppState} from '../../../store/rootReducer';
import {ObjStringKeyAnyValType} from '../../../types/miscTypes';
import LeftPart1 from '../../LeftPart-1/LeftPart-1';
import LeftPart2 from '../../LeftPart-2/LeftPart-2';
import LeftPart3 from '../../LeftPart-3/LeftPart-3';
import RightPart1 from '../RightPart-1/RightPart-1';
import RightPart2 from '../../RightPart-2/RightPart-2';
import RightPart3 from '../../RightPart-3/RightPart-3/RightPart-3';


export default function SectionWrapper() {

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
            PluginSection,
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