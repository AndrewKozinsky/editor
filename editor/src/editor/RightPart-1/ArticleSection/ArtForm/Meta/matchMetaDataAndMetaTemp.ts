import { createDeepCopy } from 'utils/miscUtils'
import MetaType from './MetaType'


/**
 * Функция актуализирует метаданные статьи с шаблоном метаданных.
 * По-сути создаётся копия шаблона метаданных и туда внедряются отмеченные значения полей ввода.
 * После элементы текущего массива метаданных заменяются на новые.
 * @param {Array} tempMetaItems — массив элементов из шаблона метаданных
 * @param {MetaType.Items} dataMetaItems — массив элементов из метаданных
 */
export default function matchMetaDataAndMetaTemp(
    tempMetaItems: null| MetaType.Items, dataMetaItems: null | MetaType.Items
) {
    if (!tempMetaItems || !dataMetaItems) return

    // Создание нового массива элементов метаданных из шаблона
    const newDataMetaItems = createDeepCopy(tempMetaItems)

    // Перебор новых элементов для добавления отмеченных значений
    for (let i = 0; i < newDataMetaItems.length; i++) {
        // Перебираемый новый элемент метаданных
        const newDataMetaItem = newDataMetaItems[i]

        // Элемент из старых метаданных соответствующий перебираемому элементу
        const dataMetaItem = dataMetaItems.find(dMetaItem => {
            return dMetaItem.id === newDataMetaItem.id
        })

        // Ничего не делать, если элемент не найден.
        if (!dataMetaItem || dataMetaItem.type === 'header' || newDataMetaItem.type === 'header') {
            continue
        }

        // Если элемент найден...

        // Если это текстовое поле и есть напечатанное значение, то поставить его.
        if (!newDataMetaItem.values && dataMetaItem.value) {
            newDataMetaItem.value = dataMetaItem.value
        }
        // Если же есть массив предустановленных значений и есть массив отмеченных ids...
        else if (newDataMetaItem.values && dataMetaItem.value) {
            // Перебрать массив отмеченных ids из старых данных и...
            for (let val of dataMetaItem.value) {
                // Найти такой же id в новых данных чтобы убедиться, что такой пункт сущесвует и id не указывает на удалённые данные
                const foundedCheckedVal = newDataMetaItem.values.find(newDValue => {
                    return newDValue.id === val
                })

                // Если он есть, то поставить его в качестве отмеченного значения в новые данные.
                if (foundedCheckedVal) {
                    if (!newDataMetaItem.value) newDataMetaItem.value = []
                    newDataMetaItem.value.push(val)
                }
            }
        }
    }

    // Обнулить массив старых данных и поставить туда новые.
    dataMetaItems.length = 0
    dataMetaItems.push(...newDataMetaItems)
}
