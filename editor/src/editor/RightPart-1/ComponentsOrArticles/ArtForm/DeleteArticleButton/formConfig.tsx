import React from 'react'
import FCType from 'libs/FormConstructor/FCType'
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import bridge from '../../../../../bridge/bridge'

/**
 * Функция возвращает конфигурацию формы удаления статьи
 * @param {Object} articleFormMsg — объект с текстами ошибок
 */
function getConfig(articleFormMsg: any) {
    const config: FCType.Config = {
        bottom: {
            submit: {
                text: articleFormMsg.deleteArticleBtnInModal,
            },
        },
        async requestFn(readyFieldValues) {
            const { currentArtItemId } = store.getState().sites.articleSection

            await bridge.deleteResource('articles', 'file', currentArtItemId)
            return true
        },
        afterSubmit(response, outerFns, formDetails) {
            if (response) {
                // Закрыть модальное окно
                store.dispatch(actions.modal.closeModal())
            }
        },
    }

    return config
}

export default getConfig
