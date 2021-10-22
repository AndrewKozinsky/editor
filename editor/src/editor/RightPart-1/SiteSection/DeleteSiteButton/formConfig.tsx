import React from 'react'
import FCType from 'libs/FormConstructor/FCType'
import CloseModalButton from './CloseModalButton'
import actions from '../../../../store/rootAction'
import deleteSiteRequest from '../../../../requests/editor/sites/deleteSiteRequest'
import {store} from '../../../../store/rootReducer'
// import loginRequest, { LoginRequestValuesType } from 'requests/user/loginRequest'
// import actions from 'store/rootAction'
// import { store } from 'store/rootReducer'
// import userActions from 'store/user/userActions'

/**
 * Функция возвращает конфигурацию формы входа в сервис
 * @param {Object} siteSectionMsg — объект с текстами ошибок
 */
function getConfig(siteSectionMsg: any) {
    const config: FCType.Config = {
        // fields: {},
        bottom: {
            submit: {
                text: siteSectionMsg.deleteSiteBtnText,
            },
            elems: [<CloseModalButton key={2} />]
        },
        async requestFn() {
            const { currentSiteId } = store.getState().sites
            return await deleteSiteRequest(currentSiteId)
        },
        afterSubmit(response, outerFns, formDetails) {
            if (response.status === 'success') {
                // Закрыть модальное окно
                store.dispatch(actions.modal.closeModal())

                // Скачать новый список сайтов и поставить в Хранилище
                store.dispatch(actions.sites.requestSites())

                // Обнулить id выбранного сайта
                store.dispatch(actions.sites.setCurrentSiteId(null))
            }
        },
    }

    return config
}

export default getConfig


/*return (
    <Button
        type='button'
        text={}
        icon='btnSignTrash'
        onClick={openDeleteSiteConfirmation}
    />
)*/

// Хук возвращает функцию открывающую модальное окно с подтверждением удаления сайта
// const openDeleteSiteConfirmation = useGetShowModal(<ModalContent />)