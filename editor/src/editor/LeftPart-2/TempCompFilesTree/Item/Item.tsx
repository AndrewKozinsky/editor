import React from 'react'
import SvgIcon from 'common/icons/SvgIcon'
import {
    getTriangleBtnClasses,
    useGetToggleFolder,
    useMarkItemElemWhenItHovered,
    useGetOnClickHandler
} from './Item-func'
import {componentsPanelMessages} from 'messages/componentsPanelMessages'
import TempCompFilesTreeType from '../types'

import './Item.scss'


const CN = 'temp-comp-ft-item'

type ItemPropType = {
    // Массив всех папок и файлов.
    items: TempCompFilesTreeType.Items
    // Данные папки или файла.
    itemData: TempCompFilesTreeType.Item
    // Уровень вложенности папки или файла.
    offset: number
    // Объект с различными свойствами и методами переданными в параметрах FilesTree.
    after: TempCompFilesTreeType.After
}

/** Папка или файл в структуре папок */
export default function Item(props: ItemPropType) {
    const {
        items,
        itemData,
        offset,
        after
    } = props

    // Обработчик наведения и увода мыши на интерактивные элементы
    // При наведении ставится свойство data-ft-hover="1". При уводе удаляется
    // Элементы с таким свойством подсвечиваются при наведении
    const markItemElem = useMarkItemElemWhenItHovered()

    // Хук возвращает обработчик щелчка по элементу
    const onItemClickHandler = useGetOnClickHandler(items, itemData, after)

    return (
        <div
            style={{paddingLeft: offset * 20}}
            className={CN}
            data-ft-item={itemData.uuid}
            onClick={onItemClickHandler}
            onMouseOver={markItemElem}
            onMouseOut={markItemElem}
        >
            <div
                className={`${CN}__inner`}
                data-ft-inner='true'
            >
                <Triangle items={items} itemData={itemData} after={after} />
                <Icon itemData={itemData} />
                {itemData.name}
                <div className={`${CN}__right-part`}>
                    <RightButtons itemData={itemData} after={after} />
                </div>
            </div>
        </div>
    )
}

type TrianglePropType = {
    // Массив всех папок и файлов.
    items: TempCompFilesTreeType.Items
    // Данные папки или файла.
    itemData: TempCompFilesTreeType.Item
    // Объект с различными свойствами и методами переданными в параметрах FilesTree.
    after: TempCompFilesTreeType.After
}

/** Кнопка сворачивания/разворачивания папки. Для файла возвращается пустой элемент. */
function Triangle(props: TrianglePropType) {
    const {
        items,
        itemData,
        after
    } = props

    // Обработчик щелчка по треугольной кнопке сворачивания/разворачивания содержимого папки
    const toggleFolder = useGetToggleFolder(itemData.uuid, items, after)

    // Классы кнопки сворачивания папки
    const triangleBtnClasses = getTriangleBtnClasses(CN, itemData)

    if (itemData.type === 'file') {
        return <div className={triangleBtnClasses} />
    }

    return (
        <button
            className={triangleBtnClasses}
            onClick={toggleFolder}
            data-ft-item-btn='true'
        >
            <SvgIcon type='filesTreeTriangle' />
        </button>
    )
}


type IconPropType = {
    // Данные папки или файла.
    itemData: TempCompFilesTreeType.Item
}

/** Значёк типа элемента. Если файл, то ничего не отрисовывается. */
function Icon(props: IconPropType) {
    const {
        itemData
    } = props

    if (itemData.type === 'file') return null
    return <SvgIcon type='filesTreeFolder' extraClass={`${CN}__folder-sign`} />
}

type RightButtonsPropType = {
    // Данные папки или файла.
    itemData: TempCompFilesTreeType.Item
    // Объект с различными свойствами и методами переданными в параметрах FilesTree.
    after: TempCompFilesTreeType.After
}

/** Значёк типа элемента. Если файл, то ничего не отрисовывается. */
function RightButtons(props: RightButtonsPropType) {
    const {
        itemData,
        after,
    } = props

    if (itemData.type === 'folder' || !itemData.insideButtonAllowed) return null

    return (
        <button
            className={`${CN}__btn ${CN}__inside-btn`}
            data-ft-item-btn='true'
            onClick={(e) => {
                e.stopPropagation()
                after.afterClickInsideBtn(itemData.uuid)
            }}
        >
            <SvgIcon extraClass={`${CN}__icon-inside-btn`} type='filesTreeTorus' />
            <span>{componentsPanelMessages.insideButton}</span>
        </button>
    )
}
