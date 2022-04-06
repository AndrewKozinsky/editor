import React from 'react'
import SvgIcon from 'common/icons/SvgIcon'
import iconsCollector from 'common/icons/js/getIcon'
import { MiscTypes } from 'types/miscTypes'
import makeClasses from './MainTab-classes'


export type MainTabDataType = {
    title?: string // Подсказка при наведении на вкладку
    iconType: keyof typeof iconsCollector // Тип значка
    active?: boolean // Выделена ли вкладка
    disabled?: boolean // Заблокирована ли вкладка
    position?: 'top' | 'left' // Положение вкладки влияет на расположение полукруглых элементов
    onClick: () => void // Обработчик щелчка по вкладке
}

type MainTabPropType = {
    tabData: MainTabDataType
}

/** Главная вкладка */
export default function MainTab(props: MainTabPropType) {

    const {
        title = null,
        iconType,
        active = false,
        disabled = false,
        position = 'top',
        onClick
    } = props.tabData

    const CN = makeClasses(active, position)

    const buttonAttrs: MiscTypes.ObjStringKey<any> = {
        title,
        className: CN.tab,
        onClick
    }
    if (disabled) buttonAttrs.disabled = true

    return (
        <button {...buttonAttrs}>
            <SvgIcon type={iconType} baseClass='-icon-fill' />
            <SvgIcon type='mainTabRoundScion' extraClass={CN.scion} />
            <SvgIcon type='mainTabRoundScion' extraClass={CN.scion} />
        </button>
    )
}
