import { useSelector } from 'react-redux'
import { AppState } from 'store/rootReducer'
import store from 'store/store'
import StoreSitesTypes from 'store/site/sitesTypes'
import messages from '../messages';
import React, {useEffect, useState} from 'react';
import {ObjStringKeyAnyValType} from '../../../types/miscTypes';
import LeftPart1 from '../../LeftPart-1/LeftPart-1';
import LeftPart2 from '../../LeftPart-2/LeftPart-2';
import LeftPart3 from '../../LeftPart-3/LeftPart-3';
import RightPart1 from '../RightPart-1/RightPart-1';
import RightPart2 from '../../RightPart-2/RightPart-2';
import RightPart3 from '../../RightPart-3/RightPart-3/RightPart-3';

/** Функция возвращает заголовок правой части страницы вкладки Сайты */
export function useGetHeaderText() {
    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Данные Хранилища
    const sitesRoot = useSelector((store: AppState) => store.sites)
    // Номер текущей вкладки
    const {rightMainTab} = sitesRoot

    // Если на первой вкладке, то получить и вернуть название выбранного сайта
    if (rightMainTab === 0) {
        // id текущего сайта и массив сайтов
        const {currentSiteId, sites} = sitesRoot

        // Найти сайт с указанным id
        const site = sites.find((site: StoreSitesTypes.SiteType) => site.id === currentSiteId)

        // Если сайт найден, то вернуть его имя
        if (site) return site.name
        // В противном случае вернуть «Новый сайт»
        else return messages.SiteSection.headerNewSite[lang]
    }
    // Если на первой вкладке, то получить и вернуть название выбранного шаблонов подключаемых файлов
    else if (rightMainTab === 1) {
        // id текущего шаблона подключаемых файлов и массив шаблонов подключаемых файлов
        const {currentPluginId, plugins} = sitesRoot.pluginsSection

        // Найти шаблон с указанным id
        const template = plugins.find((template: StoreSitesTypes.PluginType) => {
            return template.id === currentPluginId
        })

        // Если шаблон найден, то вернуть его имя
        if (template) return template.name
        // В противном случае вернуть «Новый шаблон»
        else return messages.PluginsSection.headerNewPlugin[lang]
    }

    return 'Entitle'
}



