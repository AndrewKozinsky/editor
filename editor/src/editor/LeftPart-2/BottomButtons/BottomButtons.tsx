import React from 'react'
import bottomPanelMsg from 'messages/bottomPanelMessages'
import SvgIcon from 'common/icons/SvgIcon'
import makeClasses from './BottomButtons-classes'
import {
    moveItem,
    useIsMoveBtnDisabled
} from './fn/moveBtnFns'
import {
    removeItem,
    useIsRemoveDisabled
} from './fn/removeBtnFns'
import { useGetIconType } from './fn/BottomButtons-func'
import {
    useIsVisibleDisabled,
    changeSelectedItemVisibility
} from './fn/visibleBtnFns'
import {
    upDownItem,
    useIsUpDownDisabled
} from './fn/upDownBtnFns'
import {
    cloneItem,
    useIsCloneDisabled
} from './fn/cloneBtnFns'


/* Панель с кнопками манипулирования выделенным компонентом/элементом */
export default function BottomButtons() {
    const CN = makeClasses()

    const moveInsideDisabled = useIsMoveBtnDisabled('inside')
    const moveLeftDisabled = useIsMoveBtnDisabled('left')
    const moveRightDisabled = useIsMoveBtnDisabled('right')

    const upDisabled = useIsUpDownDisabled('up')
    const downDisabled = useIsUpDownDisabled('down')

    const cloneDisabled = useIsCloneDisabled()

    const removeDisabled = useIsRemoveDisabled()
    const visibleDisabled = useIsVisibleDisabled()

    return (
        <section className={CN.root}>
            <div className={CN.group}>
                <Button
                    btnKey='moveInside'
                    onClick={() => moveItem('inside')}
                    disabled={moveInsideDisabled}
                />
                <Button
                    btnKey='moveLeft'
                    onClick={() => moveItem('left')}
                    disabled={moveLeftDisabled}
                />
                <Button
                    btnKey='moveRight'
                    onClick={() => moveItem('right')}
                    disabled={moveRightDisabled}
                />
            </div>
            <div className={CN.group}>
                <Button
                    btnKey='up'
                    onClick={() => upDownItem('up')}
                    disabled={upDisabled}
                />
                <Button
                    btnKey='down'
                    onClick={() => upDownItem('down')}
                    disabled={downDisabled}
                />
            </div>
            <div className={CN.group}>
                <Button
                    btnKey='clone'
                    onClick={() => cloneItem({})}
                    disabled={cloneDisabled}
                />
                <Button
                    btnKey='cloneWithChildren'
                    onClick={() => cloneItem({cloneChildren: true})}
                    disabled={cloneDisabled}
                />
            </div>
            <div className={CN.group}>
                <Button
                    btnKey='remove'
                    onClick={removeItem}
                    disabled={removeDisabled}
                />
                <Button
                    btnKey='visible'
                    onClick={changeSelectedItemVisibility}
                    disabled={visibleDisabled}
                />
            </div>
        </section>
    )
}

type ButtonPropType = {
    btnKey: string // Тип значка/тип подсказки при наведении на кнопку
    onClick?: (e: any) => void // Обработчик нажатия на кнопку
    disabled?: boolean // Заблокирована ли кнопка
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
