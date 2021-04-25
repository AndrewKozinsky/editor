import React, { ReactElement } from 'react'
import SectionsTabs from 'editor/special/SectionsTabs/SectionsTabs'
import { useGetPageClasses } from './EditorMain-func'
import './EditorMain.scss'


/** Главная страница редактора. */
export default function EditorMain(): ReactElement {

    const CN = 'editor-main'
    // Классы обёртки и видим ли редактор
    const {classes, isVisible} = useGetPageClasses(CN)

    // Ничего не отрисовывать если редактор не должен быть видим.
    if (!isVisible) return null

    return (
        <div className={classes}>
            <div className={`${CN}__left`}>
                <SectionsTabs />
                <p>LeftTabContent</p>
            </div>
            <div className={`${CN}__right`}>
                <p>RightTabContent</p>
            </div>
        </div>
    )
}
