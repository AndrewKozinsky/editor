import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import FieldGroup from 'common/formElements/FieldGroup/FieldGroup'
import {AppState} from 'store/rootReducer'
import actions from 'store/rootAction'
import SvgIcon from 'common/icons/SvgIcon'
import Wrapper from 'common/Wrapper/Wrapper'
import { themeSectionMessages } from '../../../messages/themeSectionMessages'
import useGetMessages from '../../../messages/fn/useGetMessages'


export default function ThemeSection() {
    const themeSectionMsg = useGetMessages(themeSectionMessages)

    // Тема интерфейса
    const theme = useSelector((store: AppState) => store.settings.editorTheme)

    const onChangeHandler = useGetOnChangeHandler()

    return (
        <>
            <FieldGroup
                label={themeSectionMsg.themeRadiosHeader}
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
                                    {themeSectionMsg.lightLabel}
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
                                    {themeSectionMsg.darkLabel}
                                    <Wrapper t={5}>
                                        <SvgIcon type='editorDarkTheme'/>
                                    </Wrapper>
                                </>
                            )
                        }
                    ]
                }
            />
        </>
    )
}


function useGetOnChangeHandler() {
    const dispatch = useDispatch()

    return function (e: React.BaseSyntheticEvent) {
        const value = e.target.value
        dispatch(actions.settings.setEditorTheme(value))
    }
}
