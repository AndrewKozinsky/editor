import React from 'react'
import Wrapper from 'common/Wrapper/Wrapper'
import Notice from 'common/Notice/Notice'


type CommonErrorPropType = {
    error?: null | string // Текст ошибки
}

/** Компонент общей ошибки формы входа пользователя */
export default function CommonError(props: CommonErrorPropType) {

    const {
        error
    } = props

    if (!error) return null

    return (
        <Wrapper t={20}>
            <Notice type='error'>
                {error}
            </Notice>
        </Wrapper>
    )
}