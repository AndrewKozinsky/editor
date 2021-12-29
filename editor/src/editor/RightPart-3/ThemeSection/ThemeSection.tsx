import React from 'react'
import { useDispatch } from 'react-redux'
import actions from 'store/rootAction'
import FieldGroup from 'common/formElements/FieldGroup/FieldGroup'
import SvgIcon from 'common/icons/SvgIcon'
import Wrapper from 'common/Wrapper/Wrapper'
import { themeSectionMessages } from 'messages/themeSectionMessages'
import useGetMessages from 'messages/fn/useGetMessages'
import useGetSettingsSelectors from 'store/settings/settingsSelectors'

// TODO Что делает эта функция?
export default function ThemeSection() {
    const themeSectionMsg = useGetMessages(themeSectionMessages)

    // Тема интерфейса
    const { editorTheme } = useGetSettingsSelectors()
    // Обработчик изменения переключателя темы интерфейса
    const onChangeHandler = useGetOnChangeHandler()

    return (
        <FieldGroup
            label={themeSectionMsg.themeRadiosHeader}
            inputType='radio'
            groupName='theme'
            value={[editorTheme]}
            gap={20}
            vertical
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
    )
}

// Обработчик изменения переключателя темы интерфейса
function useGetOnChangeHandler() {
    const dispatch = useDispatch()

    return function (e: React.BaseSyntheticEvent) {
        const value = e.target.value
        dispatch(actions.settings.setEditorTheme(value))
    }
}
