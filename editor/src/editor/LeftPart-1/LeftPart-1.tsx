import React from 'react'
import NameSection from 'editor/wrappers/NameSection/NameSection'
import Button, { ButtonPropType } from 'common/formElements/Button/Button'
import {
    useFetchSites,
    useGetNewSiteOnClickHandler,
    useGetSitesItemsListProps
} from './LeftPart1-func'
import ItemsList from 'common/ItemsList/ItemsList'
import Wrapper from 'common/Wrapper/Wrapper'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import sitesPanelMsg from 'messages/groupsPanelMessages'
import './LeftPart-1.scss'



type LeftPart1PropType = {
    display?: boolean // Показывать ли компонент
}

/** Левая часть первой главной вкладки */
export default function LeftPart1(props: LeftPart1PropType) {
    const {
        display // Показывать ли компонент
    } = props

    // Атрибуты обёртки панели
    const CN = 'left-part-1'
    const style = display ? {} : {display: 'none'}

    return (
        <div className={CN} style={style}>
            <NameSection header={sitesPanelMsg.header}>
                <NewSiteButton />
                <SitesButtons />
            </NameSection>
        </div>
    )
}

/** Кнопка создания нового сайта */
function NewSiteButton() {
    // id выделенного сайта
    const { currentSiteId } = useGetSitesSelectors()

    // Обработчик щелчка по кнопке
    const onClickHandler = useGetNewSiteOnClickHandler()

    // Атрибуты кнопки
    const attrs: ButtonPropType = {
        text: sitesPanelMsg.newSiteBtn,
        icon: 'btnSignAdd',
        block: true,
        onClick: onClickHandler
    }
    if (currentSiteId === '') {
        attrs.color = 'accent'
    }

    return <Button {...attrs} />
}

/** Компонент списка сайтов */
function SitesButtons() {
    // Получить с сервера список сайтов и поставить в Хранилище
    useFetchSites()

    // Аргументы для компонента выводящий список сайтов
    const itemsListProps = useGetSitesItemsListProps()

    return (
        <Wrapper t={10}>
            <ItemsList {...itemsListProps}/>
        </Wrapper>
    )
}
