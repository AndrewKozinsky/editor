import React from 'react'
import { useSelector } from 'react-redux';
import { AppState } from 'store/rootReducer'
import DividedArea from '../../DevidedArea/DividedArea'
import CurrentPluginsForm from '../CurrentPluginsForm/CurrentPluginsForm'
import { NewPluginsButton, PluginsList } from '../PluginsListSide/PluginsListSide'
import './PluginsSection.scss'


type PluginSectionPropType = {
    display?: boolean
}

export default function PluginsSection(props: PluginSectionPropType) {

    const {
        display // Показывать ли компонент
    } = props

    // id выделенного шаблона подключаемых файлов
    const {currentPluginId} = useSelector((store: AppState) => store.sites.pluginsSection)

    const CN = 'plugins-section'
    const style = display ? {} : {display: 'none'}

    return (
        <div className={CN} style={style}>
            <DividedArea>
                <>
                    <NewPluginsButton />
                    <PluginsList />
                </>
                {currentPluginId !== null && <CurrentPluginsForm />}
            </DividedArea>
        </div>
    )
}