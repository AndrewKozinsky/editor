const { scryptSync } = require("crypto")

/**
 * Функция сортирует по полю createAt
 * @param {Array} arr — массив элементом, которые нужно отсортировать
 */
export function sortByCreatedAt(arr: any[]) {
    return arr.sort(function (a, b) {
        const aDate = new Date(a.createdAt)
        const bDate = new Date(b.createdAt)

        return (+aDate < +bDate) ? -1 : 1
    })
}

/**
 * Функция шифрует строку
 * @param {String} str — строка, которую нужно зашифровать
 */
export function getHash(str) {
    return scryptSync(str, '05542a3ce4680c4553a44da15f97af38', 32).toString("hex")
}