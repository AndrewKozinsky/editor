// import React from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// import {AppState} from '../../../store/rootReducer';
// import {setEditorTheme} from '../../../store/settings/settingsActions';


// Кнопка меняющая цветовую тему интерфейса
/*function ChangeThemeButton() {
    const dispatch = useDispatch()

    const editorTheme = useSelector((store: AppState) => store.settings.editorTheme)

    let nextTheme = editorTheme === 'light' ? 'dark' : 'light'

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

}*/

// export default ChangeThemeButton