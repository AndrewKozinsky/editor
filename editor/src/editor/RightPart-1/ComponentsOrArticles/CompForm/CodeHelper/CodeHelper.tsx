import React, {useEffect, useState} from 'react'
import Wrapper from 'common/Wrapper/Wrapper'
// import { componentFormMessages } from 'messages/componentTemplateFormMessages'
import CodeCheckInfo from 'editor/special/CodeCheckInfo/CodeCheckInfo'
import componentFormMsg from 'messages/componentTemplateFormMessages'
import checkComponentCode, {componentCodeExample} from './checkComponentCode'

type CodeHelperPropType = {
    code: string
}

// TODO НАДО БЫ СДЕЛАТЬ ИЗ ВСЕХ КОМПОНЕНТОВ CodeHelper ОДИН УНИВЕРСАЛЬНЫЙ КОМПОНЕНТ. ЭТО БУДЕТ НЕТРУДНО.
export default function CodeHelper(props: CodeHelperPropType) {
    const { code } = props

    const [checkStatus, setCheckStatus] = useState<'error' | 'success'>('error')
    const [header, setHeader] = useState<string>()
    const [errors, setErrors] = useState<string[]>([])

    useEffect(function () {
        const errorsArr = checkComponentCode(code)
        setErrors(errorsArr)

        if (errorsArr.length) {
            setCheckStatus('error')
            setHeader(componentFormMsg.checkCodeErrorHeader.toString())
        }
        else {
            setCheckStatus('success')
            setHeader(componentFormMsg.checkCodeSuccessHeader.toString())
        }
    }, [code])

    return (
        <>
            <Wrapper t={20}>
                <CodeCheckInfo type='codeCheck' checkStatus={checkStatus} header={header} items={errors} />
            </Wrapper>
            <Wrapper t={10}>
                <CodeCheckInfo type='codeExample' header='Пример шаблона' code={componentCodeExample} />
            </Wrapper>
        </>
    )
}
