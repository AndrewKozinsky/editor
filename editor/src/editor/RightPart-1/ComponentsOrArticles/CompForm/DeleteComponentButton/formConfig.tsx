import FCType from 'libs/FormConstructor/FCType'
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods'
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import putCompFolderRequest from 'requests/editor/compFolders/putCompFolderRequest'
import deleteComponentRequest from 'requests/editor/components/deleteComponentRequest'
import bridge from '../../../../../bridge/bridge'

/**
 * Функция возвращает конфигурацию формы входа в сервис
 * @param {Object} componentFormMsg — объект с текстами ошибок
 */
function getConfig(componentFormMsg: any) {
    const config: FCType.Config = {
        bottom: {
            submit: {
                text: componentFormMsg.deleteComponentBtnInModal,
            },
        },
        async requestFn(readyFieldValues) {
            const { compFolder, compFolderId } = store.getState().sites.compFolderSection
            const { currentCompItemId } = store.getState().sites.componentSection

            // Удалить компонент из Хранилища и возвратить новый массив
            const newFoldersArr = filesTreePublicMethods.deleteItem(compFolder, currentCompItemId)

            // Сохранить новые данные в Хранилище
            store.dispatch( actions.sites.setCompFolder({folders: newFoldersArr}) )

            // Обнулить свойство указывающее на id активного пункта в папках и шаблонах компонентах потому что компонент удален
            store.dispatch( actions.sites.setCurrentComp(null, null) )

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

    return config
}

export default getConfig
