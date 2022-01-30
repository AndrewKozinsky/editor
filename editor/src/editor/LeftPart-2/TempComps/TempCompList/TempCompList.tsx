import React from 'react'
import componentsPanelMsg from 'messages/componentsPanelMessages'
import TempCompFilesTree from '../TempCompsTree/TempCompFilesTree/TempCompFilesTree'
import {
    useGetTempCompsFolders,
    useGetAfterCollapseFolder,
    useGetOnClickBeforeBtn,
    useGetOnClickInsideBtn,
    useIsInsideButtonAllowed,
} from './TempCompList-func'
import NameSection from '../../../wrappers/NameSection/NameSection'


/** Папки и файлы шаблонов компонентов выбранного сайта */
export default function TempCompList() {

    // Get and prepare templates array for <TempCompFilesTree>
    const tempCompsFolders = useGetTempCompsFolders()

    const btnInsideAllowed = useIsInsideButtonAllowed()

    // The function runs after folder was open or collapsed
    const afterCollapseFolder = useGetAfterCollapseFolder()

    // On click handlers
    const onClickBeforeBtn = useGetOnClickBeforeBtn('before')
    const onClickAfterBtn = useGetOnClickBeforeBtn('after')
    const onClickInsideBtn = useGetOnClickInsideBtn()

    return (
        <NameSection header={componentsPanelMsg.header}>
            <TempCompFilesTree
                items={tempCompsFolders}
                btnInsideAllowed={btnInsideAllowed}
                afterCollapseFolder={afterCollapseFolder}
                afterClickBeforeBtn={onClickBeforeBtn}
                afterClickAfterBtn={onClickAfterBtn}
                afterClickInsideBtn={onClickInsideBtn}
            />
        </NameSection>
    )
}