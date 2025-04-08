import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import actions from 'store/rootAction'
import FieldGroup from 'common/formElements/FieldGroup/FieldGroup'
import { OuterOnChangeHandlerType } from 'common/formElements/outerOnChangeFn'
import themeSectionMsg from 'messages/themeSectionMessages'
import SvgIcon from 'common/icons/SvgIcon'
import Wrapper from 'common/Wrapper/Wrapper'
import useGetSettingsSelectors from 'store/settings/settingsSelectors'
import StoreSettingsTypes from 'store/settings/settingsTypes'

/** Форма изменения темы */
export default function ThemeSection() {

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
function useGetOnChangeHandler(): OuterOnChangeHandlerType.FieldsHandler {
    const dispatch = useDispatch()

    return useCallback(function (fieldData: OuterOnChangeHandlerType.FieldsData) {
        const value = fieldData.fieldValue[0] as StoreSettingsTypes.EditorTheme
        dispatch(actions.settings.setEditorThemeOuter(value))
    }, [])
}
