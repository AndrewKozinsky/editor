import React, {useEffect, useState} from 'react'
import Wrapper from 'common/Wrapper/Wrapper'
import CodeCheckInfo from '../../../special/CodeCheckInfo/CodeCheckInfo'
import {templateCodeExample} from './CodeHelper-func'
import useGetMessages from 'messages/fn/useGetMessages'
import {siteTemplateSectionMessages} from 'messages/siteTemplateSectionMessages'
import checkCodeSiteTemplate from './checkCodeSiteTemplate'

type CodeHelperPropType = {
    code: string
}

export default function CodeHelper(props: CodeHelperPropType) {
    const { code } = props

    const siteTemplateSectionMsg = useGetMessages(siteTemplateSectionMessages)

    const [checkStatus, setCheckStatus] = useState<'error' | 'success'>('error')
    const [header, setHeader] = useState<string>()
    const [errors, setErrors] = useState<string[]>([])

    useEffect(function () {
        const errorsArr = checkCodeSiteTemplate(code)
        setErrors(errorsArr)

        if (errorsArr.length) {
            setCheckStatus('error')
            setHeader(siteTemplateSectionMsg.checkCodeErrorHeader.toString())
        }
        else {
            setCheckStatus('success')
            setHeader(siteTemplateSectionMsg.checkCodeSuccessHeader.toString())
        }
    }, [code])

    return (
        <>
            <Wrapper t={20}>
                <CodeCheckInfo type='codeCheck' checkStatus={checkStatus} header={header} items={errors} />
            </Wrapper>
            <Wrapper t={10}>
                <CodeCheckInfo type='codeExample' header='Пример шаблона' code={templateCodeExample} />
            </Wrapper>
        </>
    )
}

// DELETE THIS CODE
// console.log( checkCodeSiteTemplate(`{"name": "Стандартная тема", "head": "<script src='https://mysite.com/js/224ca.js'></script>"}`) )