// 1. 判断token是否存在
// 2. 如果存在，直接正常渲染
// 3. 不存在，则重定向到登录路由组件中

import { getToken } from '../../utils/token'
import { Navigate } from 'react-router-dom'

function AuthRoute({children}) {
    const isToken=getToken()
    console.log('isToken',isToken);
    if (isToken) {
        return <>{children}</>
    }else{
        return <Navigate to='/login' replace/>
    }
}

export default AuthRoute