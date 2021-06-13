// import React from 'react'
// import { useDispatch, useSelector} from 'react-redux'
// import FieldGroup from 'common/formElements/FieldGroup/FieldGroup'
// import messages from '../messages'
// import {AppState} from 'store/rootReducer'
// import actions from 'store/rootAction'
// import SvgIcon from 'common/icons/SvgIcon'
// import Wrapper from 'common/Wrapper/Wrapper'


/*export default function ThemeSection() {

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)
    // Тема интерфейса
    const theme = useSelector((store: AppState) => store.settings.editorTheme)

    const onChangeHandler = useGetOnChangeHandler()

    return (
        <FieldGroup
            label={messages.ThemeSection.themeRadiosHeader[lang]}
            inputType='radio'
            groupName='theme'
            value={[theme]}
            gap={20}
            onChange={onChangeHandler}
            inputsArr={
                [
                    {
                        value: 'light',
                        label: (
                            <>
                                {messages.ThemeSection.lightLabel[lang]}
                                <Wrapper t={5}>
                                    <SvgIcon type='editorLightTheme'/>
                                </Wrapper>

                            </>
                        )
                    },
                    {
                        value: 'dark',
                        label: (
                            <>
                                {messages.ThemeSection.darkLabel[lang]}
                                <Wrapper t={5}>
                                    <SvgIcon type='editorDarkTheme'/>
                                </Wrapper>
                            </>
                        )
                    }
                ]
            }
        />
    )
}*/


/*
function useGetOnChangeHandler() {
    const dispatch = useDispatch()

    return function (e: React.BaseSyntheticEvent) {
        const value = e.target.value
        dispatch(actions.settings.setEditorTheme(value))
    }
}*/
