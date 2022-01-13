import React, {ReactNode} from 'react'
import makeClasses from './Item-classes'
import SvgIcon from 'common/icons/SvgIcon'
import {
    useGetToggleFolder,
    useGetOnClickHandler
} from './Item-func'
import TempCompFilesTreeType from '../types'
import componentsPanelMsg from 'messages/componentsPanelMessages'


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

    const CN = makeClasses()

    // Хук возвращает обработчик щелчка по элементу
    const onItemClickHandler = useGetOnClickHandler(items, itemData, after)

    return (
        <div
            style={{paddingLeft: offset * 20}}
            className={CN.root}
            onClick={onItemClickHandler}
        >
            <div className={CN.inner}>
                <Triangle items={items} itemData={itemData} after={after} />
                <Icon itemData={itemData} />
                <Circles itemData={itemData} />
                <p className={`${CN}__item-name`}>{itemData.name}</p>
                <RightButtons itemData={itemData} after={after} />
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

    const CN = makeClasses(itemData)

    // Обработчик щелчка по треугольной кнопке сворачивания/разворачивания содержимого папки
    const toggleFolder = useGetToggleFolder(itemData, items, after)

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
    itemData: TempCompFilesTreeType.Item
}

/** Значок типа элемента. Если файл, то ничего не отрисовывается. */
function Icon(props: IconPropType) {
    const {
        itemData
    } = props

    const CN = makeClasses()

    if (itemData.type === 'file') return null
    return <SvgIcon type='filesTreeFolder' extraClass={CN.folderSign} />
}


type CirclesPropType = {
    // Данные папки или файла.
    itemData: TempCompFilesTreeType.Item
}

// TODO Что делает эта функция?
function Circles(props: CirclesPropType) {
    const { itemData } = props

    const CN = makeClasses(itemData)

    return (
        <div className={CN.circles}>
            <div className={CN.afterCircle} />
            <div className={CN.afterCircle} />
            <div className={CN.insideCircle} />
        </div>
    )
}

type RightButtonsPropType = {
    // Данные папки или файла.
    itemData: TempCompFilesTreeType.Item
    // Объект с различными свойствами и методами переданными в параметрах FilesTree.
    after: TempCompFilesTreeType.After
}

/** Значок типа элемента. Если файл, то ничего не отрисовывается. */
function RightButtons(props: RightButtonsPropType) {
    const {
        itemData,
        after,
    } = props

    const CN = makeClasses(itemData)

    if (itemData.type === 'folder' || !itemData.afterButtonAllowed && !itemData.insideButtonAllowed) {
        return null
    }

    const afterButtons: ReactNode[] = []
    if (itemData.afterButtonAllowed) {
        afterButtons.push(
            <button
                className={CN.afterBtn}
                onClick={(e) => after.afterClickBeforeBtn(itemData.id)}
                title={componentsPanelMsg.beforeButton.toString()}
                key={1}
            >
                <SvgIcon type='filesTreeUp' />
            </button>
        )
        afterButtons.push(
            <button
                className={CN.afterBtn}
                onClick={(e) => after.afterClickAfterBtn(itemData.id)}
                title={componentsPanelMsg.afterButton.toString()}
                key={2}
            >
                <SvgIcon type='filesTreeDown' />
            </button>
        )
    }

    const insideButton = (
        <button
            className={ CN.insideBtn }
            onClick={(e) => after.afterClickInsideBtn(itemData.id)}
            title={componentsPanelMsg.insideButton.toString()}
            key={3}
        >
            <SvgIcon type='filesTreeTorus' />
        </button>
    )

    return (
        <div className={CN.rightPart}>
            {afterButtons}
            {insideButton}
        </div>
    )
}
