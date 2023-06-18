import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
// import Layout from '../pages/Layout';
import Home from "../pages/Home"
import Article from "../pages/Article"
import Publish from "../pages/Publish"
import {Navigate} from "react-router-dom"


// 路由表
const routes=[
    {
        key:'/home',
        icon:React.createElement(UserOutlined),
        label:"数据概览",
        element:<Home/>
    },
    {
        key:'/article',
        icon:React.createElement(LaptopOutlined),
        label:"内容管理",
        element:<Article/>
    },
    {
        key:'/publish',
        icon:React.createElement(NotificationOutlined),
        label:"发布文章",
        element:<Publish/>
    },
    {
        key:'/',
        element:<Navigate to="/layout"/>,
    }
]

export default routes