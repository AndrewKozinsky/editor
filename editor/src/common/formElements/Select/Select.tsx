import React, {useState} from 'react'
import { fieldOnChangeHandler, OuterOnChangeHandlerType } from '../outerOnChangeFn'
import { getOptions } from './Select-func'
import { OptionsType } from './SelectTypes'
import { MiscTypes } from 'types/miscTypes'
import { getRandomId } from 'utils/stringUtils'
import makeClasses from './Select-classes'
import Label from '../Label/Label'
import SvgIcon from '../../icons/SvgIcon'


export type SelectPropType = {
    label?: string // Подпись выпадающего списка
    grayText?: string // Серый текст
    name: string // Имя выпадающего списка
    value?: string // Выбранное значение выпадающего списка
    options: OptionsType // Массив для генерации тегов <option>
    onChange?: OuterOnChangeHandlerType.FieldsHandler, // Обработчик выбора пункта
    onBlur?: (e: React.BaseSyntheticEvent) => void, // Обработчик потерей полем фокуса
    disabled?: boolean // Заблокировано ли поле
}

/* Компонент выпадающего списка */
export default function Select(props: SelectPropType) {

    const {
        label, // Подпись выпадающего списка
        grayText,
        name, // Имя выпадающего списка
        value, // Выбранное значение выпадающего списка
        options, // Массив для генерации тегов <option>
        onChange, // Обработчик выбора пункта
        onBlur, // Обработчик потерей полем фокуса
        disabled = false, // Заблокировано ли поле
    } = props

    // Находится ли выпадающий список под фокусом
    const [isFocus, setIsFocus] = useState(false)


    // id для связи подписи и поля ввода
    const [id] = useState(getRandomId())

    const CN = makeClasses(isFocus, disabled)

    // Атрибуты поля
    const inputAttribs: MiscTypes.ObjStringKey<any> = {
        name,
        className: 'select-input',
        value: value || '',
        onFocus: () => setIsFocus(true),
        onBlur: (e: React.BaseSyntheticEvent) => {
            // Поставить статус сфокусированности в Состояние
            setIsFocus(false)
            // Если передали обработчик потерей фокуса, то запустить
            if (onBlur) onBlur(e)
        },
        onChange: (e: React.BaseSyntheticEvent) => fieldOnChangeHandler(e, onChange),
    }

    // Если есть подпись, то добавить id чтобы связать подпись и выпадающий список
    if (label) inputAttribs.id = id
    if (disabled) inputAttribs.disabled = true

    return (
        <>
            <Label label={label} id={id} grayText={grayText} />
            <div className={CN.wrapper}>
                <select {...inputAttribs}>
                    {getOptions(options)}
                </select>
                <div className={CN.wrapperTip}>
                    <SvgIcon type='selectInputArrows' baseClass='-icon-stroke' />
                </div>
            </div>
        </>
    )
}
