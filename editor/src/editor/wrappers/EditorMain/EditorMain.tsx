import React, { ReactElement } from 'react'
import { useGetPageClasses } from './EditorMain-func'
import './EditorMain.scss'


/** Главная страница приложения. */
export default function EditorMain(): ReactElement {

    const CN = 'editor-main'
    const {classes, isVisible} = useGetPageClasses(CN)

    if (!isVisible) return null

    return (
        <div className={classes}>
            <span>EditorPage</span>
        </div>
    )
}
