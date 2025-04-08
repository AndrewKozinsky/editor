import React, { SyntheticEvent } from 'react'
import DragFilesTreeType from '../types'
import SvgIcon from 'common/icons/SvgIcon'
import makeClasses from './DnDItem-classes'
import {
    createNewFile,
    createNewFolder,
    useGetToggleFolder,
    useMarkItemElemWhenItHovered,
    useGetOnClickHandler,
    removeItem
} from './Item-func'
import Loader from 'common/misc/Loader/Loader'
import {
    handleDragStart,
    handleDrag,
    handleDragOver,
} from './dragAndDrop'


type ItemPropType = {
    // Массив всех папок и файлов.
    items: DragFilesTreeType.Items
    // Функция устанавливающая массив папок в Хранилище
    setItems: DragFilesTreeType.SetItems
    // Данные папки или файла.
    itemData: DragFilesTreeType.Item
    // Уровень вложенности папки или файла.
    offset: number
    // Объект с различными свойствами и методами переданными в параметрах FilesTree.
    after: DragFilesTreeType.After
}

/** Папка или файл в структуре папок */
export default function Item(props: ItemPropType) {
    const {
        items,
        setItems,
        itemData,
        offset,
        after
    } = props

    const CN = makeClasses(itemData)

    // Обработчик наведения и увода мыши на интерактивные элементы
    // При наведении ставится свойство data-ft-hover="1". При уводе удаляется
    // Элементы с таким свойством подсвечиваются при наведении
    const markItemElem = useMarkItemElemWhenItHovered()

    // Хук возвращает обработчик щелчка по элементу
    const onItemClickHandler = useGetOnClickHandler(items, setItems, itemData, after)

    return (
        <div
            style={{paddingLeft: offset * 20}}
            className={CN.root}
            data-ft-item={itemData.id}
            draggable='true'
            onClick={onItemClickHandler}
            onMouseOver={markItemElem}
            onMouseOut={markItemElem}
            onDragStart={handleDragStart}
            onDrag={(e: SyntheticEvent) => {
                handleDrag(e, itemData, items, setItems, after, 'drag')
            }}
            onDragOver={handleDragOver}
            onDragEnd={(e: SyntheticEvent) => {
                handleDrag(e, itemData, items, setItems, after, 'dragEnd')
            }}
        >
            <div
                className={CN.innerWrapper}
                data-ft-inner='true'
            >
                <PlaceArrow itemData={itemData} />
                <Triangle
                    items={items}
                    setItems={setItems}
                    itemData={itemData}
                    after={after}
                />
                <Icon itemData={itemData} />
                { itemData.name }
                <Loading itemData={itemData} />
                <RightButtons
                    items={items}
                    setItems={setItems}
                    itemData={itemData}
                    after={after}
                />
            </div>
        </div>
    )
}

type TrianglePropType = {
    // Массив всех папок и файлов.
    items: DragFilesTreeType.Items
    // Функция устанавливающая массив папок в Хранилище
    setItems: DragFilesTreeType.SetItems
    // Данные папки или файла.
    itemData: DragFilesTreeType.Item
    // Объект с различными свойствами и методами переданными в параметрах FilesTree.
    after: DragFilesTreeType.After
}

/** Кнопка сворачивания/разворачивания папки. Для файла возвращается пустой элемент. */
function Triangle(props: TrianglePropType) {
    const {
        items,
        setItems,
        itemData,
        after
    } = props

    // Обработчик щелчка по треугольной кнопке сворачивания/разворачивания содержимого папки
    // @ts-ignore
    const toggleFolder = useGetToggleFolder(itemData.id, items, setItems, after)

    const CN = makeClasses(itemData)

    if (itemData.type === 'file') {
        return <div className={CN.triangleBtn} />
    }

    return (
        <button
            className={CN.triangleBtn}
            onClick={toggleFolder}
            data-ft-item-btn='true'
        >
            <SvgIcon type='filesTreeTriangle' />
        </button>
    )
}


type IconPropType = {
    // Данные папки или файла.
    itemData: DragFilesTreeType.Item
}

/** Значок типа элемента. Если файл, то ничего не отрисовывается. */
function Icon(props: IconPropType) {
    const {
        itemData
    } = props

    const CN = makeClasses(itemData)

    if (itemData.type === 'file') return null
    return <SvgIcon type='filesTreeFolder' extraClass={CN.folderSign} />
}

type LoadingPropType = {
    // Данные папки или файла.
    itemData: DragFilesTreeType.Item
}

/** Значок загрузки. */
function Loading(props: LoadingPropType) {
    const { itemData } = props

    const CN = makeClasses(itemData)

    if (itemData.type !== 'file' || !itemData.loading) return null
    return (
        <div className={CN.loaderWrapper}>
            <Loader className={CN.loader} />
        </div>
    )
}

type RightButtonsPropType = {
    // Массив всех папок и файлов.
    items: DragFilesTreeType.Items
    // Функция устанавливающая массив папок в Хранилище
    setItems: DragFilesTreeType.SetItems
    // Данные папки или файла.
    itemData: DragFilesTreeType.Item
    // Объект с различными свойствами и методами переданными в параметрах FilesTree.
    after: DragFilesTreeType.After
}

/** Значок типа элемента. Если файл, то ничего не отрисовывается. */
function RightButtons(props: RightButtonsPropType) {
    const {
        items,
        setItems,
        itemData,
        after,
    } = props

    const CN = makeClasses(itemData)

    const createFile = (
        <button
            className={CN.rightBtn}
            data-ft-item-btn='true'
            onClick={(e: SyntheticEvent) => createNewFile(
                e, itemData as DragFilesTreeType.FolderItem, items, setItems, after
            )}
        >
            <SvgIcon type='filesTreePlus' />
        </button>
    )

    const createFolder = (
        <button
            className={CN.rightBtn}
            data-ft-item-btn='true'
            onClick={(e: SyntheticEvent) => createNewFolder(
                e, itemData as DragFilesTreeType.FolderItem, items, setItems, after
            )}
        >
            <SvgIcon type='filesTreeFolderPlus' />
        </button>
    )

    const deleteItem = (
        <button
            className={CN.rightBtn}
            data-ft-item-btn='true'
            onClick={(e: SyntheticEvent) => removeItem(e, items, setItems, itemData, after)}
        >
            <SvgIcon type='filesTreeTrash' />
        </button>
    )

    if (itemData.type === 'file' && itemData.loading) {
        return null
    }
    else if (itemData.type === 'file') {
        return (
            <div className={CN.rightPart}>
                {deleteItem}
            </div>
        )
    }
    else {
        return (
            <div className={CN.rightPart}>
                {createFile}
                {createFolder}
                {deleteItem}
            </div>
        )
    }
}


type PlaceArrowPropType = {
    // Данные папки или файла
    itemData: DragFilesTreeType.Item
}

/** Полоска указывающая на место, куда будет поставлен перетаскиваемый элемент */
function PlaceArrow(props: PlaceArrowPropType) {
    const { placeMark } = props.itemData

    const CN = makeClasses(props.itemData)

    if (!placeMark || placeMark === 'inside') return null

    return (
        <div className={CN.placeArrow}>
            <SvgIcon type='filesTreePlaceMark' extraClass={CN.placeArrowPointer} />
            <div className={CN.placeArrowLine} />
        </div>
    )
}
