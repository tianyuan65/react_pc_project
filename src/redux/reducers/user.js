import { USER} from "../constant";
import { http } from "../../utils";

// 初始化用户信息
const initState={username:'user.name'}
async function userReducer(preState=initState,action) {
    const {type,data}=action 
    console.log('action',action);  //action {type:'login',data:{mobile: '13811111111', code: '246810'}}
    console.log('type:'+type,'data:'+data);  //type:login data:[object Object]

// 13->userInfo            // http get send        1        make response 7 

//respnse intercptor 12    // request interceptor  2        req int  6      res int  8
//11                       // tcp                  3          tcp    5        tcp    9
//                         // ->>>>>>>>>>>>>>>>>>>> 4 >>>>>>>>
// <<<<<<<<<<<<<<<<<<<<<<<<<<< 10 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    switch (type) {
        case USER:
        //    const {mobile}=data
        //    console.log('username:',mobile);
        console.log('成功进入switch判断');

        const userInfo=await http.get('user/profile')
        console.log('userInfo',userInfo);

        const userName=userInfo.data
        console.log(userName.data);
        console.log(userName.data.name);
        return userName.data

        default:
            return preState
    }
}

export {userReducer}