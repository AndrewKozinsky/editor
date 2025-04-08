import React, {ReactElement} from 'react'
import Header from '../textBlocks/Header/Header'
import makeClasses from './HeaderPage-classes'


type HeaderPagePropType = {
    headerText: string | ReactElement
    display?: boolean
    children: ReactElement | ReactElement[]
}

/** Обёртка страницы с заголовком */
export default function HeaderPage(props: HeaderPagePropType) {
    const {
        headerText,
        display = false, // Показывать ли компонент
        children
    } = props

    const CN = makeClasses()

    let content: ReactElement

    if (Array.isArray(children)) {
        content = (
            <div className={CN.contentDivided}>
                <div className={CN.contentDividedLeft}>
                    {children[0]}
                </div>
                <div className={CN.contentDividedCenter} />
                <div className={CN.contentDividedRight}>
                    {children[1]}
                </div>
            </div>
        )
    }
    else {
        content = (
            <div className={CN.contentSingle}>
                {children}
            </div>
        )
    }

    const style = display ? {} : {display: 'none'}

    return (
        <div className={CN.root} style={style}>
            <div className={CN.headerWrapper}>
                <Header text={headerText} type='h2'/>
            </div>
            {content}
        </div>
    )
}
