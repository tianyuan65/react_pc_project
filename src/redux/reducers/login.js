// 根据action中type值，在switch循环中得到一个结果，这个结果是在其他组件上可以获取到的
// 登录模块
import {LOGIN} from "../constant"
import {setToken,getToken,http} from '../../utils'

// 初始化登录列表
const initState=[{mobile:' ',code:' '}]
const token= getToken() || ' '

console.log('token',token);
async function loginReducer(preState=initState,action) {
    
    const {type,data}=action
    switch (type) {
        case LOGIN:
            // 实现登录逻辑
            const {mobile,code}=data
            console.log('username:'+mobile,'password:'+code);

            // console.log('mobile:'+mobile,'code:'+code);
            // 创建login函数,把用户信息发送到服务器  http://geek.itheima.net/v1_0/sms/codes/13811111111
            // 246810  18842412746
            const login=await http.post('http://geek.itheima.net/v1_0/authorizations',{
                // data
                mobile,code
            });
           
            const res= login;
           
            // console.log('res',this.res);.data
            console.log(res);
            // 向localStorage中添加数据
            setToken(res.data.data.token)
            // 返回结果
            return  res.data.data.token
            // return 1s
           
                
            // res.data.token
            // login:async data=>{
            //     const res=await http.post('http://geek.itheima.net/v1_0/authorizations',{data})
            //     // this.token=res.data.token
            // }
        default:
            return preState
    }
}

export {loginReducer}
