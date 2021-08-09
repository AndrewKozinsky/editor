import React from 'react'
import Header from 'common/textBlocks/Header/Header'
import Menu from 'common/misc/Menu/Menu'
import Wrapper from 'common/Wrapper/Wrapper'
import Notice from 'common/textBlocks/Notice/Notice'
import { getMenuItems } from '../menuItems'
import {
    regFormMessages,
    regFormJSXMessages
} from 'src/messages/regFormMessages'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import config from './formConfig'


/** User Sign up form */
export default function RegFormBlock() {
    const formState = useFormConstructorState(config)

    return (
        <div>
            <Wrapper b={25}>
                <Menu items={getMenuItems()}/>
            </Wrapper>
            <Wrapper b={10}>
                <Header text={regFormMessages.formHeader} type='h1' />
            </Wrapper>
            <FormConstructor config={config} state={formState} />
            <Info hide={ formState.formSentSuccessfully } />
        </div>
    )
}

type InfoPropType = {
    hide: boolean
}

function Info(props: InfoPropType) {
    if (props.hide) return null

    return (
        <>
            <Wrapper t={20}>
                <Notice>{regFormJSXMessages.legal}</Notice>
            </Wrapper>
            <Wrapper t={20}>
                <Notice>{regFormJSXMessages.doYouHaveAccount}</Notice>
            </Wrapper>
        </>
    )
}
