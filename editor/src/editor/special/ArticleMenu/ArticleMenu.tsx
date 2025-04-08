import React from 'react'
import makeClasses from './ArticleMenu-classes'
import SvgIcon from 'common/icons/SvgIcon'
import { useIsButtonVisible } from './ArticleMenu-func'
import Button from 'common/formElements/Button/Button'
import articleMenuMsg from 'messages/articleMenuMessages'
import ArticleDataModal from './DataModal/ArticleDataModal'
import { useSaveArticle } from './fn/save'
import { useCloseArticle } from './CloseModal/close'
import useGetShowModal from 'utils/hooksUtils'
import { useIsMarkupBtnDisabled } from './fn/markup'
import { ArticleMarkupModal } from './MarkupModal/ArticleMarkupModal'
import { DeleteArticleConfirmModal } from './DeleteModal/DeleteArticleConfirmModal'
import { useIsHistoryBtnDisabled, useMakeHistoryStep } from './fn/history'
import { useIsDataBtnDisabled } from './fn/data'
import useGetArticleSelectors from 'store/article/articleSelectors'


/** Меню в статье */
export default function ArticleMenuButton() {
    const CN = makeClasses()

    // Is the Article menu button visible
    if (!useIsButtonVisible()) return null

    return (
        <div className={CN.outerWrapper}>
            <button className={CN.mainButton}>
                <SvgIcon type='articleMenu' />
            </button>
            <ArticleMenu />
        </div>
    )
}

/** Выпадающее меню статьи */
function ArticleMenu() {
    const { isArticleSaved } = useGetArticleSelectors()

    const CN = makeClasses()

    // Undo button
    const isUndoBtnDisabled = useIsHistoryBtnDisabled('undo')
    const makeUndoStep = useMakeHistoryStep('undo')

    // Redo function
    const isRedoBtnDisabled = useIsHistoryBtnDisabled('redo')
    const makeRedoStep = useMakeHistoryStep('redo')

    // Show markup button
    const isMarkupBtnDisabled = useIsMarkupBtnDisabled()
    const openMarkupModal = useGetShowModal(<ArticleMarkupModal />, 'full')

    // Show data button functions
    const isDataBtnDisabled = useIsDataBtnDisabled()
    const showData = useGetShowModal(<ArticleDataModal />, 'full')

    // Save button functions
    const saveArticle = useSaveArticle()

    // Close article button
    const closeArticle = useCloseArticle()

    // Delete article button
    const deleteArticle = useGetShowModal(<DeleteArticleConfirmModal />)

    return (
        <div className={CN.menuRoot}>
            <div className={CN.menuSection}>
                <Button
                    text={articleMenuMsg.undo}
                    icon='btnSignUndo'
                    onClick={makeUndoStep}
                    disabled={isUndoBtnDisabled}
                />
                <Button
                    text={articleMenuMsg.redo}
                    icon='btnSignRedo'
                    onClick={makeRedoStep}
                    disabled={isRedoBtnDisabled}
                />
            </div>
            <div className={CN.menuSection}>
                <Button
                    text={articleMenuMsg.markup}
                    icon='btnSignCode'
                    onClick={openMarkupModal}
                    disabled={isMarkupBtnDisabled}
                />
                <Button
                    text={articleMenuMsg.data}
                    icon='btnSignJson'
                    onClick={showData}
                    disabled={isDataBtnDisabled}
                />
            </div>
            <div className={CN.menuSection}>
                <Button
                    text={articleMenuMsg.save}
                    icon='btnSignSave'
                    onClick={saveArticle}
                    disabled={isArticleSaved}
                />
                <Button
                    text={articleMenuMsg.close}
                    icon='btnSignClose'
                    onClick={closeArticle}
                />
                <Button
                    text={articleMenuMsg.delete}
                    icon='btnSignTrash'
                    onClick={deleteArticle}
                />
            </div>
        </div>
    )
}
