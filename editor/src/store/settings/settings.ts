import { SettingsActionTypes } from "./types"

type SettingsType = {
    test: number
}

const initialState: SettingsType = {
    test: 1
}

export function settingsReducer(
    state = initialState,
    action: SettingsActionTypes
): SettingsType {
    switch (action.type) {
        default:
            return state
    }
}