import React from 'react'
import layersPanelMsg from 'messages/layersPanelMessages'
import NameSection from '../../../wrappers/NameSection/NameSection'
import Layers from '../Layers/Layers'
import useGetLayersConfig from './useGetLayersConfig'


export default function LayersPanel() {
    const layersConfig = useGetLayersConfig()

    if (!layersConfig.length) return null

    return (
        <NameSection header={layersPanelMsg.header}>
            <Layers config={layersConfig} />
        </NameSection>
    )
}
