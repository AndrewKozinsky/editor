import getMsgProxy from './fn/msgProxy'

const layersPanelMessages = {
    header: {
        eng: 'Layers',
        rus: 'Слои'
    },
}

const layersPanelMsg = getMsgProxy<typeof layersPanelMessages>(layersPanelMessages)
export default layersPanelMsg