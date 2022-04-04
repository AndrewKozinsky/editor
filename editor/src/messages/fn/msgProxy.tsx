import { ReactElement, ReactNode } from 'react'

export type LangOptions = 'eng' | 'rus'

type MessagesObjType = {
    [key: string]: {
        [key in LangOptions]: any
    }
}

type MsgType<MgsOrig extends MessagesObjType> = {
    [Prop in keyof MgsOrig]: MgsOrig[Prop][LangOptions];
}

function getMsgProxy<T extends MessagesObjType>(mgsOrigObj: T): MsgType<T>  {
    const lsLang = localStorage.getItem('editorLanguage') as LangOptions
    let lang = ['eng', 'rus'].includes(lsLang)
        ? lsLang : 'eng'

    return new Proxy(mgsOrigObj, {
        get(target: T, prop: string) {
            try {
                return target[prop][lang] || null
            }
            catch (err) {
                console.log(err)
            }
        }
    })
}

export default getMsgProxy