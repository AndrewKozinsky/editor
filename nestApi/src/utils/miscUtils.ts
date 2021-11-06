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
