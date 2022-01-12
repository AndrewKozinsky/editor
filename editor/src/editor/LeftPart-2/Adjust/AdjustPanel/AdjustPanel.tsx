import React from 'react'
import Hr from 'common/misc/Hr/Hr'
import NameSection from '../../../wrappers/NameSection/NameSection'
import AdjustAttrs from '../AdjustAttrs/AdjustAttrs'
import AdjustTag from '../AdjustTag/AdjustTag'
import { useGetCompAndElemNames, useGetContentTypeVisible } from './AdjustPanel-func'
import './AdjustPanel.scss'

/** Панель настройки выделенного элемента */
export default function AdjustPanel() {
    // Название выделенного компонента и элемента
    const { compName, elemName } = useGetCompAndElemNames()
    if (!compName) return null

    return (
        <NameSection header={compName}>
            <SubHeader subheader={elemName} />
            <Content />
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

function Content() {
    // Какие компоненты можно показывать?
    const contentType = useGetContentTypeVisible() //

    if (contentType === 'none') {
        return null
    }
    else if(contentType === 'tag') {
        return <AdjustTag />
    }
    else if(contentType === 'attrs') {
        return <AdjustAttrs />
    }
    else if(contentType === 'both') {
        return (
            <div className='adjust-panel__content'>
                <AdjustTag />
                <Hr extraClass='adjust-panel__content-hr' />
                <AdjustAttrs />
            </div>
        )
    }
}