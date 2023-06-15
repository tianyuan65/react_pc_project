// 引入createStore，用于创建redux中最核心的store对象
import { createStore,applyMiddleware } from "redux";
// 引入redux-thunk，用于store接收函数类型的action，并执行里面的异步任务
// 
import reducer from './reducers/index'
import thunk from 'redux-thunk'
// 引入redux-devtools-extension
import {composeWithDevTools} from 'redux-devtools-extension'

// 暴露store
export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))