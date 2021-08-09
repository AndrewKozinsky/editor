import FCType from '../FCType'
import store from 'store/store'

export function getInitialShowCommonSuccess(formConfig: FCType.Config) {
    return !!formConfig.showCommonSuccess
}

export function getInitialCommonSuccess(formConfig: FCType.Config) {
    const lang = store.getState().settings.editorLanguage

    if (formConfig.commonSuccess) {
        return formConfig.commonSuccess
    }

    if (lang === 'rus') return 'Успешно'
    return 'Successfully'
}
