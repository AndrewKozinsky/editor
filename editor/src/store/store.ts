// @ts-ignore
import { createStore, applyMiddleware } from 'redux'
// @ts-ignore
import ReduxThunk from 'redux-thunk'
// @ts-ignore
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from './rootReducer'


export default createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(ReduxThunk)
    )
)
