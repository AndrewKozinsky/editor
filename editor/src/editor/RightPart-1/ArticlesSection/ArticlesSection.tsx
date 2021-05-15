import React from 'react'
import DividedArea from '../DividedArea/DividedArea'
import './ArticlesSection.scss'


type ArticlesSectionPropType = {
    display?: boolean
}

export default function ArticlesSection(props: ArticlesSectionPropType) {

    const {
        display // Показывать ли компонент
    } = props

    const CN = 'articles-section'
    const style = display ? {} : {display: 'none'}

    return (
        <div className={CN} style={style}>
            <DividedArea>
                <p>ArticlesSection</p>
                <p>2</p>
            </DividedArea>
        </div>
    )
}