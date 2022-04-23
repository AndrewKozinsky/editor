import FCType from 'libs/FormConstructor/FCType'
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods'
import putCompFolderRequest from 'requests/editor/compFolders/putCompFolderRequest'
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import bridge from '../../../../../bridge/bridge'
import componentFolderFormMsg from 'src/messages/componentFolderFormMessages'
import sitesActions from 'store/site/sitesActions'
import { getState } from 'utils/miscUtils'


/** Конфигурация формы входа в сервис */
const deleteFolderFormConfig: FCType.Config = {
    bottom: {
        submit: {
            block: true,
            align: 'center',
            color: 'accent',
            icon: 'btnSignTrash',
            text: componentFolderFormMsg.deleteFolderBtnInModal,
        },
    },
    async requestFn(readyFieldValues) {
        const { currentCompItemId } = getState().sites.componentSection
        const { compFolder, compFolderId } = getState().sites.compFolderSection

        // Удалить папку из Хранилища и возвратить новый массив
        const newFoldersArr = filesTreePublicMethods.deleteItem(compFolder, currentCompItemId)

        // Сохранить новые данные в Хранилище
        store.dispatch( sitesActions.setCompFolder({folders: newFoldersArr}) )

        // Обнулить свойство указывающее на id активного пункта в папках и шаблонах компонентах потому что папка удалена
        const { currentSiteId } = getState().sites
        store.dispatch( sitesActions.setCurrentCompOuter(currentSiteId, null, null) )

        // Сохранить новый массив папок и файлов на сервере
        return await putCompFolderRequest(compFolderId, newFoldersArr)
    },
    afterSubmit(response, outerFns, formDetails) {
        if (response.status === 'success') {
            // Закрыть модальное окно
            store.dispatch(actions.modal.closeModal())

            // Обновить папки компонентов у редактируемой статьи если отредактировали
            // папки компонентов сайта, к которому принадлежит редактируемая статья.
            bridge.updateTempCompFolders()
        }
    },
}

export default deleteFolderFormConfig
