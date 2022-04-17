import React from 'react'
import layersPanelMsg from 'messages/layersPanelMessages'
import NameSection from 'editor/wrappers/NameSection/NameSection'
import useGetArticleSelectors from 'store/article/articleSelectors'
import Layers from '../Layers/Layers'
import useGetLayersConfig from './useGetLayersConfig'

/** Панель слоёв */
export default function LayersPanel() {
    const { articleId } = useGetArticleSelectors()
    const layersConfig = useGetLayersConfig()

    if (!articleId || !layersConfig.length) return null

    return (
        <NameSection header={layersPanelMsg.header} contentId='layersContentWrapper'>
            <Layers config={layersConfig} />
        </NameSection>
    )
}
