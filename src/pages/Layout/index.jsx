import React,{useEffect} from 'react'
import { 
  // Breadcrumb,
  Layout, Menu, Popconfirm, theme } from 'antd'
import { LaptopOutlined, NotificationOutlined, UserOutlined,LogoutOutlined } from '@ant-design/icons';
// import {NavLink} from 'react-router-dom'
import {userAction} from '../../redux/actions/user';
import {logoutAction} from '../../redux/actions/login'
import { useNavigate,useLocation,Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import './index.scss'

const { Header, Content, Sider } = Layout;

const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

// /layout/layout/home
// /layout /  layout/home

const items3=[
  {
    // /home home
    key:'/layout/home',
    icon:React.createElement(UserOutlined),
    label:`数据概览`
  },
  {
    key:'article',
    icon:React.createElement(LaptopOutlined),
    label:`内容管理`
  },
  {
    key:'publish',
    icon:React.createElement(NotificationOutlined),
    label:`发布文章`
  }
]

// after login, token is get
// token is identification  username and token is pair. so use token,
// we can identify username and it is login success
// server side get header.authorization attribute first and varify token is valid.

function GeekLayout(props) {
  console.log('props',props);  //props {userInfo: undefined, userAction: ƒ}
  const {userInfo,userAction}=props
  console.log('userInfo:',userInfo);

  const navigate=useNavigate()
  const location=useLocation()
  console.log('location',location);  // 'location' Object
  // 当前所在的路径地址
  const selectedKey=location.pathname
  console.log('currentUrl',selectedKey);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const click=(e)=>{
    console.log('clickEvent',e);
    const {key}=e
    console.log('diffKeys',key);  //diffKeys layout/home
    // 此方法为react-router5中，路由跳转时使用的方法，router6不适用
    // this.props.history.push(e.key)
    navigate(key,{
      replace:false
    });
  }

  // call back
  // when Effect event is triggered and then call  callback method

  // callback call action, 
  // this.props.userMobile <=> reducer state.mobile
  // this.props.userAction <=> action userAction 
  // call action() -> store.dispatch(action) -> reducer.switch -> case user -> get(user/profile)
  //                                                                store <- user.mobile(share)

  // 
  useEffect( 
    // 回调
    ()=>{
    // 执行操作方法
    userAction()
    
    // userAction variable
    // userAction()
  },[userAction])

  // 确认退出
  const onLogout=()=>{
    // 退出登录，要删除token，跳回到登录界面
    logoutAction()
    navigate('/login',{replace:false})
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
          <div className="demo-logo" width="200px" height="60px" background="url(../../assets/logo.png) no-repeat center / 160px auto" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
          <div className="user-info">
            <span className="user-name">user.name:潇洒哥112{userInfo.name}</span>
            <span className="user-logout">
              <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onLogout}>
                <LogoutOutlined/> 退出
              </Popconfirm>
            </span>
          </div>
        </Header>
        <Layout>
          <Sider
            width={200}
            style={{
              background: colorBgContainer,
            }}
          >
            {/* 选项高亮原理：defaultSelectedKeys===item.key */}
            {/* 需获取当前激活的path路径 */}
            <Menu
              mode="inline"
              // 后续会有多级路由，会是当前路由地址(对象)下，由多个对象组成的数组，所以虽然目前只是一个，selectedKeys属性的值也要写成数组形式的
              defaultSelectedKeys={[selectedKey]}
              // theme="dark"
              // defaultOpenKeys={['sub1']}
              selectedKeys={selectedKey}
              style={{
                height: '100%',
                borderRight: 0,
              }}
              items={items3}
              onClick={click}
            >
            </Menu>
          </Sider>
          <Layout
            style={{
              padding: '0 24px 24px',
            }}
          >
            {/* <Breadcrumb
              style={{
                margin: '16px 0',
              }}
            >
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb> */}
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
              }}
            >
              {/* 占位符 展示二级路由的内容 */}
              <Outlet/>
            </Content>
          </Layout>
        </Layout>
      </Layout>

    </div>  
  )
}

export default connect(
  // 状态映射
  state=>({userInfo:state.user,logout:state.login}),
  // 操作方法映射
  {userAction,logoutAction}
)(GeekLayout)