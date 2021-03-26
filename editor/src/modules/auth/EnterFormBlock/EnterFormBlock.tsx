import React from 'react'
import {useSelector} from 'react-redux'
import {AppState} from 'store/rootReducer'
import Header from 'common/textBlocks/Header/Header'
import Menu from 'common/misc/Menu/Menu'
import Button from 'common/formElements/Button/Button'
import Wrapper from 'common/Wrapper/Wrapper'
import TextInput from 'common/formElements/TextInput/TextInput'
import Select from 'common/formElements/Select/Select'
import Notice from 'common/Notice/Notice'
import { OptionsType } from 'common/formElements/Select/SelectTypes'
import Checkbox from 'common/formElements/Checkbox/Checkbox'
import messages from '../messages'
import messagesWithJSX from '../messagesWithJSX'
import { formConfig } from './js/formResources'
import Radio from 'common/formElements/Radio/Radio'
import { getMenuItems } from '../menuItems'
import useFormHandler from 'libs/formHandler/useFormHandler'
import FieldGroup from 'src/common/formElements/FieldGroup/FieldGroup'
// Удали если не потребуется
// import '../AuthFormStyles/AuthFormStyles.scss'


/** Форма входа в сервис */
function EnterFormBlock() {

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    const fh = useFormHandler(formConfig, 'enter')

    const optionsSet: OptionsType = [
        { value: 'choose', label: 'Выберите героя', disabled: true },
        { value: 'Che', label: 'Чебурашка' },
        { value: 'Gena', label: 'Крокодил Гена' },
        { value: 'Shapoklyak', label: 'Шапокляк' },
        { value: 'Lara', label: 'Крыса Лариса' }
    ]

    return (
        <div>
            <Wrapper b={25}>
                <Menu items={getMenuItems(lang)}/>
            </Wrapper>
            <Wrapper b={10}>
                <Header text={messages.enterForm.formHeader[lang]} type='h1'/>
            </Wrapper>

            <form name='enter'>
                <Wrapper>
                    <TextInput
                        label={ messages.enterForm.emailField[lang] }
                        name='email'
                        // value={fh.email.value}
                        value='Andrew'
                        autocomplete='username'
                        placeholder={messages.enterForm.emailPlaceholder[lang]}
                        autoFocus
                        onChange={() => {}}
                    />
                </Wrapper>
                <Wrapper t={15}>
                    <TextInput
                        label={ messages.enterForm.passwordField[lang] }
                        name='password'
                        // value={fh.password.value}
                        value='pass'
                        autocomplete='current-password'
                        onChange={() => {}}
                    />
                </Wrapper>
                <Wrapper t={15}>
                    <Select
                        label='Герои'
                        name='heroes'
                        defaultValue={'Shapoklyak'}
                        options={optionsSet}
                        onChange={() => {}}
                    />
                </Wrapper>
                <Wrapper t={15}>
                    <FieldGroup
                        label='Блюда'
                        inputType='checkbox'
                        groupName='dishes'
                        onChange={() => {}}
                        inputsArr={
                        [
                            { value: 'pancakes', label: 'Блины', defaultChecked: true },
                            { value: 'jam', label: 'Повидло' }
                        ]
                    }
                    />
                </Wrapper>
                <Wrapper t={15}>
                    <FieldGroup
                        label='Цвета'
                        inputType='radio'
                        groupName='color'
                        onChange={() => {}}
                        inputsArr={
                        [
                            { value: 'red', label: 'Red' },
                            { value: 'green', label: 'Green', defaultChecked: true },
                            { value: 'blue', label: 'Blue' },
                        ]
                    }
                    />
                </Wrapper>
                <Wrapper t={20} align={'right'}>
                    <Button
                        type='submit'
                        text={messages.enterForm.submitBtnText[lang]}
                    />
                </Wrapper>
            </form>

            <Wrapper t={30}>
                <Notice>{messagesWithJSX.enterForm.newUser[lang]}</Notice>
            </Wrapper>
            <Wrapper t={10}>
                <Notice>{messagesWithJSX.enterForm.forgotPassword[lang]}</Notice>
            </Wrapper>
        </div>
    )
}

export default EnterFormBlock