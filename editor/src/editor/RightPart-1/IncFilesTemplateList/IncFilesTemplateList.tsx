// import React from 'react'
// import {useSelector} from 'react-redux'
// import {AppState} from 'src/store/rootReducer'
// import {MiscTypes} from 'src/types/miscTypes'
// import messages from '../messages'
// import Button from 'src/common/formElements/Button/Button'
// import Wrapper from 'src/common/Wrapper/Wrapper'
// import ItemsList from 'src/common/ItemsList/ItemsList'
// import {useFetchIncFilesTemplates, useGetNewTemplateOnClickHandler, useGetTemplatesItemsListProps} from './IncFilesTemplateList-func'


/** Компонент кнопки создания нового сайта */
/*export function NewTemplateButton() {
    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // id выделенного сайта
    const {currentTemplateId} = useSelector((store: AppState) => store.sites.incFilesTemplatesSection)

    // Обработчик щелчка по кнопке
    const onClickHandler = useGetNewTemplateOnClickHandler()

    // Атрибуты кнопки
    const attrs: MiscTypes.ObjStringKeyAnyVal = {
        text: messages.IncFilesTemplateSection.newTemplateBtn[lang],
        icon: 'btnSignAdd',
        block: true,
        onClick: onClickHandler
    }
    if (currentTemplateId === '') {
        attrs.color = 'accent'
    }

    return <Button {...attrs} />
}*/

/** Компонент списка сайтов */
/*export function TemplatesList() {
    // Получить с сервера список шаблонов подключаемых файлов и поставить в Хранилище
    useFetchIncFilesTemplates()

    // Аргументы для компонента выводящий список сайтов
    const itemsListProps = useGetTemplatesItemsListProps()

    return (
        <Wrapper t={10}>
            <ItemsList {...itemsListProps}/>
        </Wrapper>
    )
}*/
