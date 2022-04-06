import React from 'react'
import Wrapper from 'common/Wrapper/Wrapper'
import Hr from 'common/misc/Hr/Hr'
import Button from 'common/formElements/Button/Button'
import {
    useGetEditArticleFn,
    useGetToEditorFn,
    useIsArticleInEditor
} from './EditArticleSection-func'
import articleFormMsg from 'src/messages/articleFormMessages'
import makeClasses from './EditArticleSection-classes'

/** Блок с кнопкой запускающей редактирование открытой статьи и текстом редактируется ли статья */
export default function EditArticleSection() {
    const isArticleInEditor = useIsArticleInEditor()

    return (
        <>
            <Wrapper t={20} />
            <Hr />
            <Wrapper t={10} b={10} align='right' verticalAlign='center' gap={20}>
                {!isArticleInEditor ? <EditArticle /> : <InEditor />}
            </Wrapper>
            <Hr />
        </>
    )
}

/** Кнопка запускающая редактирование открытой статьи */
function EditArticle() {
    const editArticleFn = useGetEditArticleFn()

    return <Button
        onClick={editArticleFn}
        text={articleFormMsg.editArticleBtnText}
        icon='btnSignEdit'
    />
}

/** Сообщение редактируется ли сейчас эта статья */
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
