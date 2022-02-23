import FCType from 'src/libs/FormConstructor/FCType'
import actions from 'src/store/rootAction'
import { store } from 'src/store/rootReducer'
import bridge from '../../../../../bridge/bridge'
import articleFormMsg from 'src/messages/articleFormMessages'
import { getState } from 'src/utils/miscUtils'

/**
 * Функция возвращает конфигурацию формы удаления статьи
 * @param {Object} articleFormMsg — объект с текстами ошибок
 */
const deleteArticleModalConfig: FCType.Config = {
    bottom: {
        submit: {
            block: true,
            align: 'center',
            color: 'accent',
            icon: 'btnSignTrash',
            text: articleFormMsg.deleteArticleBtnInModal,
        },
    },
    async requestFn(readyFieldValues) {
        const { currentArtItemId } = getState().sites.articleSection

        await bridge.deleteResource('articles', 'file', currentArtItemId)
        return {status: 'success'}
    },
    afterSubmit(response, outerFns, formDetails) {
        if (response) {
            // Закрыть модальное окно
            store.dispatch(actions.modal.closeModal())
        }
    },
}

export default deleteArticleModalConfig
