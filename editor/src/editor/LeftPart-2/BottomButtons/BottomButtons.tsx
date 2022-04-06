import React from 'react'
import bottomPanelMsg from 'messages/bottomPanelMessages'
import SvgIcon from 'common/icons/SvgIcon'
import makeClasses from './BottomButtons-classes'
import {
    moveItem,
    useIsMoveBtnDisabled
} from './fn/moveBtnFns'
import { removeItem, useIsRemoveDisabled } from './fn/removeBtnFns'
import { useGetIconType } from './fn/BottomButtons-func'
import { useGetUniversalHandler } from './fn/universalHandler'
import { useIsVisibleDisabled, visibleItem } from './fn/visibleBtnFns'
import { upDownItem, useIsUpDownDisabled } from './fn/upDownBtnFns'
import { cloneItem, useIsCloneDisabled } from './fn/cloneBtnFns'


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

    const cloneDisabled = useIsCloneDisabled()
    const clone1Handler = useGetUniversalHandler(cloneItem(1))
    const clone2Handler = useGetUniversalHandler(cloneItem(2))
    const clone3Handler = useGetUniversalHandler(cloneItem(3))

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
                <Button btnKey='clone1' onClick={clone1Handler} disabled={cloneDisabled} />
                <Button btnKey='clone2' onClick={clone2Handler} disabled={cloneDisabled} />
                <Button btnKey='clone3' onClick={clone3Handler} disabled={cloneDisabled} />
            </div>
            <div className={CN.group}>
                <Button btnKey='remove' onClick={removeHandler} disabled={removeDisabled} />
                <Button btnKey='visible' onClick={visibleHandler} disabled={visibleDisabled} />
            </div>
        </section>
    )
}

type ButtonPropType = {
    btnKey: string
    onClick?: () => void
    disabled?: boolean
}

/* Кнопка */
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
