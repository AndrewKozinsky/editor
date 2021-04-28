import React from 'react'
import { useGetItemClasses } from './ItemsList-func'
import './ItemsList.scss'


type ItemType = {
    id: number
    name: string
}

export type ItemsListPropType = {
    items: ItemType[], // Список пунктов
    activeItemId: number // id выбранного пункта
    onClick: () => void // Функция запускаемая при щелчке по пункту
}

export default function ItemsList(props: ItemsListPropType) {

    const {
        items,
        activeItemId,
        onClick
    } = props

    return (
        <div>
            {
                items.map(item => {
                    if (item.id === activeItemId) {
                        return <Item item={item} onClick={onClick} key={item.id} isActive />
                    } else {
                        return <Item item={item} onClick={onClick} key={item.id} />
                    }
                })
            }
        </div>
    )
}


type ItemPropType = {
    item: ItemType,
    isActive?: boolean
    onClick: () => void
}

function Item(props: ItemPropType) {

    const {
        item,
        isActive,
        onClick
    } = props

    const classes = useGetItemClasses(isActive)

    return (
        <button className={classes} onClick={onClick}>
            {item.name}
        </button>
    )
}