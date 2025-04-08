import StoreSettingsTypes from 'store/settings/settingsTypes'
import {setInLocalStorage} from '../../utils/miscUtils'

type MessagesObjType = {
    [key: string]: {
        [key in StoreSettingsTypes.EditorLang]: any
    }
}

type MsgType<MgsOrig extends MessagesObjType> = {
    [Prop in keyof MgsOrig]: MgsOrig[Prop][StoreSettingsTypes.EditorLang];
}

function getMsgProxy<T extends MessagesObjType>(mgsOrigObj: T): MsgType<T>  {
    let lang = localStorage.getItem('editorLanguage') as StoreSettingsTypes.EditorLang

    if (!(['eng', 'rus'].includes(lang))) {
        lang = 'rus'
        setInLocalStorage('editorLanguage', 'rus')
    }

    return new Proxy(mgsOrigObj, {
        get(target: T, prop: string) {
            try {
                return target[prop][lang] || null
            }
            catch (err) {
                console.log('Prop: ' + prop)
                console.log(err)
            }
        }
    })
}

export default getMsgProxy