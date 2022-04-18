import React from 'react'
const JSON5 = require('json5')
import * as yup from 'yup'
import { store } from 'store/rootReducer'
import sitesActions from 'store/site/sitesActions'
import FCType from 'libs/FormConstructor/FCType'
import componentFormMsg from 'messages/componentTemplateFormMessages'
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods'
import { updateComponentRequest } from 'requests/editor/components/updateComponentRequest'
import putCompFolderRequest from 'requests/editor/compFolders/putCompFolderRequest'
import bridge from '../../../../../bridge/bridge'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import checkComponentCode from '../CodeHelper/checkComponentCode'
import DeleteComponentButton from '../DeleteComponentButton/DeleteFolderButton'
import { getState } from 'utils/miscUtils'
import articleActions from 'store/article/articleActions'

/** Функция возвращает конфигурацию формы входа в сервис */
const compFormConfig: FCType.Config = {
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
                autoFocus: true,
                rows: 10
            }
        }
    },
    bottom: {
        submit: {
            text: componentFormMsg.submitBtnTextSave,
            icon: 'btnSignSave'
        },
        elems: [<DeleteComponentButton key={2} />],
        hr: true
    },
    async requestFn(readyFieldValues, outerFns, formDetails) {
        // Массив папок и файлов из Хранилища
        const folders = getState().sites.compFolderSection.compFolder
        // id выбранной папки
        const { currentCompItemId } = getState().sites.componentSection

        // Получить массив elems из шаблона компонента, чтобы получить первый элемент
        const templateElemsArr: TempCompTypes.Elems = JSON5.parse( readyFieldValues.content.toString() ).elems

        // Изменить название компонента на введённое и обновить Хранилище папок
        const rootElemName = templateElemsArr[0].elemName
        const result = filesTreePublicMethods.changeItemName(
            folders, currentCompItemId, rootElemName
        )

        store.dispatch(sitesActions.setCompFolder({
            folders: result.newItems
        }))

        // Подготовить массив папок и файлов для сохранения на сервере
        const preparedFolders = filesTreePublicMethods.prepareItemsToSaveInServer(result.newItems)

        // Сохранить данные на сервере
        const { compFolderId } = getState().sites.compFolderSection
        await putCompFolderRequest(compFolderId, preparedFolders)


        // Получить id сайта, к которому принадлежит отредактированный шаблон компонента
        // и id сайта редактируемой статьи
        const { currentSiteId } = getState().sites
        const editedArtSiteId = getState().article.siteId
        // Если они совпадают, то изменить хеш списка папок компонентов чтобы хук загрузил новый список папок
        if (currentSiteId === editedArtSiteId) {
            // Это требуется на случай изменения имени компонента. Если не закачать новый список папок и файлов,
            // то он останется со старым именем.
            store.dispatch(articleActions.changeTempCompsFoldersVersionHash())
        }


        return await updateComponentRequest(
            currentCompItemId, readyFieldValues.content.toString()
        )
    },
    afterSubmit() {
        // Обновить компоненты у редактируемой статьи если отредактировали
        // компонент сайта, к которому принадлежит редактируемая статья.
        bridge.updateTempComps()
    }
}

export default compFormConfig
