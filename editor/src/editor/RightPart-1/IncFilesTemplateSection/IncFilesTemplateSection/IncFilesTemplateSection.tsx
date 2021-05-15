import React from 'react'
import { useSelector } from 'react-redux';
import { AppState } from 'store/rootReducer'
import DividedArea from '../../DividedArea/DividedArea'
import IncFilesTemplateForm from '../IncFilesTemplateForm/IncFilesTemplateForm'
import { NewTemplateButton, TemplatesList } from '../IncFilesTemplateList/IncFilesTemplateList';
import './IncFilesTemplateSection.scss'


type PluginSectionPropType = {
    display?: boolean
}

export default function IncFilesTemplateSection(props: PluginSectionPropType) {

    const {
        display // Показывать ли компонент
    } = props

    // id выделенного шаблона подключаемых файлов
    const {currentTemplateId} = useSelector((store: AppState) => store.sites.incFilesTemplatesSection)

    const CN = 'inc-files-template-section'
    const style = display ? {} : {display: 'none'}

    return (
        <div className={CN} style={style}>
            <DividedArea>
                <>
                    <NewTemplateButton />
                    <TemplatesList />
                </>
                {currentTemplateId !== null && <IncFilesTemplateForm />}
            </DividedArea>
        </div>
    )
}