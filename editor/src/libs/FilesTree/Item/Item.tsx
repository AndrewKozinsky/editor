import React, {useEffect} from 'react'
import FilesTreeType from '../types'
import {makeCN} from 'utils/StringUtils'
import SvgIcon from 'common/icons/SvgIcon'
import {
    createNewItem,
    getFolderInnerWrapperClasses,
    getFileInnerWrapperClasses,
    getTriangleBtnClasses,
    useGetToggleFolder,
    useMarkItemElemWhenItHovered,
    useGetOnClickHandler
} from './Item-func'
import {
    handleDragStart,
    handleDrag,
    handleDragEnd,
    handleDragOver,
} from './dragAndDrop'
import './Item.scss'


type ItemPropType = {
    // Массив всех папок и файлов.
    items: FilesTreeType.Items
    // Функция устанавливающая новые данные в Состояние FilesTree.
    setItems: FilesTreeType.SetItemsFn,
    // Данные папки или файла.
    itemData: FilesTreeType.Item
    // Uuid выделенной папки или файла.
    activeItemId: FilesTreeType.UuId,
    // Функция изменяющая uuid выделенной папки или файла.
    setActiveItemId: FilesTreeType.SetActiveItemIdFn,
    // Уровень вложенности папки или файла.
    offset: number
    // Объект с различными свойствами и методами переданными в параметрах FilesTree.
    out: FilesTreeType.Out
}

/** Папка или файл в структуре папок */
export default function Item(props: ItemPropType) {
    const {
        items,
        setItems,
        itemData,
        activeItemId,
        setActiveItemId,
        offset,
        out
    } = props

    return itemData.type === 'folder'
        ? <Folder
            items={items}
            setItems={setItems}
            itemData={itemData}
            activeItemId={activeItemId}
            setActiveItemId={setActiveItemId}
            offset={offset}
            out={out}
        />
        : <File
            items={items}
            setItems={setItems}
            itemData={itemData}
            activeItemId={activeItemId}
            setActiveItemId={setActiveItemId}
            offset={offset}
            out={out}
        />
}

/** Компонент папки в дереве папок и файлов */
function Folder(props: ItemPropType) {
    const {
        items,
        setItems,
        itemData,
        activeItemId,
        setActiveItemId,
        offset,
        out
    } = props

    // Обработчик наведения и увода мыши на интерактивные элементы
    // При наведении ставится свойство data-ft-hover="1". При уводе удаляется
    // Элементы с таким свойством подсвечиваются при наведении
    const markItemElem = useMarkItemElemWhenItHovered()

    // Хук возвращает обработчик щелчка по папке
    const onItemClickHandler = useGetOnClickHandler(itemData, setActiveItemId, out)

    // Обработчик щелчка по треугольной кнопке сворачивания/разворачивания содержимого папки
    const toggleFolder = useGetToggleFolder(itemData.uuid, items, setItems, out)

    const CN = 'ft-item-folder'

    // Классы кнопки сворачивания папки
    const triangleBtnClasses = getTriangleBtnClasses(CN, itemData)

    // Классы внутренней обёртки
    const innerWrapperClasses = getFolderInnerWrapperClasses(CN, itemData, activeItemId)

    return (
        <div
            style={{paddingLeft: offset * 20}}
            className={CN}
            data-ft-item='true'
            data-ft-folder-item={itemData.uuid}
            draggable='true'
            onClick={onItemClickHandler}
            onMouseOver={markItemElem}
            onMouseOut={markItemElem}
            onDragStart={handleDragStart}
            onDrag={(e: any) => handleDrag(e, itemData, items, setItems)}
            onDragOver={handleDragOver}
            onDragEnd={(e: any) => handleDragEnd(e, itemData, items, setItems, out)}
        >
            <div
                className={innerWrapperClasses}
                data-ft-inner-folder='true'
            >
                <PlaceArrow itemData={itemData} />
                <button
                    className={triangleBtnClasses}
                    onClick={toggleFolder}
                    data-ft-item-btn='true'
                >
                    <SvgIcon type='filesTreeTriangle' />
                </button>
                <SvgIcon type='filesTreeFolder' className={`${CN}__folder-sign`} />
                {itemData.name}
                <div className={`${CN}__right-part`}>
                    <button
                        className={`${CN}__btn ${CN}__right-btn`}
                        data-ft-item-btn='true'
                        onClick={(e: any) => createNewItem(e, 'folder', itemData, items, setItems, out, setActiveItemId)}
                    >
                        <SvgIcon type='filesTreeFolderPlus' />
                    </button>
                    <button
                        className={`${CN}__btn ${CN}__right-btn`}
                        data-ft-item-btn='true'
                        onClick={(e: any) => createNewItem(e, 'file', itemData, items, setItems, out, setActiveItemId)}
                    >
                        <SvgIcon type='filesTreePlus' />
                    </button>
                </div>
            </div>
        </div>
    )
}


/** Компонент папки в дереве папок и файлов */
function File(props: ItemPropType) {
    const {
        items,
        setItems,
        itemData,
        offset,
        activeItemId,
        setActiveItemId,
        out
    } = props

    // Хук возвращает обработчик щелчка по файлу
    const onItemClickHandler = useGetOnClickHandler(itemData, setActiveItemId, out)

    const CN = 'ft-item-file'

    // Классы внутренней обёртки
    const innerWrapperClasses = getFileInnerWrapperClasses(CN, itemData, activeItemId)

    return (
        <div
            style={{paddingLeft: offset * 20}}
            className={CN}
            data-ft-item='true'
            data-ft-file-item={itemData.uuid}
            onClick={onItemClickHandler}
            draggable
            onDragStart={handleDragStart}
            onDrag={(e: any) => handleDrag(e, itemData, items, setItems)}
            onDragOver={handleDragOver}
            onDragEnd={(e: any) => handleDragEnd(e, itemData, items, setItems, out)}
        >
            <div className={innerWrapperClasses}>
                <PlaceArrow itemData={itemData} />
                {itemData.name}
            </div>
        </div>
    )
}


type PlaceArrowPropType = {
    // Данные папки или файла
    itemData: FilesTreeType.Item
}

/** Полоска указывающая на место, куда будет поставлен перетаскиваемый элемент */
function PlaceArrow(props: PlaceArrowPropType) {
    const { placeMark } = props.itemData

    const CN = 'ft-place-arrow'
    const classes = [CN]
    if (placeMark === 'before') classes.push(`${CN}--before`)
    if (placeMark === 'after') classes.push(`${CN}--after`)

    if (!placeMark || placeMark === 'inside') return null

    return (
        <div className={makeCN(classes)}>
            <SvgIcon type='filesTreePlaceMark' className={`${CN}__pointer`} />
            <div className={`${CN}__line`} />
        </div>
    )
}
