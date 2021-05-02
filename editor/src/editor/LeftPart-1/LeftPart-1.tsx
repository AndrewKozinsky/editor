import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'store/rootReducer'
import messages from '../messages'
import NameSection from '../wrappers/NameSection/NameSection'
import Button from 'common/formElements/Button/Button'
import './LeftPart-1.scss'


type LeftPart1PropType = {
    display?: boolean // Показывать ли компонент
}

export default function LeftPart1(props: LeftPart1PropType) {
    const {
        display // Показывать ли компонент
    } = props

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    const CN = 'left-part-1'

    if (!display) return null

    return (
        <div className={CN}>
            <NameSection header={messages.SitesPanel.header[lang]}>
                <Button text={messages.SitesPanel.newSiteBtn[lang]} icon='btnSignTrash' />
            </NameSection>
        </div>
    )
}