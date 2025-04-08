import React, { useEffect, useState } from 'react'
import HeaderPage from 'common/HeaderPage/HeaderPage'
import helpTabRegMsg from 'messages/helpSection/helpTabRegMessages'
import useGetHelpSelectors from 'store/help/helpSelectors'
import HelpRegTabContent from '../HelpRegTabContent/SettingsEditorTabContent'
import './RightPart-4.scss'


type RightPart4PropType = {
    display?: boolean
}

/** Правая часть четвёртой главной вкладки */
export default function RightPart4(props: RightPart4PropType) {
    const {
        display // Показывать ли обёртку
    } = props

    // Активная вкладка панели настроек
    const { helpPanelTab } = useGetHelpSelectors()

    // Возвращаемые компоненты
    const [partComponents, setPartComponents] = useState(<></>)

    useEffect(function () {
        // Составление массива из двух элементов. Элементу, который соответствует вкладке, задаётся видимость.
        const parts = ['reg'].map((tabName) => {
            if (tabName === 'reg') {
                return (
                    <HeaderPage
                        headerText={helpTabRegMsg.header}
                        display={tabName === helpPanelTab}
                        key={tabName}
                    >
                        <HelpRegTabContent />
                    </HeaderPage>
                )
            }
        })

        // Поставить элементы в Местное состояние чтобы компонент их вернул
        setPartComponents( <>{parts}</> )
    }, [helpPanelTab])

    const CN = 'right-part-4'
    const style = display ? {} : {display: 'none'}

    return (
        <div className={CN} style={style}>
            {partComponents}
        </div>
    )
}
