import React from 'react'
import useMakeClasses from './EntrancePages-classes'
import { useIsComponentVisible } from './EntrancePages-func'
import { Switch, Route } from 'react-router-dom'
import EnterFormBlock from 'entrance/EnterFormBlock/EnterFormBlock'
import AuthFormWrapper from 'entrance/AuthFormWrapper/AuthFormWrapper'
import RegFormBlock from 'entrance/RegFormBlock/RegFormBlock'
import ConfirmEmailFormBlock from 'entrance/ConfirmEmailFormBlock/ConfirmEmailFormBlock'
import ResetFormBlock from 'entrance/ResetFormBlock/ResetFormBlock'
import ChangeResetPasswordFormBlock from 'entrance/ChangeResetPasswordFormBlock/ChangeResetPasswordFormBlock'
import { useViewStateChanger } from './EntrancePages-func'
import withErrorCatcher from '../../common/ErrorCatcher/ErrorCatcher'

/** Обёртка для страниц входа */
function EntrancePages() {

    // Переставлять свойство entryAndEditorViewState в зависимости от текущей страницы
    useViewStateChanger()

    // Классы компонента
    const CN = useMakeClasses()

    // Компонент видим?
    if (!useIsComponentVisible()) return null

    return (
        <div className={CN.root}>
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

export default withErrorCatcher(EntrancePages)