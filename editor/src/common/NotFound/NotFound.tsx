import React from 'react'
import makeClasses from './NotFound-classes'
import SvgIcon from 'common/icons/SvgIcon'
import Wrapper from 'common/Wrapper/Wrapper'
import { notFoundMessages } from 'messages/notFoundMessages'
import useGetMessages from 'messages/fn/useGetMessages'

/* Компонент «Страница не найдена» */
export default function NotFound() {
    const notFoundMsg = useGetMessages(notFoundMessages)

    // Классы компонента
    const CN = makeClasses()

    return (
        <div className={CN.root}>
            <SvgIcon type='logo' />

            <Wrapper t={15}>
                <h1 className={CN.header}>{notFoundMsg.header}</h1>
            </Wrapper>

            <Wrapper t={15}>
                <p>{notFoundMsg.p1}</p>
            </Wrapper>

            <Wrapper t={5}>
                <p>{notFoundMsg.p2}</p>
            </Wrapper>
        </div>
    )
}
