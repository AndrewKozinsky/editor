import React from 'react'
// @ts-ignore
import {Switch, Route, Redirect} from 'react-router-dom'
// import {setAuthTokenStatus} from "../../store/actions"
// import TopNavigation from "./components/topNavEntrance"
// import AuthSplitContainer from "./components/authSplitContainer"
// import RegForm from "./components/regForm"
import EnterFormBlock from "modules/auth/EnterFormBlock/EnterFormBlock"
// import ForgotPasswordForm from "./components/forgotPasswordForm"
// import ResetPasswordForm from "./components/resetPasswordForm"
// import {checkToken} from '../../utils/checkToken'
import AuthFormWrapper from '../../modules/auth/AuthFormWrapper/AuthFormWrapper'
import './EntrancePages.scss'
import ChangeThemeButton from 'common/misc/ChangeThemeButton/ChangeThemeButton'


function EntrancePages() {
    return (
        <div className='entrance-pages-wrapper'>
            <ChangeThemeButton />
            <AuthFormWrapper>
                <Switch>
                    {/*<Route path='/reg'>
                        <RegForm />
                    </Route>*/}
                    <Route path='/enter'>
                        <EnterFormBlock />
                    </Route>
                    {/*<Route path='/forgot-password'>
                        <ForgotPasswordForm />
                    </Route>*/}
                    {/*<Route path='/reset-password/:token'>
                        <ResetPasswordForm />
                    </Route>*/}
                </Switch>
            </AuthFormWrapper>
        </div>
    )
}



export default EntrancePages