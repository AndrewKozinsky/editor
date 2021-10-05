import React from 'react'
import makeClasses from './ItemsList-classes'


export type ItemType = {
    id: string
    name: string
    onClick: () => void // Функция запускаемая при щелчке по пункту
}

export type ItemsListPropType = {
    items: ItemType[], // Список пунктов
    activeItemId: string // id выбранного пункта
}

export default function ItemsList(props: ItemsListPropType) {
    const {
        items,
        activeItemId
    } = props

    return (
        <div>
            {
                items.map(item => {
                    return item.id === activeItemId
                        ? <Item item={item} key={item.id} isActive />
                        : <Item item={item} key={item.id} />
                })
            }
        </div>
    )
}


type ItemPropType = {
    item: ItemType, // Данные пункта
    isActive?: boolean // Активен ли пункт
}

/** Кнопка списка */
function Item(props: ItemPropType) {
    const {
        item,
        isActive,
    } = props

    // Формирование классов кнопки
    const CN = makeClasses(isActive)
    // const classes = useGetItemClasses(isActive)

    return (
        <button className={CN.item} onClick={item.onClick}>
            {item.name}
        </button>
    )
}
