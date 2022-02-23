import React from 'react'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import articleSectionMsg from 'messages/articleSectionMessages'
import Wrapper from 'common/Wrapper/Wrapper'
import ArtFolderForm from '../ArtFolderForm/FolderForm/ArtFolderForm'
import ArtForm from '../ArtForm/ArtForm/ArtForm'
import EditArticleSection from '../ArtForm/EditArticleSection/EditArticleSection'
import MetaSection from '../ArtForm/MetaSection/MetaSection'
import './ArticleSection.scss'


/**
 * Компонент показывает или форму для редактирования папки
 * или для редактирования статьи в зависимости от выбранного элемента
 */
export default function ArticleSection() {
    // Тип выбранного элемента в дереве папок и файлов
    const { currentArtItemType } = useGetSitesSelectors().articleSection

    if (currentArtItemType === 'folder') {
        return <ArtFolderForm />
    }
    else if (currentArtItemType === 'file') {
        return (
            <>
                <ArtSectionHeader text={articleSectionMsg.mainSection} />
                <ArtForm />
                <EditArticleSection />
                <Wrapper t={20}>
                    <ArtSectionHeader text={articleSectionMsg.metaSection} />
                    <MetaSection />
                </Wrapper>
            </>
        )
    }

    return null
}


type ArtSectionHeaderPropType = {
    text: string
}

function ArtSectionHeader(props: ArtSectionHeaderPropType) {
    const { text } = props

    const CN = 'article-section'
    return <h3 className={CN + '__header'}>{text}</h3>
}