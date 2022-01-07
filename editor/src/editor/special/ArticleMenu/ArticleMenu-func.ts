import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import actions from 'store/rootAction'
import useGetArticleSelectors from 'store/article/articleSelectors'
import useGetSettingsSelectors from 'store/settings/settingsSelectors'
import articleManager from 'articleManager/articleManager'


/** The hook returns is the Article menu button visible */
export function useIsButtonVisible() {
    // Current main tab
    const { mainTab } = useGetSettingsSelectors()
    // Open article id
    const { articleId } = useGetArticleSelectors()

    // Is Article menu button visible
    const [isVisible, setIsVisible] = useState(false)

    useEffect(function () {
        // Article menu button is visible if user is in an article tab and an article is open
        const isArticleVisible = mainTab === 1 && !!articleId
        setIsVisible(isArticleVisible)
    }, [mainTab, articleId])

    return isVisible
}

