import React from 'react'
import articleManager from '../articleManager/articleManager'

/**
 * Функция возвращает булево значение нажата ли клавиша ctrl (Win) или Cmd (Mac).
 * @param {Object} event — объект события
 */
export function isCtrlPressed(event: React.MouseEvent | KeyboardEvent) {
    const isMac = isMacOS()
    return !isMac && event.ctrlKey || isMac && event.metaKey
}

export function isMacOS() {
    return navigator.platform.startsWith('Mac')
}

/**
 * Функция оборачивает переданный элемент в <div>
 * @param {HTMLElement} $elem
 */
export function wrap$elemWithDiv($elem: HTMLElement) {
    const serviceWrapper = document.createElement('div')
    serviceWrapper.append($elem)

    return serviceWrapper
}

/**
 * Функция принимает название тега и возвращает его тип display
 * @param {String} tagName — название тега
 */
export function getTagDisplayType(tagName: string): null | 'inline' | 'inline-block' | 'block' {
    const tag = tagName.toLocaleLowerCase()

    const inlineTags = ['a', 'b', 'button', 'canvas', 'i', 'img', 'abbr', 'address', 'label', 'small', 'strong', 'span', 'picture', 'wbr', 'code', 'cite', 'em', 'svg', 'del', '', ]
    const blockInlineTags = ['select', 'input', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ]
    const blockTags = ['blockquote', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'section', 'article', 'header', 'hr', 'iframe', 'footer', 'aside', 'nav', 'table', 'li', 'div', 'main', 'form', 'option', 'pre', 'ul', 'tfoot', 'thead', 'ol', 'th', '', '', '', '', '', ]
    // Теги, к которым не применимы деление на строчки, блочно-строчные и блочные.
    const specialTags = ['script', 'style', '', ]

    // После расфасуй теги по категориям
    // bdi, area, audio, base, bdo, caption, col, colgroup, data, datalist, dd, details, dfn, dialog, dir, dl, dt, fieldset, figcaption, figure, ins, kbd, legend, link, map, mark, meter, optgroup, output, progress, q, rp, rt, ruby, s, samp, source, sub, summary, sup, td, template, textarea, time, tr, track, u, var, video

    if (inlineTags.includes(tag)) return 'inline'
    if (blockInlineTags.includes(tag)) return 'inline-block'
    if (blockTags.includes(tag)) return 'block'

    return null
}

/**
 * Функция возвращает массив с названиями непарных тегов
 */
export function getUnpairedTags(): string[] {
    return ['img', 'hr', 'br', 'b', 'i', 'meta', 'input']
}

/**
 * Функция принимает название тега и возвращает его тип display
 * @param {String} tagName — название тега
 */
export function isUnpairedTag(tagName: string) {
    const tag = tagName.toLocaleLowerCase()

    return getUnpairedTags().includes(tag)
}