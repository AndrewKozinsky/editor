namespace MiscTypes {
    export type Language = 'eng' | 'rus'

    // Объект с данными токена
    export type JWTDecoded = {
        id: string, iat: number, exp: number
    }

    /** Тип объекта со строковыми ключами с любым значением */
    export type ObjStringKey<T> = {[key: string]: T}

    /** Тип объекта со строковыми ключами и строковыми значениями */
    export type ObjStringKeyStringVal = {[key: string]: string}
}

export default MiscTypes
