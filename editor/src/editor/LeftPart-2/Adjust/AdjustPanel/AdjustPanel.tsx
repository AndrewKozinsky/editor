import React from 'react'
import Hr from 'common/misc/Hr/Hr'
import NameSection from 'editor/wrappers/NameSection/NameSection'
import AdjustTag from '../AdjustTag/AdjustTag'
import AdjustAttrs from '../AdjustAttrs/AdjustAttrs'
import {
    useGetCompAndElemNames,
    useGetContentTypeVisible
} from './AdjustPanel-func'
import './AdjustPanel.scss'

/** Панель настройки выделенного элемента */
export default function AdjustPanel() {
    // Название выделенного компонента и элемента
    const { compName, elemName } = useGetCompAndElemNames()
    if (!compName) return <div />

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
    const contentType = useGetContentTypeVisible()

    if (contentType === 'none') return null

    return (
        <div className='adjust-panel__content'>
            {['tag', 'both'].includes(contentType) && <AdjustTag />}
            {contentType === 'both' && <Hr extraClass='adjust-panel__content-hr' />}
            {['attrs', 'both'].includes(contentType) && <AdjustAttrs />}
        </div>
    )
}
