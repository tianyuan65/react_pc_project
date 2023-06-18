import React from 'react';
// import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import Layout from '../pages/Layout';
import Home from "../pages/Home"
import Article from "../pages/Article"
import Publish from "../pages/Publish"
import {Navigate} from "react-router-dom"


// 路由表
const routes=[
    {
        path:'/layout',
        element:<Layout/>,
        children:[
            {
                path:'home',
                element:<Home/>
            },
            {
                path:'article',
                element:<Article/>
            },
            {
                path:'publish',
                element:<Publish/>
            }
        ]
    }
    ,
    {
        path:'/',
        element:<Navigate to="/layout"/>
    }
]

export default routes