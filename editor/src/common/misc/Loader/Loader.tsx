import React from 'react'
import makeClasses from './Loader-classes'


type LoaderPropType = {
    className?: string // Дополнительный класс обёртки
}

/** Компонент загрузчика */
export default function Loader(props: LoaderPropType) {
    const { className } = props

    // Классы компонента
    const CN = makeClasses(className)

    return (
        <div className={CN.root}>
            <svg className={CN.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34">
                <circle strokeWidth="2" cx="17" cy="17" r="16" fill='none' />
                <path d="M17,6.03961325e-14 L17,2 L17,2 C8.71572875,2 2,8.71572875 2,17 C2,17.336312 2.011068,17.670039 2.03285964,18.0008365 L0.0289642667,18.0007012 C0.00974382409,17.6695881 0,17.3359319 0,17 C0,7.61115925 7.61115925,6.03961325e-14 17,6.03961325e-14 Z" fillRule="nonzero" />
            </svg>
        </div>
    )
}
