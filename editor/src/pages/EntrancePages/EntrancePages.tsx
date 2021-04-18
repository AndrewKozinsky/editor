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
import ChangeThemeButton from 'common/misc/ChangeThemeButton/ChangeThemeButton'
import RegFormBlock from '../../modules/auth/RegFormBlock/RegFormBlock'
import './EntrancePages.scss'


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
                    <Route path='/reset'>
                        <p>Reset password</p>
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