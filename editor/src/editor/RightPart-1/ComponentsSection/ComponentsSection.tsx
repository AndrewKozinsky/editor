import React from 'react'
import DividedArea from '../DividedArea/DividedArea'
import FilesTree from 'src/libs/FilesTree/FilesTree/FilesTree'
import items from './items'
import './ComponentsSection.scss'


type ComponentsSectionPropType = {
    display?: boolean
}

export default function ComponentsSection(props: ComponentsSectionPropType) {

    const {
        display // Показывать ли компонент
    } = props

    const CN = 'components-section'
    const style = display ? {} : {display: 'none'}

    return (
        <div className={CN} style={style}>
            <DividedArea>
                <FilesTree items={items} openFolderIds={['4', '5']} />
                <p>2</p>
            </DividedArea>
        </div>
    )
}