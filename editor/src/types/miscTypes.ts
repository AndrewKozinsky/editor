import store from 'store/store'
import {AppState} from 'store/rootReducer'

/** Тип объекта со строковыми ключами с любым значением */
export type ObjStringKeyAnyValType = {[key: string]: any}

/** Тип объекта с со строковыми ключами и строковыми значениями */
export type ObjStringKeyStringValType = {[key: string]: string}

/** Тип объекта с любыми строковыми ключами с любым значением */
export type ReactRefType = null | {current: HTMLElement}

/** Диспетчер Редакса */
export type AppDispatchType = typeof store.dispatch

/** Тип аргумента getState для Redux Thunk */
export type GetStateType = () => AppState