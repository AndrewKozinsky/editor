import React from 'react'
import getMsgProxy from './fn/msgProxy'


// Секция «Цветовая тема»
const themeSectionMessages = {
    themeRadiosHeader: {
        eng: 'Color theme',
        rus: 'Цветовая схема'
    },
    lightLabel: {
        eng: 'Light',
        rus: 'Светлая'
    },
    darkLabel: {
        eng: 'Dark',
        rus: 'Тёмная'
    },
    header: {
        eng: <>Page not found</>,
        rus: <>Страница не найдена</>
    }
}

const themeSectionMsg = getMsgProxy<typeof themeSectionMessages>(themeSectionMessages)
export default themeSectionMsg