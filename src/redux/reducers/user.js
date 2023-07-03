import { USER} from "../constant";

// async : in function it is mean return a promise object
// in receive side convert promise to general data.

// 初始化用户信息
const initState={username:''}
function userReducer(preState=initState,action) {
    const {type,data}=action 
    // console.log('action',action);  //action {type:'login',data:{mobile: '13811111111', code: '246810'}}
    // console.log('type:'+type,'data:'+payload);  //type:login data:[object Object]

// 13->userInfo            // http get send        1        make response 7 

//respnse intercptor 12    // request interceptor  2        req int  6      res int  8
//11                       // tcp                  3          tcp    5        tcp    9
//                         // ->>>>>>>>>>>>>>>>>>>> 4 >>>>>>>>
// <<<<<<<<<<<<<<<<<<<<<<<<<<< 10 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    switch (type) {
        case USER:
            console.log('成功进入switch判断');

            // 3. return data in reducer for share 
            // 返回并共享从Layout组件中传递的数据
            return  data
          
            // return 'hhhhhh'

        default:
            return preState
    }
}

export default userReducer