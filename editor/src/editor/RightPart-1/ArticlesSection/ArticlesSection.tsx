import React from 'react'


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
            ArticlesSection
        </div>
    )
}