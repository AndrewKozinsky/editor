import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'store/rootReducer'
import { setEditorTheme } from 'store/settings/settingsActions'
import { EditorThemeType } from 'store/settings/settingsTypes'


// Кнопка меняющая цветовую тему интерфейса
function ChangeThemeButton() {
    const dispatch = useDispatch()

    // Тема редактора: light или dark
    const editorTheme = useSelector((store: AppState) => store.settings.editorTheme)

    // Какая схема будет при нажатии на кнопку
    let nextTheme: EditorThemeType = editorTheme === 'light' ? 'dark' : 'light'

    function onBtnClick() {
        dispatch(setEditorTheme(nextTheme))
    }

    const fixed: 'fixed' = 'fixed'
    const style = {
        position: fixed,
        top: '10px',
        right: '10px'
    }

    return <button style={style} onClick={onBtnClick}>Change theme</button>

}

export default ChangeThemeButton