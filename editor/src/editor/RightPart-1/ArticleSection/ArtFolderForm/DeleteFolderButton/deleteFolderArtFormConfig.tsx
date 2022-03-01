import FCType from 'libs/FormConstructor/FCType'
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import bridge from '../../../../../bridge/bridge'
import articleFolderFormMsg from 'src/messages/articleFolderFormMessages'
import { getState } from 'utils/miscUtils'

/**
 * Функция возвращает конфигурацию формы входа в сервис
 * @param {Object} artFolderFormMsg — объект с текстами ошибок
 */
const deleteFolderArtFormConfig: FCType.Config = {
    bottom: {
        submit: {
            block: true,
            align: 'center',
            color: 'accent',
            icon: 'btnSignTrash',
            text: articleFolderFormMsg.deleteFolderBtnInModal,
        },
    },
    async requestFn(readyFieldValues) {
        const { currentArtItemId } = getState().sites.articleSection

        await bridge.deleteResource('articles', 'folder', currentArtItemId)
        return {status: 'success'}
    },
    afterSubmit(response, outerFns, formDetails) {
        if (response) {
            // Закрыть модальное окно
            store.dispatch(actions.modal.closeModal())
        }
    },
}

export default deleteFolderArtFormConfig
