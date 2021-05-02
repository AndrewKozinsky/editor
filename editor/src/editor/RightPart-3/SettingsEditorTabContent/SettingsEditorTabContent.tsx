import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {AppState} from 'store/rootReducer'
import messages from '../messages'
import Header from 'common/textBlocks/Header/Header'
import Wrapper from 'common/Wrapper/Wrapper'
import LanguageSection from '../LanguageSection/LanguageSection'
import ThemeSection from '../ThemeSection/ThemeSection'
import SizeSection from '../SizeSection/SizeSection'

export default function SettingsEditorTabContent() {

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    return (
        <div>
            <Header text={messages.EditorTabContent.header[lang]} type='h2' />

            <Wrapper t={10}>
                <LanguageSection />
            </Wrapper>

            <Wrapper t={20}>
                <ThemeSection />
            </Wrapper>

            <Wrapper t={20}>
                <SizeSection />
            </Wrapper>

        </div>
    )
}
