import React from 'react'
// @ts-ignore
import { Switch, Route } from 'react-router-dom'
// import {setAuthTokenStatus} from "../../store/actions"
// import AuthSplitContainer from "./components/authSplitContainer"
import EnterFormBlock from "modules/auth/EnterFormBlock/EnterFormBlock"
// import {checkToken} from '../../utils/checkToken'
import AuthFormWrapper from '../../modules/auth/AuthFormWrapper/AuthFormWrapper'
import ChangeThemeButton from 'common/misc/ChangeThemeButton/ChangeThemeButton'
import RegFormBlock from 'modules/auth/RegFormBlock/RegFormBlock'
import './EntrancePages.scss'
import ResetFormBlock from 'modules/auth/ResetFormBlock/ResetFormBlock'
import ChangeResetPasswordFormBlock from '../../modules/auth/ChangeResetPasswordFormBlock/ChangeResetPasswordFormBlock'


function EntrancePages() {
    return (
        <div className='entrance-pages-wrapper'>
            <ChangeThemeButton />
            <AuthFormWrapper>
                <Switch>
                    <Route path='/reg'>
                        <RegFormBlock />
                    </Route>
                    <Route path='/enter'>
                        <EnterFormBlock />
                    </Route>
                    <Route path='/reset-password'>
                        <ResetFormBlock />
                    </Route>
                    <Route path='/change-reset-password/:token'>
                        <ChangeResetPasswordFormBlock />
                    </Route>
                </Switch>
            </AuthFormWrapper>
        </div>
    )
}



export default EntrancePages