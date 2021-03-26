import { ObjStringKeyAnyValType } from "../types/miscTypes"
import {useSelector} from 'react-redux';
import store from 'store/store';
import {AppState} from '../store/rootReducer';
import {EditorSizeType} from '../store/settings/settingsTypes'


/**
 * Хук возращает строку с размером, которым должен быть компонент. Значения: small, middle или big.
 * @param size — размер, переданный в компонент.
 * Возможно в компонент ничего не передадут если хотят чтобы компонент был размером установленным в интерфейсе по умолчанию.
 */
export function useGetComponentSize(size: undefined | EditorSizeType): EditorSizeType {
    // Размер элементов интерфейса из Хранилища
    const editorSize = useSelector((store: AppState) => store.settings.editorSize)

    // Если в компонент передано значение размера, то возвратить его.
    if (size) return size
    // Если нет, то возвратить значение из Хранилища если оно есть.
    else if (editorSize) return editorSize
    // Если в Хранилище такого значения нет, то возратить стандартное значение.
    else return 'small'
}