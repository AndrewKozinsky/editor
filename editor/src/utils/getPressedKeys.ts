
export type PressedKeysObj = {
    [K in Keys]: boolean
}
type Keys = 'esc' | 'backspace' | 'delete' | 'alt' | 'cmd' | 'shift' | 'arrowDown' | 'arrowUp' |
    's' | 'z' | 'j' | 'd' | 'm'

/**
 * The function return object of pressed keys.
 * @param {KeyboardEvent} e — event object
 */
export function getPressedKeys(e: KeyboardEvent): PressedKeysObj {

    // Is it MacOS?
    let isMac = navigator.platform.startsWith('Mac')

    // In MacOS you have to press Cmd key, but in Windows is Ctrl
    let cmdKey: boolean
    if (isMac) cmdKey = e.metaKey
    else cmdKey = e.ctrlKey

    return {
        esc: e.key === 'Escape',
        backspace: e.key === 'Backspace',
        delete: e.key === 'Delete',
        alt: e.altKey,
        cmd: cmdKey,
        shift: e.shiftKey,
        arrowDown: e.code === 'ArrowDown',
        arrowUp: e.code === 'ArrowUp',

        s: e.code === 'KeyS',
        z: e.code === 'KeyZ',
        j: e.code === 'KeyJ',
        d: e.code === 'KeyD',
        m: e.code === 'KeyM',
    }
}


/**
 * The function check if a user pressed only keys listed in keysArr
 * @param {Object} pressedKeys — object with keys pressed status
 * @param {Array} keysArr — array if keys which must be pressed
 */
export function checkPressedKeys(pressedKeys: PressedKeysObj, keysArr: Keys[]) {
    let result = true

    for (let key in pressedKeys) {
        // @ts-ignore
        if (pressedKeys[key] !== keysArr.includes(key)) {
            result = false
        }
    }

    return  result
}
