import React from 'react'

type Lang = 'eng' | 'rus'

type MsgType<MgsOrig, Lang> = {
    // @ts-ignore
    [Prop in keyof MgsOrig]: MgsOrig[Prop][Lang];
}

function getMsgProxy<T>(mgsOrigObj: any): MsgType<T, Lang>  {
    return new Proxy(mgsOrigObj, {
        get(target, prop: string) {
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
