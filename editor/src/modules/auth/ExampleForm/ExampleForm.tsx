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
import messages from '../messages'
import messagesWithJSX from '../messagesWithJSX'
import formConfig from './js/formResources'
import { getMenuItems } from '../menuItems'
import useFormHandler from 'libs/formHandler/useFormHandler'
import FieldGroup from 'src/common/formElements/FieldGroup/FieldGroup'


/** Форма входа в сервис */
function ExampleForm() {

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // FormHandler
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

            <form name='enter' {...fh.formHandlers}>
                <Wrapper>
                    <TextInput
                        label={ messages.enterForm.emailField[lang] }
                        name='email'
                        value={fh.fields.email.value[0]}
                        onChange={fh.onChangeFieldHandler}
                        autocomplete='username'
                        placeholder={messages.enterForm.emailPlaceholder[lang]}
                        error={fh.fields.email.data.error}
                        autoFocus
                    />
                </Wrapper>
                <Wrapper t={15}>
                    <Select
                        label='Герои'
                        name='heroes'
                        value={fh.fields.heroes.value[0]}
                        onChange={fh.onChangeFieldHandler}
                        options={optionsSet}
                    />
                </Wrapper>
                <Wrapper t={15}>
                    <FieldGroup
                        label='Блюда'
                        inputType='checkbox'
                        groupName='dishes'
                        value={fh.fields.dishes.value}
                        onChange={fh.onChangeFieldHandler}
                        inputsArr={
                            [
                                { value: 'pancakes', label: 'Блины' },
                                { value: 'jam', label: 'Повидло' },
                                { value: 'tea', label: 'Чай' }
                            ]
                        }
                    />
                </Wrapper>
                <Wrapper t={15}>
                    <FieldGroup
                        label='Цвета'
                        inputType='radio'
                        groupName='color'
                        value={fh.fields.color.value}
                        onChange={fh.onChangeFieldHandler}
                        inputsArr={
                            [
                                { value: 'red', label: 'Red' },
                                { value: 'green', label: 'Green' },
                                { value: 'blue', label: 'Blue' },
                            ]
                        }
                    />
                </Wrapper>
                <Wrapper t={20} align={'right'}>
                    <Button
                        type='submit'
                        text={messages.enterForm.submitBtnText[lang]}
                        name='submit'
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

export default ExampleForm