import config from 'utils/config'
import { getFromLocalStorage } from 'src/utils/miscUtils/miscUtils'
import FCType from '../FCType'

/**
 * The function returns status of whether success message can be shown
 * @param {Object} formConfig — configuration form object
 */
export function getInitialShowCommonSuccess(formConfig: FCType.Config) {
    return !!formConfig.showCommonSuccess
}

/**
 * The function returns common success message
 * @param {Object} formConfig — configuration form object
 */
export function getInitialCommonSuccess(formConfig: FCType.Config) {
    const lang = getFromLocalStorage(config.ls.editorLanguage)

    if (formConfig.commonSuccess) {
        return formConfig.commonSuccess
    }

    if (lang === 'rus') return 'Успешно'
    return 'Successfully'
}
