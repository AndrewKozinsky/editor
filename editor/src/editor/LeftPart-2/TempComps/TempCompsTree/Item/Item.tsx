import React from 'react'
import makeClasses from './Item-classes'
import SvgIcon from 'common/icons/SvgIcon'
import { useGetToggleFolder } from './Item-func'
import TempCompsTreeType from '../types'
import componentsPanelMsg from 'messages/componentsPanelMessages'


type ItemPropType = {
    // Массив всех папок и файлов.
    items: TempCompsTreeType.Items
    // Данные папки или файла.
    itemData: TempCompsTreeType.Item
    // Уровень вложенности папки или файла.
    offset: number
    // Объект с различными свойствами и методами переданными в параметрах FilesTree.
    after: TempCompsTreeType.After
    btnInsideAllowed: boolean
}

/** Папка или файл в структуре папок */
export default function Item(props: ItemPropType) {
    const {
        items,
        itemData,
        offset,
        after,
        btnInsideAllowed
    } = props

    const CN = makeClasses(itemData)

    // Хук возвращает обработчик щелчка по элементу
    const onItemClickHandler = useGetToggleFolder(itemData, items, after)

    return (
        <div
            style={{paddingLeft: offset * 20}}
            className={CN.root}
            onClick={onItemClickHandler}
        >
            <div className={CN.inner}>
                <Triangle items={items} itemData={itemData} after={after} />
                <Icon itemData={itemData} />
                <Circles itemData={itemData} btnInsideAllowed={btnInsideAllowed} />
                <p className={CN.name}>{itemData.name}</p>
                <RightButtons itemData={itemData} after={after} btnInsideAllowed={btnInsideAllowed} />
            </div>
        </div>
    )
}

type TrianglePropType = {
    // Массив всех папок и файлов.
    items: TempCompsTreeType.Items
    // Данные папки или файла.
    itemData: TempCompsTreeType.Item
    // Объект с различными свойствами и методами переданными в параметрах FilesTree.
    after: TempCompsTreeType.After
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
    itemData: TempCompsTreeType.Item
}

/** Значок типа элемента. Если файл, то ничего не отрисовывается. */
function Icon(props: IconPropType) {
    const { itemData } = props

    const CN = makeClasses(itemData)

    if (itemData.type === 'file') return null
    return <SvgIcon type='filesTreeFolder' extraClass={CN.folderSign} />
}


type CirclesPropType = {
    // Данные папки или файла.
    itemData: TempCompsTreeType.Item
    btnInsideAllowed: boolean
}

// TODO Что делает эта функция?
function Circles(props: CirclesPropType) {
    const { itemData, btnInsideAllowed } = props

    const CN = makeClasses(itemData, btnInsideAllowed)

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
    itemData: TempCompsTreeType.Item
    // Объект с различными свойствами и методами переданными в параметрах FilesTree.
    after: TempCompsTreeType.After
    btnInsideAllowed: boolean
}

/** Значок типа элемента. Если файл, то ничего не отрисовывается. */
function RightButtons(props: RightButtonsPropType) {
    const {
        itemData,
        after,
        btnInsideAllowed
    } = props

    const CN = makeClasses(itemData, btnInsideAllowed)

    if (itemData.type === 'folder') return null

    return (
        <div className={CN.rightPart}>
            <button
                className={CN.afterBtn}
                onClick={(e) => after.afterClickBeforeBtn(itemData.id)}
                title={componentsPanelMsg.beforeButton.toString()}
                key={1}
            >
                <SvgIcon type='filesTreeUp' />
            </button>
            <button
                className={CN.afterBtn}
                onClick={(e) => after.afterClickAfterBtn(itemData.id)}
                title={componentsPanelMsg.afterButton.toString()}
                key={2}
            >
                <SvgIcon type='filesTreeDown' />
            </button>
            <button
                className={ CN.insideBtn }
                onClick={(e) => after.afterClickInsideBtn(itemData.id)}
                title={componentsPanelMsg.insideButton.toString()}
                key={3}
            >
                <SvgIcon type='filesTreeTorus' />
            </button>
        </div>
    )
}
