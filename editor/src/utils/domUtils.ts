import React from 'react'
import articleManager from '../articleManager/articleManager'

/**
 * Функция возвращает булево значение нажата ли клавиша ctrl (Win) или Cmd (Mac).
 * @param {Object} event — объект события
 */
export function isCtrlPressed(event: React.MouseEvent | KeyboardEvent) {
    const isMac = navigator.platform.startsWith('Mac')
    return !isMac && event.ctrlKey || isMac && event.metaKey
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