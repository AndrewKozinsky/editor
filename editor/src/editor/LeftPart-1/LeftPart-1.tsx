import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'src/store/rootReducer'
import messages from '../messages'
import NameSection from '../wrappers/NameSection/NameSection'
import Button from 'src/common/formElements/Button/Button'
import './LeftPart-1.scss'
import { useFetchSites, useGetNewSiteOnClickHandler, useGetSitesItemsListProps } from './LeftPart1-func'
import ItemsList from 'common/ItemsList/ItemsList';
import {useGetSettingsItemsListProps} from '../LeftPart-3/LeftPart-3-func';
import Wrapper from '../../common/Wrapper/Wrapper';
import { MiscTypes } from '../../types/miscTypes'


type LeftPart1PropType = {
    display?: boolean // Показывать ли компонент
}

/** Левая часть первой главной вкладки */
export default function LeftPart1(props: LeftPart1PropType) {
    const {
        display // Показывать ли компонент
    } = props

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Атрибуты обёртки панели
    const CN = 'left-part-1'
    const style = display ? {} : {display: 'none'}

    return (
        <div className={CN} style={style}>
            <NameSection header={messages.SitesPanel.header[lang]}>
                <NewSiteButton />
                <SitesButtons />
            </NameSection>
        </div>
    )
}

/** Компонент кнопки создания нового сайта */
function NewSiteButton() {
    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // id выделенного сайта
    const {currentSiteId} = useSelector((store: AppState) => store.sites)

    // Обработчик щелчка по кнопке
    const onClickHandler = useGetNewSiteOnClickHandler()

    // Атрибуты кнопки
    const attrs: MiscTypes.ObjStringKeyAnyVal = {
        text: messages.SitesPanel.newSiteBtn[lang],
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