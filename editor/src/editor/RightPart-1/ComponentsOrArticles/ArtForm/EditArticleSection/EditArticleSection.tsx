import React from 'react'
import Wrapper from 'common/Wrapper/Wrapper'
import Hr from 'common/misc/Hr/Hr'
import Button from 'common/formElements/Button/Button'
import {
    useGetEditArticleFn,
    useGetToEditorFn,
    useIsArticleInEditor
} from './EditArticleSection-func'
import articleFormMsg from '../../../../../messages/articleFormMessages'
import makeClasses from './EditArticleSection-classes'

// TODO Что делает эта функция?
export default function EditArticleSection() {
    const isArticleInEditor = useIsArticleInEditor()

    return (
        <>
            <Wrapper t={20} />
            <Hr />
            <Wrapper t={20} align='right' verticalAlign='center' gap={20}>
                {!isArticleInEditor ? <EditArticle /> : <InEditor />}
            </Wrapper>
        </>
    )
}

// TODO Что делает эта функция?
function EditArticle() {
    const editArticleFn = useGetEditArticleFn()

    return <Button
        onClick={editArticleFn}
        text={articleFormMsg.editArticleBtnText}
        icon='btnSignEdit'
    />
}

// TODO Что делает эта функция?
function InEditor() {
    const toEditorFn = useGetToEditorFn()

    const CN = makeClasses()

    return (
        <>
            <p className={CN.tip}>{articleFormMsg.articleIsAlreadyEdited}</p>
            <Button
                onClick={toEditorFn}
                text={articleFormMsg.toEditor}
                icon='btnSignExit'
                color='accent'
            />
        </>
    )
}
