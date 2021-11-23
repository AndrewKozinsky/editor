export function checkForDifferentObjAttrValuesInArr(arr: unknown[], propName: string) {
    const result: any = {}

    arr.forEach((arrItem: any) => {
        result[arrItem[propName]] = 1
    })

    return arr.length === Object.keys(result).length
}