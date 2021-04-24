import React from 'react'
// @ts-ignore
import { Switch, Route, useLocation } from 'react-router-dom'
import EnterFormBlock from "src/modules/auth/EnterFormBlock/EnterFormBlock"
import AuthFormWrapper from 'src/modules/auth/AuthFormWrapper/AuthFormWrapper'
import ChangeThemeButton from 'src/common/misc/ChangeThemeButton/ChangeThemeButton'
import RegFormBlock from 'src/modules/auth/RegFormBlock/RegFormBlock'
import ConfirmEmailFormBlock from 'src/modules/auth/ConfirmEmailFormBlock/ConfirmEmailFormBlock'
import ResetFormBlock from 'src/modules/auth/ResetFormBlock/ResetFormBlock'
import ChangeResetPasswordFormBlock from 'src/modules/auth/ChangeResetPasswordFormBlock/ChangeResetPasswordFormBlock'
import { useGetWrapperClasses, useViewStateChanger } from './EntrancePages-func'
import './EntrancePages.scss'


function EntrancePages() {

    // Переставлять свойство entryAndEditorViewState в зависимости от текущей страницы
    useViewStateChanger()

    // Классы обёртки
    const CN = 'entrance-pages-wrapper'
    const {classes, isVisible} = useGetWrapperClasses(CN)

    if (!isVisible) return null


    return (
        <div className={classes}>
            <ChangeThemeButton />
            <AuthFormWrapper>
                <Switch>
                    <Route path='/reg'>
                        <RegFormBlock />
                    </Route>
                    <Route path='/confirm-email'>
                        <ConfirmEmailFormBlock />
                    </Route>
                    <Route path='/reset-password'>
                        <ResetFormBlock />
                    </Route>
                    <Route path='/change-reset-password'>
                        <ChangeResetPasswordFormBlock />
                    </Route>
                    <Route path='*'>
                        <EnterFormBlock />
                    </Route>
                </Switch>
            </AuthFormWrapper>
        </div>
    )
}



export default EntrancePages