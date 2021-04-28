import { ItemsListPropType } from 'common/ItemsList/ItemsList'
import {useSelector} from 'react-redux';
import {AppState} from '../../store/rootReducer';
import {useEffect, useState} from 'react';
import StoreSettingsTypes from '../../store/settings/settingsTypes';
import messages from '../messages';

export function useGetSettingsItemsListProps(): ItemsListPropType {
    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Это значение нужно брать из Хранилища
    const activeItemId = 0

    // const [props, setProps] = useState<ItemsListPropType>(getItemsListProps(lang, activeItemId))

    /*useEffect(function () {

    }, [lang])*/

    return getItemsListProps(lang, activeItemId)
}

function getItemsListProps(lang: StoreSettingsTypes.EditorLanguage, activeItemId: number): ItemsListPropType {

    const items = [
        {id: 0, name: messages.SettingsPanel.leftMenuItemUser[lang]},
        {id: 1, name: messages.SettingsPanel.leftMenuItemEditor[lang]}
    ]

    return {
        items: items, // Список пунктов
        activeItemId, // id выбранного пункта
        onClick: () => {}
    }
}