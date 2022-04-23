import React from 'react'
import { makeCN } from 'utils/stringUtils'
import './Hr.scss'

type HrPropType = {
    extraClass?: string
}

/** Компонент разделительной линейки */
export default function Hr(props: HrPropType) {
    const {extraClass} = props

    const CN = 'hr'
    const classes = [CN, extraClass]

    return <div className={makeCN(classes)} />
}
