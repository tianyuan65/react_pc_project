## 一、项目搭建
* 1.1 步骤：
    * 1. 使用create-react-app生成项目 npx create-react-app react_pc_project
    * 2. 进入根目录 
    * 3. 启动项目
    * 4. 调整能项目目录结构
        * /src
            * /assets       项目自建文件，如：图片等
            * /components   通用组件
            * /pages        页面
            * /store        mobx状态仓库
            * /utils        工具、如：token、axios等封装
            * App.js        根组件
            * index.css     全局样式
            * index.js      入口文件
* 1.2 使用scss预处理器
    * 1. 安装解析sass的包：npm i sass
    * 2. 创建全局样式文件：index.scss
        * ```
            body{
                margin:0
            }
            #root{
                height:100%
             }
          ```
* 1.3 配置基础路由
    * 1. 安装路由：npm i react-router-dom
    * 2. 在pages目录中创建两个文件夹：Login、Layout
    * 3. 分别在两个目录中创建index.js文件，并创建一个简单的组件后导出
    * 4. 在App组件中，导入路由组件以及两个页面组件
    * 5. 配置Login和Layout的路由规则
* 1.4 组件库antd的使用
    * 1. 安装antd组件库：npm i antd
    * 2. 全局导入antd组件库的样式
    * 3. 导入Button组件
    * 4. 在Login页面渲染Button组件进行测试
* 1.5 配置别名路径
    * 1. 安装修改CRA配置的包  npm i @craco/craco
    * 2. 在项目根目录中创建craco的配置文件：craco.config.js，并在配置文中配置路径别名
    * 3. 修改packae.json中的脚本命令
    * 4. 在代码中，就可以通过@来表示双人床目录的相对路径
    * 5. 重启项目，让配置生效
    * 代码实现
        * ```
            // 添加自定义对于webpack的配置
            const path=require('path')
            module.exports = {
                // webpack配置
                webpack:{
                    // 配置别名
                    alias:{
                        // 约定：使用 @ 表示src文件所在路径
                        '@':path.resolve(__dirname,'src')
                    }
                }
            };
          ```
* 1.6 @别名路径提示
    * 1. 在项目根目录创建jsconfig.json配置文件
    * 2. 在配置文件中添加一下配置
    * 代码实现
        * ```
            {
                "compilerOptions":{
                    "baseUrl":"./",
                    "paths":{
                        "@/*":["src/*"]
                    }
                }
            }
          ```
    * 作用：能够让vscode识别@路径并给出路径提示

## 二、登录模块
* 2.1 基本结构搭建
    * 1. 在Login组件中创建登录页面基本结构
    * 2. 在Login目录中创建index.scss文件，指定组件样式
    * 3. 在logo.png和login.png拷贝到assets目录
* 2.2 创建表单结构
    * 1. 打开antd Form组建文档
    * 2. 引入Form的第一个示例到Login组件当中
    * 3. 分析From组件基本结构
    * 4. 调整Form组件结构和样式
* 2.3 表单校验实现
    * 目标：为手机号码和摩玛添加表单校验
    * 1. 为Form组件添加 validateTrigger 属性，指定校验触发时机的集合
    * 2. 为Form.Item组件添加name属性，这样表单校验才会生效
    * 3. 为Form.Item组件添加rules属性，用来添加表单校验
* 2.4 获取登录表单数据
    * 目标：拿到登录表单中用户的手机号码和验证码
    * 1. 为Form组件添加onFinish属性，该事件会在点击登录按钮时触发
    * 2. 创建onFinish函数，通过函数参数value获取表单值
    * 3. Form组件添加initialValues属性，用于初始化表单值
* 2.5 封装http工具模块
    * 目标：封装axios，简化操作
    * 1. 创建utils/http.js文件
    * 2. 创建axios实例，配置baseURL，请求拦截器，响应拦截器
    * 3. 在utils/index.js中，统一导出http
* 2.6 配置登录redux
    * 目标：给予redux封装管理用户登录的store
    * 1. 创建loginAction对象和loginAsync对象，第一个的返回值是普通的action对象；第二个的返回值是函数
    * 2. 创建loginReducer组件，初始化登录信息列表，将其列表赋值给preState，并将preState和action作为参数传入。进入函数内部后从action中解构赋值出属性type和data，并创建switch循环，判断条件为type。
    * 3. 创建store文件，下载并引入redux-thunk、redux-devtools-extension工具，从redux中引入createStore函数和applyMiddleware中间件，用于打包reducers，最后暴露store。
* 2.7 实现登录逻辑 如何使用redux实现还是个迷。。。。，所以先把mobx的逻辑写下来，等我通透了再说
    * 目标：在表单校验通过之后通过封装好的store登录接口
    * 1. switch循环中，type值为LOGIN时，进入判断，执行向服务器发送POST请求的函数，要添加的属性名为mobile(手机号)和code(验证码)，并把这个函数赋值给变量login。
    * 2. 将login函数异步赋值给变量res，```const res= await login```，并返回其中data对象中的token属性。
* 2.8 token持久化
    * 目标：能够统一处理token的持久化相关操作
    * 1. 创建utils/token.js文件
    * 2. 分别提供getToken/setToken/clearToken/isAuth四个工具函数并导出
    * 3. 创建utils/index.js文件，统一导出token.js中的所有内容，来简化工具函数的导入
    * 4. 将登录操作中用到token的地方，替换为该工具函数
        * (1) reducers/login.js文件中，初始化登录列表的同时，调用getToken()，赋值给变量token
    * 持久化设置：
        * 目标：使用token函数持久化配置
        * 1. 拿到token的时候一式两份，存本地一份
        * 2. 初始化的时候优先从本地取，取不到在初始化为控制
* 2.9 请求拦截器注入token
    * 目标：把token通过请求拦截器注入到请求头中
* 2.10 路由鉴权实现
    * 目标：能够实现未登录时访问拦截并跳转到登录页面
    * 1. 在components目录中，创建AuthRoute组件
    * 2. 判断是否登录
    * 3. 登陆时，直接渲染相应页面组件
    * 4. 未登录时，重定向到登录页面

## 三、Layout模块
* 3.1 基本结构搭建
    * 目标：能够使用antd搭建基础布局，找到示例：顶部-侧边布局-通栏
    * 1. 打开antd/Layout布局组件，找到示例
    * 2. 拷贝示例代码到Layout组件当中、
    * 3. 分析并调整页面布局
* 3.2 二级路由配置
    * 目标：能够在右侧内容区域展示左侧菜单对应的页面内容
    * 1. 在pages目录中，分别创建Home(数据概览)、Article(内容管理)、Publish(发布文章)页面文件夹
    * 2. 分别在三个文件夹中创建index.jsx，并创建基础组件后导出
    * 3. 在App.js中配置嵌套子路由，来Layout组件中配置路由出口
    * 4. 使用Link修改左侧菜单内容，与子路由规则匹配实现路由切换
* 3.3 菜单高亮显示
    * 目标：能够在页面刷新时保持对应菜单高亮
    * 1. 将Menu的key属性改为与其对应的路由地址
    * 2. 获取当前正在访问页面的路由地址
    * 3. 将当前路由地址设置为selectedKeys属性的值