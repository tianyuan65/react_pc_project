import React from 'react'
import { Breadcrumb,Layout, Menu, theme } from 'antd'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
// import './index.scss'
import {Link,useLocation} from 'react-router-dom'

const { Header, Content, Sider } = Layout;

const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

// const subnav=['数据概览','内容管理','发布文章']
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

export default function GeekLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location=useLocation()
  const selectedKey=location.pathname
  console.log('被选择的选项是',selectedKey);
  
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
              defaultOpenKeys={['sub1']}
              selectedKeys={[selectedKey]}
              style={{
                height: '100%',
                borderRight: 0,
              }}
              items={items2}
            >
              <Menu.Item icon={<UserOutlined/>} key="">
                <Link to="/">数据概览</Link>
              </Menu.Item>
              <Menu.Item icon={<LaptopOutlined/>} key="/article">
              <Link to="/article">内容管理</Link>

              </Menu.Item>
              <Menu.Item icon={<NotificationOutlined/>} key="/publish">
                <Link to="/publish">发布文章</Link>
              </Menu.Item>
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
