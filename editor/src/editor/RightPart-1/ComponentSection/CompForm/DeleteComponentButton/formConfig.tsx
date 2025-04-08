import FCType from 'libs/FormConstructor/FCType'
import componentFormMsg from 'messages/componentTemplateFormMessages'
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods'
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import sitesActions from 'store/site/sitesActions'
import putCompFolderRequest from 'requests/editor/compFolders/putCompFolderRequest'
import deleteComponentRequest from 'requests/editor/components/deleteComponentRequest'
import bridge from '../../../../../bridge/bridge'
import { getState } from 'utils/miscUtils'

/**
 * Конфигурация формы удаления компонента
 * @param {Object} componentFormMsg — объект с текстами ошибок
 */
const deleteComponentFormConfig: FCType.Config = {
    bottom: {
        submit: {
            block: true,
            align: 'center',
            color: 'accent',
            icon: 'btnSignTrash',
            text: componentFormMsg.deleteComponentBtnInModal,
        },
    },
    async requestFn(readyFieldValues) {
        const { currentSiteId } = getState().sites
        const { compFolder, compFolderId } = getState().sites.compFolderSection
        const { currentCompItemId } = getState().sites.componentSection

        // Удалить компонент из Хранилища и возвратить новый массив
        const newFoldersArr = filesTreePublicMethods.deleteItem(compFolder, currentCompItemId)

        // Сохранить новые данные в Хранилище
        store.dispatch( sitesActions.setCompFolder({folders: newFoldersArr}) )

        // Обнулить свойство указывающее на id активного пункта в папках и шаблонах компонентах потому что компонент удален
        store.dispatch( sitesActions.setCurrentCompOuter(currentSiteId, null, null) )

        // Сохранить новый массив папок и файлов на сервере
        await putCompFolderRequest(compFolderId, newFoldersArr)

        // Удалить компонент на сервере
        return await deleteComponentRequest(currentCompItemId)
    },
    afterSubmit(response, outerFns, formDetails) {
        if (response.status === 'success') {
            // Закрыть модальное окно
            store.dispatch(actions.modal.closeModal())

            // Обновить компоненты у редактируемой статьи если удалили
            // компонент сайта, к которому принадлежит редактируемая статья.
            bridge.updateTempComps()
        }
    },
}

export default deleteComponentFormConfig
