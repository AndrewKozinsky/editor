import React, { ReactElement } from 'react'
import Wrapper from 'common/Wrapper/Wrapper'
import Header from '../../textBlocks/Header/Header'
import useMakeClasses from './ModalShortContent-classes'

type ModalShortContentPropType = {
    header?: string | ReactElement
    text?:string | ReactElement
    bottomElems?: ReactElement[]
}

/* Modal content component with header, text and any number of buttons */
export default function ModalShortContent(props: ModalShortContentPropType) {
    const { header, text, bottomElems } = props

    const CN = useMakeClasses()

    return (
        <section className={CN.root}>
            {header &&
                <Wrapper b={10}>
                    <Header text={header} type='h2' />
                </Wrapper>
            }
            {text &&
                <div className={CN.content}>
                    <p>{text}</p>
                </div>
            }
            {bottomElems &&
                <Wrapper t={15} align='right' gap={10} extraClass={CN.bottom}>
                    {bottomElems}
                </Wrapper>
            }
        </section>
    )
}
