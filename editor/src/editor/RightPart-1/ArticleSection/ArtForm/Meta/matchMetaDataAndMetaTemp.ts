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
            for (let val in dataMetaItem.value) {
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












// ВОЗМОЖНО ПОЗЖЕ ОТ КОДА НИЖЕ НУЖНО ИЗБАВИТЬСЯ
/*export default function matchMetaDataAndMetaTemp(
    tempMetaItems: MetaType.Items, dataMetaItems: MetaType.Items
) {
    // Добавление недостающих элементов в соответствии с шаблоном
    addMissingItems(tempMetaItems, dataMetaItems)

    // Удаление лишних элементов
    if (dataMetaItems.length > tempMetaItems.length) {
        dataMetaItems = dataMetaItems.slice(0, tempMetaItems.length - 1)
    }

    // Сопоставление элементов
    matchItems(tempMetaItems, dataMetaItems)
}*/

/*function addMissingItems(tempMetaItems: MetaType.Items, dataMetaItems: MetaType.Items) {
    for (let i = 0; i < tempMetaItems.length; i++) {
        const tempMetaItem = tempMetaItems[i]
        const dataMetaItem = dataMetaItems[i]

        if (!dataMetaItem) {
            tempMetaItems[i] = tempMetaItem
        }
        else if (tempMetaItem.id !== dataMetaItem.id) {
            const foundedDMetaItemIdx = dataMetaItems.findIndex(dMetaItem => {
                return dMetaItem.id === tempMetaItem.id
            })

            if (foundedDMetaItemIdx) {
                const foundedDMetaItem = dataMetaItems[foundedDMetaItemIdx]
                dataMetaItems.splice(foundedDMetaItemIdx, 1)

                dataMetaItems.splice(i, 0, foundedDMetaItem)
            }
        }
    }
}*/

/*function matchItems(tempMetaItems: MetaType.Items, dataMetaItems: MetaType.Items) {
    for (let i = 0; i < tempMetaItems.length; i++) {
        const tMetaItem = tempMetaItems[i]
        const dMetaItem = dataMetaItems[i]

        if (tMetaItem.type === 'header') {
            if (dMetaItem.type !== 'header') {
                dataMetaItems[i] = tMetaItem
            }
        }
        else if (tMetaItem.type === 'input') {
            if (dMetaItem.type !== 'input') {
                dataMetaItems[i] = tMetaItem
            }
            else {
                correctInput(tMetaItem, dMetaItem)
            }
        }
    }
}*/


/*function correctInput(tMetaItem: MetaType.Input, dMetaItem: MetaType.Input) {
    if (tMetaItem.view !== dMetaItem.view) {
        dMetaItem.view = tMetaItem.view
    }

    if (tMetaItem.values && !dMetaItem.values) {
        dMetaItem.values = tMetaItem.values
    }
    else {
        delete dMetaItem.values
    }

    if (tMetaItem.values) {
        correctInputValues(tMetaItem.values, dMetaItem.values)
    }

    correctInputValue(dMetaItem)
}*/

/*function correctInputValues(
    tMetaItemValues: MetaType.InputValues, dMetaItemValues: MetaType.InputValues
) {
    for (let i = 0; i < tMetaItemValues.length; i++) {
        const tValueObj = tMetaItemValues[i]
        const foundedDValueObjIdx = dMetaItemValues.findIndex(dValue => {
            return dValue.id === tValueObj.id
        })

        if (foundedDValueObjIdx < 0) {
            dMetaItemValues.push(tValueObj)
        }
        else {
            dMetaItemValues[foundedDValueObjIdx] = tValueObj
        }
    }

    for (let i = 0; i < dMetaItemValues.length; i++) {
        const dValueObj = dMetaItemValues[i]

        const foundedTValueObjIdx = tMetaItemValues.findIndex(tValue => {
            return tValue.id === dValueObj.id
        })

        if (foundedTValueObjIdx < 0) {
            dMetaItemValues.splice(foundedTValueObjIdx, 1)
        }
    }
}*/

/*
function correctInputValue(dMetaItem: MetaType.Input) {
    if (!dMetaItem.values) return

    const foundedCheckedValueId = dMetaItem.values.find(dVal => {
        return dVal.id === dMetaItem.value
    })

    if (!foundedCheckedValueId) {
        delete dMetaItem.value
    }
}*/
