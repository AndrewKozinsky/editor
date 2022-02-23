import React, {useEffect, useState} from 'react'
import Wrapper from 'common/Wrapper/Wrapper'
import codeHelperMessages from 'messages/codeHelperMessages'
import CodeCheckInfo from '../CodeCheckInfo/CodeCheckInfo'

type CodeHelperPropType = {
    code: string // Код написанный пользователем
    checkCodeFn?: (code: string) => string[] // Функция проверяющая код и возвращающая массив с текстами ошибок. Если массив пуст, то ошибок нет.
    codeExample: string // Пример правильного кода
}

export default function CodeHelper(props: CodeHelperPropType) {
    const { code, checkCodeFn, codeExample } = props

    const [checkStatus, setCheckStatus] = useState<'error' | 'success'>('error')
    const [header, setHeader] = useState<string>()
    const [errors, setErrors] = useState<string[]>([])

    useEffect(function () {
        const errorsArr = checkCodeFn(code)
        setErrors(errorsArr)

        if (errorsArr.length) {
            setCheckStatus('error')
            setHeader(codeHelperMessages.checkCodeErrorHeader.toString())
        }
        else {
            setCheckStatus('success')
            setHeader(codeHelperMessages.checkCodeSuccessHeader.toString())
        }
    }, [code])

    return (
        <>
            <Wrapper t={20}>
                <CodeCheckInfo
                    type='codeCheck'
                    checkStatus={checkStatus}
                    header={header}
                    items={errors}
                />
            </Wrapper>
            <Wrapper t={10}>
                <CodeCheckInfo
                    type='codeExample'
                    header={codeHelperMessages.exampleHeader}
                    code={codeExample}
                />
            </Wrapper>
        </>
    )
}
