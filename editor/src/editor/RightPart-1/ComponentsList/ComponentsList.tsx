import React from 'react'
import FilesTree from 'src/libs/FilesTree/FilesTree/FilesTree'
import items from './items'


type ComponentsSectionPropType = {
    display?: boolean
}

export default function ComponentsList(props: ComponentsSectionPropType) {

    return (
        <FilesTree items={items} openFolderIds={['4', '5']} />
    )
}