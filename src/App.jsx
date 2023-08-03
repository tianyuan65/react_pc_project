import React from 'react';
import './App.css';
// import Login from './pages/Login';
// import Layout from './pages/Layout';
import {Route,Routes,Navigate} from 'react-router-dom'
// 导入antd样式文件
import '../node_modules/antd/dist/reset.css'
import AuthRoute from './components/AuthRoute'
// import Home from './pages/Home';
// import Article from './pages/Article';
// import Publish from './pages/Publish';
// 导入lazy函数和Suspense组件
import { lazy,Suspense } from 'react';

const Login=lazy(()=>import('./pages/Login'))
const Layout=lazy(()=>import('./pages/Layout'))
const Home=lazy(()=>import('./pages/Home'))
const Article=lazy(()=>import('./pages/Article'))
const Publish=lazy(()=>import('./pages/Publish'))


function App() {
  return (
    <div className="App">
      <Suspense
        fallback={
          <div
            style={{
              textAlign:'center',
              marginTop:200
            }}
          >loading...</div>
        }
      >
        <Routes>
          {/* <Route path='/layout' element={<Layout/>}/> */}
          <Route path='/login' element={<Login/>}/>
          {/* 需要鉴权的路由 */}
          <Route path="/layout" element={
            <AuthRoute>
              <Layout />
            </AuthRoute>}>

            {/* 二级路由默认页面，之前因为没有把路由地址写全，所以出现无法匹配到指定路由的报错，得把匹配的路由写完整 /layout/layout/home 
            
            /layout/layout/home
            /layout/home
            */}
            <Route path='home' element={<Home />}/>
            <Route path='article' element={<Article/>}/>
            <Route path='publish' element={<Publish/>}/>
            {/* 重定向 */}
            <Route path='home' element={<Navigate to='home'/>}/>
          </Route>

          {/* 路由表不可用，原因：想使用路由表就把App下所有子组件都写入路由表里，不能一半一半配置，一半使用路由表配置。这里因为在Login和Layout之间需要通过路由鉴权(AuthRoute)，所以不能使用路由表 */}
          {/* <Route> */}
            {/* {element} */}
          {/* </Route> */}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
