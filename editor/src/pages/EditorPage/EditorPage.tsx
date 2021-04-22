import React, { ReactElement } from 'react'
import { useGetPageClasses } from './EditorPage-func'
import './EditorPage.scss'


/** Главная страница приложения. */
export default function EditorPage(): ReactElement {

    const CN = 'editor-page'
    const {classes, isVisible} = useGetPageClasses(CN)

    if (!isVisible) return null

    return (
        <div className={classes}>
            <span>EditorPage</span>
        </div>
    )
}
