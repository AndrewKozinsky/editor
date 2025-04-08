import React from 'react'
import * as yup from 'yup'
const JSON5 = require('json5')
import FCType from 'libs/FormConstructor/FCType'
import metaTemplateSectionMsg from 'messages/metaTemplateSectionMessages'
import matchMetaDataAndMetaTemp from '../../ArticleSection/ArtForm/Meta/matchMetaDataAndMetaTemp'
import MetaType from '../../ArticleSection/ArtForm/Meta/MetaType'
import { afterSubmit } from './metaForm-func'
import {CreateNewMetaTemplateValuesType} from 'requests/editor/metaTemplate/createMetaTemplateRequest'
import updateMetaTemplateRequest from 'requests/editor/metaTemplate/updateMetaTemplateRequest'
import DeleteMetaTemplateButton from '../DeleteMetaTemplateButton/DeleteMetaTemplateButton'
import checkMetaTemplateCode from '../checkCodeFn/checkMetaTemplateCode'
import { getState } from 'utils/miscUtils'

/** Объект конфигурации формы входа в сервис */
const currentMetaTemplateFormConfig: FCType.Config = {
    fields: {
        content: {
            fieldType: 'text',
            schema: (fields) => {
                return yup.string()
                    .required(metaTemplateSectionMsg.codeInputRequired)
                    .test('check-code', metaTemplateSectionMsg.codeInputIsWrong,
                        function(code) {
                            return !checkMetaTemplateCode(code).length
                        }
                    )
            },
            fieldData: {
                inputType: 'textarea',
                label: metaTemplateSectionMsg.templateCodeInput,
                autoFocus: true
            }
        }
    },
    bottom: {
        submit: {
            text: metaTemplateSectionMsg.submitBtnTextSave,
            icon: 'btnSignSave'
        },
        elems: [<DeleteMetaTemplateButton key={2} />],
        hr: true
    },
    async requestFn(readyFieldValues, outerFns, formDetails) {
        const { currentTemplateId } = getState().sites.metaTemplatesSection

        // Актуализировать метаданные в статье с шаблоном если текущей статье назначен отредактированный шаблон
        const metaTemplate: MetaType.MetaTemplate = JSON5.parse(readyFieldValues.content)
        const currentArtMetaItems = getState().sites.articleSection.meta
        matchMetaDataAndMetaTemp(metaTemplate.items, currentArtMetaItems)

        // Обновить данные шаблона сайта
        return await updateMetaTemplateRequest(
            readyFieldValues as CreateNewMetaTemplateValuesType, currentTemplateId
        )
    },
    afterSubmit
}

export default currentMetaTemplateFormConfig

