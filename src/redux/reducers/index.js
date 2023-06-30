// 引入combineReducers用于汇总多个reducer
import {combineReducers} from 'redux'
// 引入loginReducer
import login from './login'
// 引入userReducer
import user from './user'

export default combineReducers({
    login,
    user
})