import React from 'react'
import TempCompFilesTree from '../TempCompFilesTree/TempCompFilesTree/TempCompFilesTree'
import {
    useGetAfterCollapseFolder,
    useGetOnClickInsideBtn,
    useGetOnClickNextBtn,
    useGetTempCompsFolders
} from './TempCompList-func'


/** Папки и файлы шаблонов компонентов выбранного сайта */
export default function TempCompList() {

    // Templates component from the Store
    const tempCompsFolders = useGetTempCompsFolders()

    const afterCollapseFolder = useGetAfterCollapseFolder()

    //
    const onClickNextBtn = useGetOnClickNextBtn()
    const onClickInsideBtn = useGetOnClickInsideBtn()

    return (
        <TempCompFilesTree
            items={tempCompsFolders}
            afterCollapseFolder={afterCollapseFolder}
            afterClickNextBtn={onClickNextBtn}
            afterClickInsideBtn={onClickInsideBtn}
        />
    )
}
