import React, { ReactElement } from 'react'
// @ts-ignore
import { Link } from 'react-router-dom'


type messagesWithJSXType = {
    [key: string]: { eng: ReactElement, rus: ReactElement }
}


const messagesWithJSX: messagesWithJSXType = {
    header: {
        eng: <>Page not found</>,
        rus: <>Страница не найдена</>
    },
    p1: {
        eng: <>If you think this page should be, write about the problem to <a href='mailto:andkozinsky@gmail.com'>andkozinsky@gmail.com</a>.</>,
        rus: <>Если вы считаете, что эта страница должна быть, то напишите о проблеме на  <a href='mailto:andkozinsky@gmail.com'>andkozinsky@gmail.com</a>.</>
    },
    p2: {
        eng: <>Or go to <Link to='/'>the editor page</Link>.</>,
        rus: <>Или перейдите на <Link to='/'>страницу редактора</Link>.</>
    },
}

// eng: <>New User? <Link to='/reg'>Sign up</Link>.</>,

export default messagesWithJSX