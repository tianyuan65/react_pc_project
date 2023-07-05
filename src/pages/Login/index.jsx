import React,{Component} from 'react'
import './index.scss'
// 引入Card组件
import { Card, Checkbox, Form, Input,Button,message } from 'antd'
import logoPng from '../../assets/logo.png'
import {connect} from 'react-redux'
import { loginAction } from '../../redux/actions/login'
// 引入withRouter函数
import { withRouter } from '../../utils/withRouter'

class Login extends Component{
  formRef = React.createRef()

  // From组件中需要传递的两个函数，意味着，表单提交后，数据验证成功和失败后需要执行的回调函数
  onFinish= value=>{
    console.log('Success',value);
    // mobx方法，redux没法用，不删，当做错误示例
    // const {username,password}=value
    // try {
    //   await loginReducer.login({
    //     mobile:username,
    //     code:password
    //   })
    // } catch (error) {
    //   return error || '登录失败'
    // }
  }
  onFinishFailed=value=>{
    console.log('Failed',value);
  }

  loginAction=()=>{
    // console.log(this.name);
    // 获取用户输入的数据
    const mobile=this.formRef.current.getFieldValue("username")
    const code=this.formRef.current.getFieldValue("password")
    const userData={mobile,code}
    console.log('Username:'+mobile,'Password:'+code);
    // 执行操作方法
    this.props.loginAction(userData)

    // 判断是否成功获取用户数据，成功则，跳转页面到'/layout'；否则继续停留在Login组件
    if (userData) {
      // 提示用户成功
      message.success('登录成功')
      // 并跳转到Layout组件中，已添加navigate属性，所以以this.props.navigate()的方式调用，传参即可
      this.props.navigate('/layout')
    }else{
      // 提示用户失败
      message.error('登录失败')
      // 并继续在Login组件中，但我失败了，依旧跳转到了Layout组件
      this.props.navigate('/login')
    }
  }
  
  render(){
    return (
      <div className="login">
        {/* <h2>{this.props.login}</h2> */}
        <Card className="login-container">
          <img className="login-logo" src={logoPng} alt=""/>
          
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            autoComplete="off"
            validateTrigger={["onChange"]}
            ref={this.formRef}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Username is Required!',
                },
              ]}
            >
              <Input 
              placeholder="Please input your uername"/>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Password is Required!',
                },
              ]}
            >
              <Input.Password 
              placeholder="Please input your password"/>
            </Form.Item>
    
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
    
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              {/*  click loginAction function call
                   loginAction() 
              
              */}
              <Button type="primary" htmltype="submit" block
                 onClick={this.loginAction}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }  
}

// 调用WithRouter函数，参数应为组件，但同时暴露connect函数会报错，所以将在connect函数中处理的Login组件打包作为形参传入withRouter函数中
export default withRouter(
  // 正常执行connect函数该干的映射操作
  connect(
  // 状态映射
  state=>({login:state.login}),
  // 操作状态的映射
  {
    loginAction,
    // loginAsync
  }
  )
  // 注：在connect中处理后，返回，又作为withRouter的参数被处理(添加了个navigate属性)
  (Login)
)

