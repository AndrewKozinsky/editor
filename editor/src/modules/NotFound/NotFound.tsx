import React from 'react'
import SvgIcon from 'common/icons/SvgIcon'
import Wrapper from 'common/Wrapper/Wrapper'
import {useSelector} from 'react-redux'
import {AppState} from 'store/rootReducer'
import messagesWithJSX from './messagesWithJSX'
import './NotFound.scss'
import {useGetComponentSize} from '../../utils/MiscUtils';
import {makeCN} from '../../utils/StringUtils';


function NotFound() {

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Размер компонента относительно размера всего интерфейса
    const size = useGetComponentSize()

    // Класс обёртки
    const CN = 'not-found'

    // Классы заголовка
    const headerClasses = [`${CN}__header`, `${CN}__header--${size}-size`]

    return (
        <div className={CN}>
            <SvgIcon type='logo' />

            <Wrapper t={15}>
                {/*@ts-ignore*/}
                <h1 className={makeCN(headerClasses)}>{messagesWithJSX.header[lang]}</h1>
            </Wrapper>

            <Wrapper t={15}>
                {/*@ts-ignore*/}
                <p>{messagesWithJSX.p1[lang]}</p>
            </Wrapper>

            <Wrapper t={5}>
                {/*@ts-ignore*/}
                <p>{messagesWithJSX.p2[lang]}</p>
            </Wrapper>
        </div>
    );
}

export default NotFound