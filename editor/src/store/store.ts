import {createStore} from 'redux'
import { rootReducer } from './rootReduser'


export default createStore(
    rootReducer,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)