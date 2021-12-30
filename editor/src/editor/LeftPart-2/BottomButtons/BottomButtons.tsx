import React from 'react'
import { bottomPanelMessages } from 'messages/bottomPanelMessages'
import useGetMessages from 'messages/fn/useGetMessages'
import SvgIcon from 'common/icons/SvgIcon'
import { setUpperCaseForFirstLetter } from 'utils/stringUtils'
import makeClasses from './BottomButtons-classes'
import { useGetInsideHandler, useIsInsideDisabled } from './fn/insideBtnFns'
// import {
    // useGetClone1Handler,
    // useGetClone2Handler,
    // useGetClone3Handler,
    // useGetDownHandler,
    // useGetRemoveHandler,
    // useGetUpHandler,
    // useGetVisibleHandler,
    // useIsClone1Disabled,
    // useIsClone2Disabled,
    // useIsClone3Disabled,
    // useIsDownDisabled,
    // useIsRemoveDisabled,
    // useIsUpDisabled,
    // useIsVisibleDisabled
// } from './BottomButtons-func'

/* Панель с кнопками манипулирования выделенным компонентом/элементом */
export default function BottomButtons() {
    const CN = makeClasses()

    // ================== >

    const insideDisabled = useIsInsideDisabled()
    const insideHandler = useGetInsideHandler()

    // const upDisabled = useIsUpDisabled()
    // const upHandler = useGetUpHandler()

    // const downDisabled = useIsDownDisabled()
    // const downHandler = useGetDownHandler()

    // ================== >

    // const clone1Disabled = useIsClone1Disabled()
    // const clone1Handler = useGetClone1Handler()

    // const clone2Disabled = useIsClone2Disabled()
    // const clone2Handler = useGetClone2Handler()

    // const clone3Disabled = useIsClone3Disabled()
    // const clone3Handler = useGetClone3Handler()

    // ================== >

    // const removeDisabled = useIsRemoveDisabled()
    // const removeHandler = useGetRemoveHandler()

    // const visibleDisabled = useIsVisibleDisabled()
    // const visibleHandler = useGetVisibleHandler()

    // ================== >

    return (
        <section className={CN.root}>
            <div className={CN.group}>
                <Button btnKey='inside' onClick={insideHandler} disabled={insideDisabled} />
                {/*<Button btnKey='up' onClick={upHandler} disabled={upDisabled} />*/}
                {/*<Button btnKey='down' onClick={downHandler} disabled={downDisabled} />*/}
            </div>
            <div className={CN.group}>
                {/*<Button btnKey='clone1' onClick={clone1Handler} disabled={clone1Disabled} />*/}
                {/*<Button btnKey='clone2' onClick={clone2Handler} disabled={clone2Disabled} />*/}
                {/*<Button btnKey='clone3' onClick={clone3Handler} disabled={clone3Disabled} />*/}
            </div>
            <div className={CN.group}>
                {/*<Button btnKey='remove' onClick={removeHandler} disabled={removeDisabled} />*/}
                {/*<Button btnKey='visible' onClick={visibleHandler} disabled={visibleDisabled} />*/}
            </div>
        </section>
    )
}

type ButtonPropType = {
    btnKey: string
    onClick: () => void
    disabled: boolean
}

/* Кнопка */
function Button(props: ButtonPropType) {
    const { btnKey, onClick, disabled } = props

    const msg = useGetMessages(bottomPanelMessages)
    // @ts-ignore
    const title = msg[btnKey]
    const iconType = 'elBtnSign' + setUpperCaseForFirstLetter(btnKey)

    const CN = makeClasses()

    return (
        <button className={CN.button} title={title} onClick={onClick} disabled={disabled}>
            <SvgIcon type={iconType} />
        </button>
    )
}