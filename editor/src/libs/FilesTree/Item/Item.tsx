import React, {useEffect} from 'react'
import FilesTreeType from '../types'
import {makeCN} from 'utils/StringUtils'
import SvgIcon from 'common/icons/SvgIcon'
import {
    addNewItem,
    getInnerWrapperClasses,
    getTriangleBtnClasses,
    useGetToggleFolder,
    useMarkItemElemWhenItHovered
} from './Item-func'
import {
    handleDrag,
    handleDragEnd,
    handleDragOver,
    handleDragStart
} from './dragAndDrop'
import './Item.scss'


type ItemPropType = {
    // Массив всех папок и файлов
    items: FilesTreeType.Items
    // Данные папки или файла
    itemData: FilesTreeType.Item
    // Уровень вложенности папки или файла
    offset: number
    // Функция устанавливающая новые данные в Состояние FilesTree
    setItems: FilesTreeType.SetItemsFn,
    // Название новой папки (текст на кнопке и название новой папки)
    newFolderName: string
    // Название нового файла (текст на кнопке и название нового файла)
    newFileName: string
}

/** Папка или файл в структуре папок */
export default function Item(props: ItemPropType) {
    const {
        items,
        itemData,
        offset,
        setItems,
        newFolderName, // Название новой папки
        newFileName, // Название нового файла
    } = props

    return itemData.type === 'folder'
        ? <Folder
            items={items}
            itemData={itemData}
            offset={offset}
            setItems={setItems}
            newFolderName={newFolderName}
            newFileName={newFileName}
        />
        : <File
            items={items}
            itemData={itemData}
            offset={offset}
            setItems={setItems}
            newFolderName={newFolderName}
            newFileName={newFileName}
        />
}

/** Компонент папки в дереве папок и файлов */
function Folder(props: ItemPropType) {
    const {
        items,
        itemData,
        offset,
        setItems,
        newFolderName,
        newFileName
    } = props

    // Обработчик наведения и увода мыши на интерактивные элементы
    // При наведении ставится свойство data-ft-hover="1". При уводе удаляется
    // Элементы с таким свойством подсвечиваются при наведении
    const markItemElem = useMarkItemElemWhenItHovered()

    // Обработчик щелчка по треугольной кнопке сворачивания/разворачивания содержимого папки
    const toggleFolder = useGetToggleFolder(itemData.id, items, setItems)

    const CN = 'ft-item-folder'

    // Классы кнопки сворачивания папки
    const triangleBtnClasses = getTriangleBtnClasses(CN, itemData)

    // Классы внутренней обёртки
    const innerWrapperClasses = getInnerWrapperClasses(CN, itemData)

    return (
        <div
            style={{paddingLeft: offset * 20}}
            className={CN}
            onMouseOver={markItemElem}
            onMouseOut={markItemElem}
            data-ft-item='true'
            data-ft-folder-item={itemData.id}
            draggable='true'
            onDragStart={handleDragStart}
            onDrag={(e: any) => handleDrag(e, itemData, items, setItems)}
            onDragOver={handleDragOver}
            onDragEnd={(e: any) => handleDragEnd(e, itemData, items, setItems)}
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
                        onClick={(e: any) => addNewItem(e, 'folder', itemData, items, setItems, newFolderName)}
                    >
                        <SvgIcon type='filesTreeFolderPlus' />
                    </button>
                    <button
                        className={`${CN}__btn ${CN}__right-btn`}
                        data-ft-item-btn='true'
                        onClick={(e: any) => addNewItem(e, 'file', itemData, items, setItems, newFileName)}
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
        itemData,
        offset,
        setItems,
    } = props

    const CN = 'ft-item-file'

    return (
        <div
            style={{paddingLeft: offset * 20}}
            className={CN}
            data-ft-item='true'
            data-ft-file-item={itemData.id}
            draggable
            onDragStart={handleDragStart}
            onDrag={(e: any) => handleDrag(e, itemData, items, setItems)}
            onDragOver={handleDragOver}
            onDragEnd={(e: any) => handleDragEnd(e, itemData, items, setItems)}
        >
            <div className={`${CN}__inner`}>
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
