import React, {useState} from 'react'
import bottomPanelMsg from 'messages/bottomPanelMessages'
import SvgIcon from 'common/icons/SvgIcon'
import makeClasses, {makeAttrBtnClasses} from './BottomButtons-classes'
import {
    moveItem,
    useIsMoveBtnDisabled
} from './fn/moveBtnFns'
import { removeItem, useIsRemoveDisabled } from './fn/removeBtnFns'
import { useGetIconType } from './fn/BottomButtons-func'
import { useGetUniversalHandler } from './fn/universalHandler'
import { useIsVisibleDisabled, visibleItem } from './fn/visibleBtnFns'
import { upDownItem, useIsUpDownDisabled } from './fn/upDownBtnFns'
import {cloneItem, useIsCloneDisabled, useManageAttrBtnStatus} from './fn/cloneBtnFns'


/* Панель с кнопками манипулирования выделенным компонентом/элементом */
export default function BottomButtons() {
    const CN = makeClasses()

    // ================== >

    const moveInsideDisabled = useIsMoveBtnDisabled('inside')
    const moveInsideHandler = useGetUniversalHandler(moveItem('inside'))

    const moveLeftDisabled = useIsMoveBtnDisabled('left')
    const moveLeftHandler = useGetUniversalHandler(moveItem('left'))

    const moveRightDisabled = useIsMoveBtnDisabled('right')
    const moveRightHandler = useGetUniversalHandler(moveItem('right'))

    // ================== >

    const upDisabled = useIsUpDownDisabled('up')
    const upHandler = useGetUniversalHandler(upDownItem('up'))

    const downDisabled = useIsUpDownDisabled('down')
    const downHandler = useGetUniversalHandler(upDownItem('down'))

    // ================== >

    const [isAttrsBtnOn, setIsAttrsBtnOn] = useManageAttrBtnStatus()

    const cloneDisabled = useIsCloneDisabled()
    const cloneElemHandler = useGetUniversalHandler(
        cloneItem({cloneAttrs: isAttrsBtnOn})
    )
    const cloneElemWithChildrenHandler = useGetUniversalHandler(
        cloneItem({cloneChildren: true, cloneAttrs: isAttrsBtnOn})
    )

    // ================== >

    const removeDisabled = useIsRemoveDisabled()
    const removeHandler = useGetUniversalHandler(removeItem)

    const visibleDisabled = useIsVisibleDisabled()
    const visibleHandler = useGetUniversalHandler(visibleItem)

    // ================== >

    return (
        <section className={CN.root}>
            <div className={CN.group}>
                <Button btnKey='moveInside' onClick={moveInsideHandler} disabled={moveInsideDisabled} />
                <Button btnKey='moveLeft' onClick={moveLeftHandler} disabled={moveLeftDisabled} />
                <Button btnKey='moveRight' onClick={moveRightHandler} disabled={moveRightDisabled} />
            </div>
            <div className={CN.group}>
                <Button btnKey='up' onClick={upHandler} disabled={upDisabled} />
                <Button btnKey='down' onClick={downHandler} disabled={downDisabled} />
            </div>
            <div className={CN.group}>
                <Button btnKey='clone' onClick={cloneElemHandler} disabled={cloneDisabled} />
                <Button btnKey='cloneWithChildren' onClick={cloneElemWithChildrenHandler} disabled={cloneDisabled} />
                <AttrsButton isAttrsBtnOn={isAttrsBtnOn} setIsAttrsBtnOn={setIsAttrsBtnOn} />
            </div>
            <div className={CN.group}>
                <Button btnKey='remove' onClick={removeHandler} disabled={removeDisabled} />
                <Button btnKey='visible' onClick={visibleHandler} disabled={visibleDisabled} />
            </div>
        </section>
    )
}

type ButtonPropType = {
    btnKey: string // Тип значка/тип подсказки при наведении на кнопку
    onClick?: () => void // Обработчик нажатия на кнопку
    disabled?: boolean// Заблокирована ли кнопка
}

/* Стандартная кнопка */
function Button(props: ButtonPropType) {
    const { btnKey, onClick, disabled } = props

    // @ts-ignore
    const title = bottomPanelMsg[btnKey]
    const iconType = useGetIconType(btnKey)

    const CN = makeClasses()

    return (
        <button className={CN.button} title={title} onClick={onClick} disabled={disabled}>
            <SvgIcon type={iconType} />
        </button>
    )
}


type AttrsButtonPropType = {
    isAttrsBtnOn: boolean // Включено ли копирование атрибутов
    setIsAttrsBtnOn: (isBtnOn: boolean) => void // Обработчик нажатия на кнопку
}

/* Кнопка включающая/выключающая копирование атрибутов выделенного элемента при создании дубликата */
function AttrsButton(props: AttrsButtonPropType) {
    const { isAttrsBtnOn, setIsAttrsBtnOn } = props

    return (
        <button
            className={makeAttrBtnClasses(isAttrsBtnOn)}
            title={bottomPanelMsg.cloneWithAttrs}
            onClick={() => {
                setIsAttrsBtnOn(!isAttrsBtnOn)
            }}
        >
            ATR
        </button>
    )
}
