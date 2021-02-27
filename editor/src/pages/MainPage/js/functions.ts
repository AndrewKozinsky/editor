import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppState} from '../../../store/rootReduser'
import {UserReducerType} from '../../../store/user/userReducer'
import {useGetUserToken} from '../../../requests/authRequests'
import {setAuthTokenStatus} from '../../../store/user/userActions'


