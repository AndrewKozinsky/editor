import {useEffect, useState} from 'react'
import FHTypes from '../types'

/**
 * Хук получает имя формы, находит в DOM и возвращает ссылку на неё.
 * @param {String} formName — имя формы
 */
export default function useGetForm(formName: string): FHTypes.$form {
    // Ссылка на форму
    const [$form, set$form] = useState(null)

    useEffect(function () {
        if (formName) {
            // @ts-ignore
            set$form( document.forms[formName] )
        }
    }, [])

    return $form
}
