import {useSelector} from 'react-redux';
import {AppState} from '../store/rootReducer';
import {EditorSizeMultiplyType, EditorSizeType} from '../store/settings/settingsTypes'


/**
 * Хук возращает строку с размером, которым должен быть компонент.
 * В size Значения: small, middle или big.
 * @param relativeSize — размер, переданный в компонент.
 * Возможно в компонент ничего не передадут если хотят чтобы компонент был размером установленным в интерфейсе по умолчанию.
 */
export function useGetComponentSize(relativeSize?: EditorSizeMultiplyType): EditorSizeType {
    // Размер элементов интерфейса из Хранилища
    const editorSize = useSelector((store: AppState) => store.settings.editorSize)

    // Если в компонент передано значение размера, то возвратить его.
    if (!relativeSize) return editorSize

    // Получение размера элемента относительно текущего размера элементов интерфейса
    return getSize(relativeSize, editorSize)
}

/**
 * Функция возращающая размер компонента относительно текущего размера элементов интрерфейса
 * @param {Number} relativeSize — число обозначающее на сколько размеров относительно текущего размера интерфейса
 * нужно увеличить или уменьшить размер элементов
 * @param {String} editorSize — текущий размер интерфейса
 */
function getSize(relativeSize: EditorSizeMultiplyType, editorSize: EditorSizeType): EditorSizeType {
    // Массив доступных размеров интерфейса
    const editorSizes: EditorSizeType[] = ['tiny', 'small', 'middle', 'big']

    // Индекс текущего размера интерфейса
    const editorSizeEdx = editorSizes.findIndex(size => size === editorSize)

    // Индекс размера, которого должен быть компонент
    const nextEditorSizeIdx: number = editorSizeEdx + relativeSize

    if (nextEditorSizeIdx < 0) {
        return editorSizes[0]
    }
    else if (nextEditorSizeIdx > editorSizes.length - 1) {
        return editorSizes[editorSizes.length - 1]
    }
    else {
        return editorSizes[nextEditorSizeIdx]
    }
}