// 引入combineReducers用于汇总多个reducer
import {combineReducers} from 'redux'
// 引入loginReducer
import {loginReducer} from './login'

export default combineReducers({
    loginReducer
})