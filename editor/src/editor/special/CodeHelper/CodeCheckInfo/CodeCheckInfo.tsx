import React from 'react'
import Notice from 'src/common/textBlocks/Notice/Notice'
import makeClasses from './CodeCheckInfo-classes'


type CodeCheckInfoPropType = {
    type: 'codeCheck' | 'codeExample' // Тип плашки: codeCheck (информация о проверке кода), codeExample (пример кода)
    checkStatus?: 'error' | 'success' // Значок плашки типа codeCheck
    header: string, // Заголовок
    items?: string[] // Пункты списка ошибок
    code?: string // Код
}

/** Плашка с сообщениями о доработках кода или примером кода */
export default function CodeCheckInfo(props: CodeCheckInfoPropType) {
    const CN = makeClasses()

    // Значок на плашке
    const icon = props.checkStatus || 'info'

    return (
        <Notice icon={icon} bg>
            <h4 className={CN.header}>{props.header}</h4>
            {props.type === 'codeCheck' && <CodeCheck {...props} />}
            {props.type === 'codeExample' && <CodeExample {...props} />}
        </Notice>
    )
}

/** Плашка с сообщениями о доработках кода */
function CodeCheck(props: CodeCheckInfoPropType) {
    const { items, checkStatus } = props
    const CN = makeClasses()

    // Если успешный статус, то не нужно отрисовать список ошибок
    if (checkStatus === 'success') return null

    return (
        <ul className={CN.itemsUl}>
            {items.map((point, i) => {
                return <li className={CN.itemsLi} key={i}>{point}</li>
            })}
        </ul>
    )
}

/** Плашка с примером кода */
function CodeExample(props: CodeCheckInfoPropType) {
    const { code } = props
    const CN = makeClasses()

    return (
        <div className={CN.code}><pre>{code}</pre></div>
    )
}
