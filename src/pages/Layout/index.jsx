import React from 'react'
import { Breadcrumb,Layout, Menu, theme } from 'antd'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
// import './index.scss'
// import {NavLink} from 'react-router-dom'
// import {widthUseNavigate} from '../../utils/index'
import { useNavigate } from 'react-router-dom';
import Home from '../Home';

const { Header, Content, Sider } = Layout;

const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const subnav=['数据概览','内容管理','发布文章']
// const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
//   const subKey = String(index + 1);
//   return {
//     key: `sub${subKey}`,
//     icon: React.createElement(icon),
//     label: `${subnav[index]}`,
//     children: new Array(4).fill(null).map((_, j) => {
//       const subKey = index * 4 + j + 1;
//       return {
//         key: subKey,
//         label: `option${subKey}`,
//       };
//     }),
//     // 点击子菜单标题
//     onTitleClick:()=>showCompon()
//   };
// });

const items3=[
  {
    key:'/home',
    icon:React.createElement(UserOutlined),
    label:`数据概览`
  },
  {
    key:'/article',
    icon:React.createElement(LaptopOutlined),
    label:`内容管理`
  },
  {
    key:'/publish',
    icon:React.createElement(NotificationOutlined),
    label:`发布文章`
  }
]

// showCompon函数，点击导航选项后触发此函数，文本高亮，路由跳转到点击的组件，在展示区展示对应组件内容
// const showCompon=()=>{
//   // 遍历subnav，将三个文本渲染到页面当中
//   subnav.forEach((item)=>{
//     console.log('subnav',`${item}`);
//     // 路由跳转到对应的路由
//     // this.props.history.push('/article');
//     //在展示区渲染点击的子菜单对应的组件
//     <Navigate to='/home' element={<Home/>}/>
//   })
// }

export default function GeekLayout() {
  const navigate=useNavigate()
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const click=(e)=>{
    console.log('clickEvent',e);
    navigate(e.key,{
      replace:false,
      
    });
  }

  return (
    <div>
      <Layout>
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div className="demo-logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
        </Header>
        <Layout>
          <Sider
            width={200}
            style={{
              background: colorBgContainer,
            }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              // defaultOpenKeys={['sub1']}
              style={{
                height: '100%',
                borderRight: 0,
              }}
              items={items3}
              onClick={click}
            >
              {/* <Menu.Item icon={<UserOutlined/>} key="/home">
                <Link to="/home">数据概览</Link>
              </Menu.Item>
              <Menu.Item icon={<LaptopOutlined/>} key="/article">
                <Link to="/article">内容管理</Link>
              </Menu.Item>
              <Menu.Item icon={<NotificationOutlined/>} key="/publish">
                <Link to="/publish">发布文章</Link>
              </Menu.Item> */}
            </Menu>
          </Sider>
          <Layout
            style={{
              padding: '0 24px 24px',
            }}
          >
            <Breadcrumb
              style={{
                margin: '16px 0',
              }}
            >
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
              }}
            >
              内容
            </Content>
          </Layout>
        </Layout>
      </Layout>

    </div>  
  )
}
