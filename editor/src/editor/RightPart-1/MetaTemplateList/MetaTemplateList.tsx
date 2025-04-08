import React from 'react'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import Button, {ButtonPropType} from 'common/formElements/Button/Button'
import Wrapper from 'common/Wrapper/Wrapper'
import metaTemplateSectionMsg from 'messages/metaTemplateSectionMessages'
import ItemsList from 'common/ItemsList/ItemsList'
import {
    useFetchMetaTemplates,
    useGetNewTemplateOnClickHandler,
    useGetTemplatesItemsListProps
} from './MetaTemplateList-func'


/** Компонент кнопки создания нового сайта */
export function NewMetaTemplateButton() {
    // id выделенного сайта
    const { currentTemplateId } = useGetSitesSelectors().metaTemplatesSection

    // Обработчик щелчка по кнопке
    const onClickHandler = useGetNewTemplateOnClickHandler()

    // Атрибуты кнопки
    const attrs: ButtonPropType = {
        text: metaTemplateSectionMsg.newTemplateBtn,
        icon: 'btnSignAdd',
        block: true,
        onClick: onClickHandler
    }
    if (currentTemplateId === '') {
        attrs.color = 'accent'
    }

    return <Button {...attrs} />
}

/** Компонент списка шаблонов сайта */
export function MetasTemplateList() {
    // Получить с сервера список шаблонов подключаемых файлов и поставить в Хранилище
    useFetchMetaTemplates()

    // Аргументы для компонента выводящий список сайтов
    const itemsListProps = useGetTemplatesItemsListProps()

    return (
        <Wrapper t={10}>
            <ItemsList {...itemsListProps}/>
        </Wrapper>
    )
}
