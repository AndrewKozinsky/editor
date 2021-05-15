import React from 'react'
import {useSelector} from 'react-redux'
import {AppState} from 'store/rootReducer'
import {ObjStringKeyAnyValType} from 'types/miscTypes'
import messages from '../../messages'
import Button from 'common/formElements/Button/Button'
import {useFetchPlugins, useGetNewTemplateOnClickHandler, useGetTemplatesItemsListProps} from './PluginsListSide-func'
import Wrapper from 'common/Wrapper/Wrapper'
import ItemsList from 'common/ItemsList/ItemsList'


/** Компонент кнопки создания нового сайта */
export function NewPluginsButton() {
    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // id выделенного сайта
    const {currentPluginId} = useSelector((store: AppState) => store.sites.pluginsSection)

    // Обработчик щелчка по кнопке
    const onClickHandler = useGetNewTemplateOnClickHandler()

    // Атрибуты кнопки
    const attrs: ObjStringKeyAnyValType = {
        text: messages.PluginsSection.newTemplateBtn[lang],
        icon: 'btnSignAdd',
        block: true,
        onClick: onClickHandler
    }
    if (currentPluginId === '') {
        attrs.color = 'accent'
    }

    return <Button {...attrs} />
}

/** Компонент списка сайтов */
export function PluginsList() {
    // Получить с сервера список шаблонов подключаемых файлов и поставить в Хранилище
    useFetchPlugins()

    // Аргументы для компонента выводящий список сайтов
    const itemsListProps = useGetTemplatesItemsListProps()

    return (
        <Wrapper t={10}>
            <ItemsList {...itemsListProps}/>
        </Wrapper>
    )
}