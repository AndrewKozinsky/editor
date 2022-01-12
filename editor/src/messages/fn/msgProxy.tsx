
export type LangOptions = 'eng' | 'rus'

type MessagesObjType = {
    [key: string]: {
        [key in LangOptions]: string
    }
}

type MsgType<MgsOrig> = {
    [Prop in keyof MessagesObjType]: MessagesObjType[Prop][LangOptions];
}

function getMsgProxy<T>(mgsOrigObj: any): MsgType<T>  {
    return new Proxy(mgsOrigObj, {
        get(target, prop) {
            const lsLang = localStorage.getItem('editorLanguage')
            let lang = ['eng', 'rus'].includes(lsLang)
                ? lsLang : 'eng'

            return (prop in target)
                ? target[prop][lang]
                : null
        }
    })
}

export default getMsgProxy
