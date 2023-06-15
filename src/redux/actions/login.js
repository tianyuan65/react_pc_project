// import { http } from '../../utils/http';
// import {setToken,getToken} from '../../utils/token'
import { LOGIN } from '../constant';

// export default class loginAction {
//     token=getToken() || ''
//     log=async ({type,data})=>{
//         const res=await http.post('http://geek.itheima.net/v1_0/authorizations',{type,data})
//         this.token=res.data.token
//         setToken(res.data.token)
//     }
// }

// 创建并暴露loginAction对象
export const loginAction=data=>({type:LOGIN,data})

// 异步登录对象
export const loginAsync=(data,time)=>{
    return (dispatch)=>{
        setTimeout(()=>{
            dispatch(loginAction(data))
        },time)
    }
}