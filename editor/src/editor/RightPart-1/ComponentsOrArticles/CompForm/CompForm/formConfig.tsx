import React from 'react'
const JSON5 = require('json5')
import * as yup from 'yup'
import { store } from 'store/rootReducer'
import sitesActions from 'store/site/sitesActions'
import FCType from 'libs/FormConstructor/FCType'
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods'
import { updateComponentRequest } from 'requests/editor/components/updateComponentRequest'
import putCompFolderRequest from 'requests/editor/compFolders/putCompFolderRequest'
import articleManager from '../../../../../articleManager/articleManager'
import checkComponentCode from '../CodeHelper/checkComponentCode'
import DeleteComponentButton from '../DeleteComponentButton/DeleteFolderButton'

/** Функция возвращает конфигурацию формы входа в сервис */
function getFormConfig(componentFormMsg: any) {
    const config: FCType.Config = {
        fields: {
            content: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .test('check-code', componentFormMsg.componentContentInputIsWrong,
                            function(code) {
                                return checkComponentCode(code).length === 0
                            }
                        )
                },
                fieldData: {
                    inputType: 'textarea',
                    label: componentFormMsg.componentContentInput,
                    autoFocus: true
                }
            }
        },
        bottom: {
            submit: {
                text: componentFormMsg.submitBtnTextSave, // Это значение должен изменять хук в зависимости от типа формы!!!
                icon: 'btnSignSave' // Это значение должен изменять хук в зависимости от типа формы!!!
            },
            elems: [<DeleteComponentButton key={2} />],
            hr: true
        },
        async requestFn(readyFieldValues, outerFns, formDetails) {
            // Массив папок и файлов из Хранилища
            const folders = store.getState().sites.compFolderSection.compFolder
            // id выбранной папки
            const { currentCompItemId } = store.getState().sites.componentSection

            // Изменить название компонента на введённое и обновить Хранилище папок
            const { name } = JSON5.parse(readyFieldValues.content.toString())
            const result = filesTreePublicMethods.changeItemName(
                folders, currentCompItemId, name
            )

            store.dispatch(sitesActions.setCompFolder({
                folders: result.newItems
            }))

            // Подготовить массив папок и файлов для сохранения на сервере
            const preparedFolders = filesTreePublicMethods.prepareItemsToSaveInServer(result.newItems)

            // Сохранить данные на сервере
            const { compFolderId } = store.getState().sites.compFolderSection
            await putCompFolderRequest(compFolderId, preparedFolders)

            return await updateComponentRequest(
                currentCompItemId, readyFieldValues.content.toString()
            )
        },
        afterSubmit() {
            // Обновить компоненты у редактируемой статьи если отредактировали
            // компонент сайта, к которому принадлежит редактируемая статья.
            articleManager.remoteControl.updateTempComps()
        }
    }

    return config
}

export default getFormConfig
