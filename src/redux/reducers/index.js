// 引入combineReducers用于汇总多个reducer
import {combineReducers} from 'redux'
// 引入loginReducer
import {loginReducer} from './login'
// 引入userReducer
import {userReducer} from './user'

export default combineReducers({
    login:loginReducer,
    user:userReducer
})