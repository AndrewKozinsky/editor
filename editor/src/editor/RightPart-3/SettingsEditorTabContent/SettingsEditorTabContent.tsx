import React from 'react'
import Wrapper from 'common/Wrapper/Wrapper'
import LanguageSection from '../LanguageSection/LanguageSection'
import ThemeSection from '../ThemeSection/ThemeSection'
import SizeSection from '../SizeSection/SizeSection'

export default function SettingsEditorTabContent() {
    return (
        <div>
            <Wrapper>
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