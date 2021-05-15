import React from 'react'
import SvgIcon from 'common/icons/SvgIcon'
import { getTabClasses } from './MainTab-func'
import {useSelector} from 'react-redux'
import {AppState} from 'store/rootReducer'
import { MiscTypes } from 'types/miscTypes'
import './MainTab-func'
import './MainTab.scss'


export type MainTabDataType = {
    title?: string // Подсказка при наведении на вкладку
    iconType: string // Тип значка
    active?: boolean // Выделена ли вкладка
    disabled?: boolean // Заблокирована ли вкладка
    position?: 'top' | 'left' // Положение вкладки влияет на расположение полукруглых элементов
    onClick: () => void // Обработчик щелчка по вкладке
}

type MainTabPropType = {
    tabData: MainTabDataType
}

export default function MainTab(props: MainTabPropType) {

    const {
        title = null,
        iconType,
        active = false,
        disabled = false,
        position = 'top',
        onClick
    } = props.tabData

    const CN = 'main-tab'

    // Размер элементов интерфейса
    const editorSize = useSelector((store: AppState) => store.settings.editorSize)

    const buttonAttrs: MiscTypes.ObjStringKeyAnyVal = {
        title,
        className: getTabClasses(editorSize, active, position),
        onClick
    }
    if (disabled) buttonAttrs.disabled = true

    return (
        <button {...buttonAttrs}>
            <SvgIcon type={iconType} />
            <SvgIcon type='mainTabRoundScion' className={`${CN}__scion`} />
            <SvgIcon type='mainTabRoundScion' className={`${CN}__scion`} />
        </button>
    )
}