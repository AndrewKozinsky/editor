import { store } from 'store/rootReducer'
import { AppStateType } from 'store/rootReducer'

export namespace MiscTypes {
    /** Тип объекта со строковыми ключами с любым значением */
    export type ObjStringKey<T> = {[key: string]: T}

    /** Тип объекта с любыми строковыми ключами с любым значением */
    export type ReactRef = null | {current: HTMLElement}

    /** Диспетчер Редакса */
    export type AppDispatch = typeof store.dispatch

    /** Тип аргумента getState для Redux Thunk */
    export type GetState = () => AppStateType
}
