import React, { ReactElement } from 'react'
import useMakeClasses from './EditorMain-classes'
import { useGetPageVisibility } from './EditorMain-func'
import EditorPartProvider from 'editor/special/EditorPartProvider/EditorPartProvider'
import SectionsTabs from 'editor/special/SectionsTabs/SectionsTabs'
import Modal from 'common/modalEntities/Modal/Modal'
import withErrorCatcher from 'common/ErrorCatcher/ErrorCatcher'


/** Главная страница редактора. */
function EditorMain(): ReactElement {
    const CN = useMakeClasses()
    // Видим ли редактор
    const isVisible = useGetPageVisibility()

    // Ничего не отрисовывать если редактор не должен быть видим.
    if (!isVisible) return null

    return (
        <>
            <div className={CN.root}>
                <div className={CN.leftPart}>
                    <SectionsTabs />
                    <EditorPartProvider position='left' />
                </div>
                <div className={CN.rightPart}>
                    <EditorPartProvider position='right' />
                </div>
            </div>
            <Modal />
        </>
    )
}


export default withErrorCatcher(EditorMain)