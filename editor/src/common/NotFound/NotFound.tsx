import React from 'react'
import SvgIcon from 'common/icons/SvgIcon'
import Wrapper from 'common/Wrapper/Wrapper'
import { makeCN } from 'utils/StringUtils'
import { notFoundJSXMessages } from 'src/messages/notFoundMessages'
import './NotFound.scss'


export default function NotFound() {
    // Класс обёртки
    const CN = 'not-found'

    // Классы заголовка
    const headerClasses = [`${CN}__header`, `${CN}__header`]

    return (
        <div className={CN}>
            <SvgIcon type='logo' />

            <Wrapper t={15}>
                <h1 className={makeCN(headerClasses)}>{notFoundJSXMessages.header}</h1>
            </Wrapper>

            <Wrapper t={15}>
                <p>{notFoundJSXMessages.p1}</p>
            </Wrapper>

            <Wrapper t={5}>
                <p>{notFoundJSXMessages.p2}</p>
            </Wrapper>
        </div>
    )
}
