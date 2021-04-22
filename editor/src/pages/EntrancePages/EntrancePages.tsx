import React, {useEffect, useState} from 'react'
// @ts-ignore
import { Switch, Route, useLocation } from 'react-router-dom'
import EnterFormBlock from "modules/auth/EnterFormBlock/EnterFormBlock"
import AuthFormWrapper from 'modules/auth/AuthFormWrapper/AuthFormWrapper'
import ChangeThemeButton from 'common/misc/ChangeThemeButton/ChangeThemeButton'
import RegFormBlock from 'modules/auth/RegFormBlock/RegFormBlock'
import ResetFormBlock from 'modules/auth/ResetFormBlock/ResetFormBlock'
import ChangeResetPasswordFormBlock from 'modules/auth/ChangeResetPasswordFormBlock/ChangeResetPasswordFormBlock'
import { useGetWrapperClasses, useViewStateChanger } from './EntrancePages-func'
import './EntrancePages.scss'
import {useSelector} from 'react-redux';
import {AppState} from '../../store/rootReducer';


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
                    <Route path='/reset-password'>
                        <ResetFormBlock />
                    </Route>
                    <Route path='/change-reset-password/:token'>
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