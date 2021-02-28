import React from 'react'
// import {useDispatch, useSelector} from "react-redux"
// import {Switch, Route, Redirect} from 'react-router-dom'
// import {setAuthTokenStatus} from "../../store/actions"
// import TopNavigation from "./components/topNavEntrance"
// import AuthSplitContainer from "./components/authSplitContainer"
// import RegForm from "./components/regForm"
// import EnterForm from "./components/enterForm"
// import ForgotPasswordForm from "./components/forgotPasswordForm"
// import ResetPasswordForm from "./components/resetPasswordForm"
// import {checkToken} from '../../utils/checkToken'
import AuthFormWrapper from '../../modules/auth/AuthFormWrapper';
import SvgIcon from '../../common/icons/SvgIcon';
import './css/EntrancePages.scss'


function EntrancePages() {
    return (
        <div className='entrance-pages-wrapper'>
            <AuthFormWrapper>
                <SvgIcon type='logo' />
                <p>AuthFormWrapper 3</p>
            </AuthFormWrapper>
        </div>
    )
}

/*<Switch>
    <Route path='/reg'>
        <RegForm />
    </Route>
    <Route path='/enter'>
        <EnterForm />
    </Route>
    <Route path='/forgot-password'>
        <ForgotPasswordForm />
    </Route>
    <Route path='/reset-password/:token'>
        <ResetPasswordForm />
    </Route>
</Switch>*/

export default EntrancePages