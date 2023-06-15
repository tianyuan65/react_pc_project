import axios from 'axios'
import { getToken } from './token';

const http=axios.create({
    // 设置URL基础结构
    baseURL:'http://geek.itheima.net/v1_0',
    // 响应时间
    timeout:5000
})

// 添加请求拦截器
http.interceptors.request.use(config=>{
    console.log('请求拦截器-成功');
    const data=getToken()
    if(data){
        // 在请求头部添加 token 用户数据
        config.headers.Authorization = `Bearer ${data}`
    }
    console.log('config:',config);
    return config
},error=>{
    console.log('请求拦截器-失败');
    return error
})

// 添加响应拦截器
http.interceptors.response.use(response=>{
    console.log('响应拦截器-成功');
    return response
},error=>{
    console.log('响应拦截器-失败');
    return Promise.reject(error)
})
export {http}