import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
// import { store } from 'store/rootReducer'
import actions from 'store/rootAction'
import Wrapper from 'common/Wrapper/Wrapper'
import Hr from 'common/misc/Hr/Hr'
import Button from 'common/formElements/Button/Button'
import useGetMessages from 'messages/fn/useGetMessages'
import { articleMenuMessages } from 'messages/articleMenuMessages'
import ModalShortContent from 'common/modalEntities/ModalShortContent/ModalShortContent'
import useGetArticleSelectors from 'store/article/articleSelectors'
import articleManager from '../../../articleManager/articleManager'
// import articleManager from 'editor/RightPart-2/articleManager/articleManager'

/** Компонент окна с разметкой статьи */

export function ArticleMarkupModal() {
    const dispatch = useDispatch()

    const { tempComps } = useGetArticleSelectors()
    const historyItem = articleManager.hooks.getArticle()

    const articleMenuMsg = useGetMessages(articleMenuMessages)

    const [markupStr, setMarkupStr] = useState('')

    useEffect(function () {
        if (!tempComps || !historyItem) return

        const markupStr = articleManager.turnArticleDataToHTML(historyItem.article, tempComps)
        setMarkupStr(markupStr)
    }, [tempComps, historyItem])



    return (
        <ModalShortContent
            header={articleMenuMsg.markupModalHeader}
            text={markupStr}
        />
    )
}

