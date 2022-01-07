import React from 'react'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import Button, {ButtonPropType} from 'common/formElements/Button/Button'
import Wrapper from 'common/Wrapper/Wrapper'
import siteTemplateSectionMsg from 'messages/siteTemplateSectionMessages'
import ItemsList from 'common/ItemsList/ItemsList'
import {
    useFetchSiteTemplates,
    useGetNewTemplateOnClickHandler,
    useGetTemplatesItemsListProps
} from './SiteTemplateList-func'


/** Компонент кнопки создания нового сайта */
export function NewTemplateButton() {
    // id выделенного сайта
    const { currentTemplateId } = useGetSitesSelectors().siteTemplatesSection

    // Обработчик щелчка по кнопке
    const onClickHandler = useGetNewTemplateOnClickHandler()

    // Атрибуты кнопки
    const attrs: ButtonPropType = {
        text: siteTemplateSectionMsg.newTemplateBtn,
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
export function TemplatesList() {
    // Получить с сервера список шаблонов подключаемых файлов и поставить в Хранилище
    useFetchSiteTemplates()

    // Аргументы для компонента выводящий список сайтов
    const itemsListProps = useGetTemplatesItemsListProps()

    return (
        <Wrapper t={10}>
            <ItemsList {...itemsListProps}/>
        </Wrapper>
    )
}
