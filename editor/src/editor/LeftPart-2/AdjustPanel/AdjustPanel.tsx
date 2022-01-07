import React from 'react'
import NameSection from '../../wrappers/NameSection/NameSection'
import Adjust from '../Adjust/Adjust'
import { useGetCompAndElemNames } from './AdjustPanel-func'
import './AdjustPanel.scss'

/** Панель настройки выделенного элемента */
export default function AdjustPanel() {

    const { compName, elemName } = useGetCompAndElemNames()
    if (!compName) return null

    return (
        <NameSection header={compName}>
            <SubHeader subheader={elemName} />
            <Adjust />
        </NameSection>
    )
}

type SubHeaderPropType = {
    subheader: string
}

/** Название выделенного элемента */
function SubHeader(props: SubHeaderPropType) {
    const { subheader } = props

    if (!subheader) return null

    return <h3 className='adjust-panel__subheader'>{subheader}</h3>
}
