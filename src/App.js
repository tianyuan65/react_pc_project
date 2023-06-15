import React from 'react';
import './App.css';
import Login from './pages/Login';
import Layout from './pages/Layout';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
// 导入antd样式文件
import '../node_modules/antd/dist/reset.css'
// import { Space,Button } from 'antd';
import AuthRoute from './components/AuthRoute'
import Home from './pages/Home';
import Article from './pages/Article';
import Publish from './pages/Publish';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/layout' element={<Layout/>}/>
          <Route path='/login' element={<Login/>}/>
          {/* 需要鉴权的路由 */}
          <Route path="/layout" element={
            <AuthRoute>
              <Layout />
            </AuthRoute>}/>
          {/* 二级路由默认页面 */}
          <Route index element={<Home />}/>
          <Route path='/article' element={<Article/>}/>
          <Route path='/publish' element={<Publish/>}/>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
