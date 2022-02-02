import React from 'react'
import bottomPanelMsg from 'messages/bottomPanelMessages'
import SvgIcon from 'common/icons/SvgIcon'
import makeClasses from './BottomButtons-classes'
import {
    useIsMoveBtnDisabled,
    useGetMoveHandler,
} from './fn/moveBtnFns'
import { useGetRemoveHandler, useIsRemoveDisabled } from './fn/removeBtnFns'
import { useGetIconType } from './fn/BottomButtons-func'
import { useGetVisibleHandler, useIsVisibleDisabled } from './fn/visibleBtnFns'
import { useGetUpDownHandler, useIsUpDownDisabled } from './fn/upDownBtnFns'
import { useGetCloneHandler, useIsCloneDisabled } from './fn/cloneBtnFns'


/* Панель с кнопками манипулирования выделенным компонентом/элементом */
export default function BottomButtons() {
    const CN = makeClasses()

    // ================== >

    const moveInsideDisabled = useIsMoveBtnDisabled('inside')
    const moveInsideHandler = useGetMoveHandler('inside')

    const moveLeftDisabled = useIsMoveBtnDisabled('left')
    const moveLeftHandler = useGetMoveHandler('left')

    const moveRightDisabled = useIsMoveBtnDisabled('right')
    const moveRightHandler = useGetMoveHandler('right')

    // ================== >

    const upDisabled = useIsUpDownDisabled('up')
    const upHandler = useGetUpDownHandler('up')

    const downDisabled = useIsUpDownDisabled('down')
    const downHandler = useGetUpDownHandler('down')

    // ================== >

    const cloneDisabled = useIsCloneDisabled()
    const clone1Handler = useGetCloneHandler(1)
    const clone2Handler = useGetCloneHandler(2)
    const clone3Handler = useGetCloneHandler(3)

    // ================== >

    const removeDisabled = useIsRemoveDisabled()
    const removeHandler = useGetRemoveHandler()

    const visibleDisabled = useIsVisibleDisabled()
    const visibleHandler = useGetVisibleHandler()

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
