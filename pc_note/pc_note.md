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
    * 3. src下，创建store文件，下载并引入redux-thunk、redux-devtools-extension工具，从redux中引入createStore函数和applyMiddleware中间件，用于打包reducers，最后暴露store。
* 2.7 实现登录逻辑
    * 目标：在表单校验通过之后通过封装好的store登录接口
    * 1. switch循环中，type值为LOGIN时，进入判断，执行向服务器发送POST请求的函数，要添加的属性名为mobile(手机号)和code(验证码)，并把这个函数赋值给变量login。
    * 2. 将login函数异步赋值给变量res，```const res= await login```，并返回其中data对象中的token属性。
    * 3. 随后，在Login组件中，使用映射的方式，将状态和操作方法引进，并创建loginAction函数，在函数内获取用户数据和执行操作方法。
        * ```
            // 获取用户输入的数据
            const mobile=this.formRef.current.getFieldValue("username")
            const code=this.formRef.current.getFieldValue("password")
            const userData={mobile,code}
            console.log('Username:'+mobile,'Password:'+code);
            // 执行操作方法
            this.props.loginAction(userData)
          ```
    * 4. 获取用户数据后，设置if判断，若成功获取用户数据，则跳转到Layout组件中；否则，继续停留在Login组件。我的Login组件是类式组件，所以进行路由跳转，也就是编程式路由导航时，无法调用router6的hook。所以在/utils中创建了withRouter文件，在此文件中创建withRouter函数，并在Login组件中，将被connect函数处理过的Login作为参数传进withRouter函数中。
        * ```
            //withRouter函数
            // 1. 引入useNavigate hook
            import {  useNavigate } from "react-router-dom"

            // 2. 创建withRouter函数，并传递形参Component，日后在引用withRouter函数的组件中传递该组件为参数
            export const withRouter=(Component)=>{
            // 3. 创建Wrapper函数，传参props
            const Wrapper=(props)=>{
                // 4. useNavigate实例化
                const navigate=useNavigate()

                // 7. 并将该组件返回
                return(
                <Component
                // 5. 给组件添加navigate属性，其值为上面实例化的navigate
                    navigate={navigate}
                    // 6. 将组件原先的属性保留下来
                    {...props}
                />
                )
            }
            // 返回Wrapper函数中添加了新属性的组件
            return Wrapper
            }
          ```
          * ```
                // 调用WithRouter函数，参数应为组件，但同时暴露connect函数会报错，所以将在connect函数中处理的Login组件打包作为形参传入withRouter函数中
                export default withRouter(
                // 正常执行connect函数该干的映射操作
                connect(
                // 状态映射
                state=>({login:state.login}),
                // 操作状态的映射
                {
                    loginAction,
                    loginAsync
                }
                )
                // 注：在connect中处理后，返回，又作为withRouter的参数被处理(添加了个navigate属性)
                (Login)
                )
            ```
* 2.8 token持久化
    * 目标：能够统一处理token的持久化相关操作
    * 1. 创建utils/token.js文件
    * 2. 分别提供getToken/setToken/clearToken/isAuth四个工具函数并导出
    * 3. 创建utils/index.js文件，统一导出token.js中的所有内容，来简化工具函数的导入
    * 4. 将登录操作中用到token的地方，替换为该工具函数
        * (1) reducers/login.js文件中，初始化登录列表的同时，调用getToken()，赋值给变量token
        * (2) 将login函数异步赋值给变量res后，调用setToken()，传递res.data.token为参数，向localStorage中添加用户数据，以实现token持久化。
    * 持久化设置：
        * 目标：使用token函数持久化配置
        * 1. 拿到token的时候一式两份，存本地一份
        * 2. 初始化的时候优先从本地取，取不到在初始化为控制
* 2.9 请求拦截器注入token
    * 目标：把token通过请求拦截器注入到请求头中
    * 1. 在utils/http.js中的请求拦截器的成功的回调函数中，调用getToken()，来获取用户数据，取变量token、赋值
    * 2. 创建if判断，传入的条件为token，判断内部设置在请求头部添加token用户数据，``` config.headers.Authorization = `Bearer ${token}` ```
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
    * 2. 拷贝示例代码到Layout组件当中
    * 3. 分析并调整页面布局，拷贝代码到Layout组件当中之后，在浏览器中渲染的效果不是我想要的效果，所以需要对其进行一些调整
        * (1) 将侧边栏(Sider)部分的文本内容替换为```'数据概览','内容管理','发布文章'```
        * (2) 给侧边栏的导航选项绑定单击事件，点击导航选项后，会在展示区展示与其对应的组件(Home、Article、Publish)的内容
* 3.2 二级路由配置
    * 目标：能够在右侧内容区域展示左侧菜单对应的页面内容
    * 1. 在pages目录中，分别创建Home(数据概览)、Article(内容管理)、Publish(发布文章)页面文件夹
    * 2. 分别在三个文件夹中创建index.jsx，并创建基础组件后导出
    * 3. 在App.js中配置嵌套子路由，来Layout组件中配置路由出口，不用路由表，使用路由表就需要将App下所有子组件都写入路由表中，但因为在Login和Layout之间需要进行路由鉴权，所以不能一半路由表，一半一般路由配置。这里都是用一般的二级路由配置，并且匹配的路由地址需要写完整
    * 4. 创建由三个对象组成的数组，赋值给变量items3，每个对象含三个属性key、icon、label。key属性的值为```/layout/Home||Article||Publish```。
        * 4.1 将原先Menu标签中items属性的值替换为items3(原先是items2)，并在Menu标签中添加onClick事件，给onClick事件绑定click函数。在调用click函数前，引入useNavigate hook，在组件内调用赋值给变量navigate。在click函数中调用navigate()，给navigate方法传第一个参数e.key，意为点击items3中的哪一个对象就跳转到与其路径相匹配的组件当中，并展示其组件的内容；给navigate方法传第二个参数replace，值为false，意为设置跳转模式，不替代
        * 4.2 **不用了的方法，已用items3替代items2**：Layout组件中有items2，是侧边栏上三个图片遍历后返回的结果。遍历的回调中设置了label属性，是侧边栏中三个导航菜单选项的文本内容，想要把文本内容修改为我想要的文本内容，需要先添加单击事件的属性 onTitleClick。给单击事件绑定回调showCompon，并在调用showCompon函数前，创建subnav变量，变量值为由三个文本内容组成的数组，在showCompon函数中，使用forEach方法会subnav进行遍历，方法中传参item和index，以便于文本内容渲染在页面中
* 3.3 菜单高亮显示
    * 目标：能够在页面刷新时保持对应菜单高亮
    * 1. 将Menu的key属性改为与其对应的路由地址
        * 此处注意：key属性的值和注册路由时跳转的路由地址必须保持正确。首先，注册路由的规范写法应为```<Route path='home' element={<Home />}/>```，若path属性的值是```/layout/home```，到时候匹配的路径就会成为```http://localhost:3000/layout/layout/home```，因此必须拿规范写法书写。其次，key属性的值有两种写法，一种是相对路径的写法，就是下面代码示例；另一种就是绝对路径写法，```key:'/layout/home'```，当路由地址最前面有```/```的时候，意为替代原先地根路由地址，key的值称为新的路由地址，举个例子的话，若key的值为/home，那路由跳转的时候会跳转为```http://localhost:3000/home```，没有与此路径 匹配的路由。
        * ```
            const items3=[
                {
                    key:'home',
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
          ```
    * 2. 获取当前正在访问页面的路由地址
        * 调用useLocation hook来获取当前所在路径地址，获取后可以从中查看pathname属性，其属性值为当前所在路径地址，获取当前正在访问页面的路由地址有两种方法，一种为调用useLocation hook后得到的对象中用解构赋值的方式获取；另一种为调用useLocation hook后，把结果赋值给变量location，又从location中，以将location.pathname，赋值给另一变量的方法
            * ```
                const location=useLocation()
                console.log('location',location);  // 'location' Object
                // 当前所在的路径地址
                const selectedKey=location.pathname
                console.log('currentUrl',selectedKey);
              ```
    * 3. 将当前路由地址设置为selectedKeys属性的值
        * ```
            <Menu defaultSelectedKeys={[selectedKey]} selectedKeys={[selectedKey]}/>
          ```
* 3.4 展示个人信息
    * 目标：能够在页面右上角展示登录用户名
    * 1. 在redux/action和redux/reducers中各自添加用于获取用户信息的代码
    * 2. 在redux/reducers/index.js文件中添加useReducer的函数
        * 重新输入手机号和验证码，登录之后可以从action的data中获取输入的手机号码。此时调用get方法来从服务器端获取用户的信息userInfo，发送请求后，会先进入utils/http文件中请求拦截器的回调当中。因为肯定会从本地存储(localStorage)中获取token的值，所以进入if判断后，和login一样会在请求头信息中添加Authorization的值(就是token的值)。正式发送请求到服务器端之后，服务器对请求数据进行一系列的审核，若合法，便发送成功的响应给我，其成功的响应进入响应拦截器中，并返回成功的响应结果。拿着成功的响应结果，回到userReducer中，在get方法中又对成功的响应数据进行一些处理后，把其数据赋值给变量userInfo，打印userInfo就会发现，它是个对象，我需要的是其对象里data属性里的data属性里的mobile属性的值，因此另起变量名userMobile，```const userName=userInfo.data; return userName.data```。
    * 3. 在Layout组件中调用useReducer的函数，获取用户数据
        * 在Layout组件中通过connect函数获取映射的状态和操作方法，```state=>({userInfo:state.user}),{userAction}```，
    * 4. 在Layout组件中获取个人信息并展示
        * 实现该功能执行的代码顺序为此，1. 创建userAction对象->2. 将带有type属性和data属性的对象dispatch给store->store将preState打包给userReducer进行处理，也就是进入switch判断中->3. 若条件符合判断条件，则在判断内部对服务器(http://geek.itheima.net/v1_0user/profile)，发送get请求，从服务器中获取想要的用户的所有数据(这部分具体运行过程详细看3.4.2，就是怎么发送请求，得到成功响应后怎么处理数据)->4. 成功获取数据userName后，暴露该结果，store/index.js引入，统一暴露，以便于在组件中提取使用->5. 组件(Layout)当中，调用useEffect hook，在其回调函数内部执行，从props中解构赋值出的userAction()，若没有进行解构赋值的步骤的话，需写成props.userAction()，值得注意的是，useEffect hook接收两个参数，第二个参数为数组，可传递空数组作为依赖项，也可指定特定的依赖项，以防止避免无限循环更新和"Maximum update depth exceeded"错误的发生(我就发生了，问了chatgbt才恢复正常的)，在此我是将特定的依赖项作为参数传递的。最后在需要用到用户数据的位置，也就是页面头部的右侧中使用{userInfo.data.name}来展示用户名
    * 5. 正常应该是按照上面的步骤逐步进行，但我行不通，所以需要想另外的方法。我现在能展示了，但是不能刷新
        * 5.1 在Layout组件的useEffect方法的回调中，创建一个异步向服务器发送请求的函数，将其命名为getUserInfo，此函数中使用await/async方法向服务器发送get请求，获取成功的响应后，将其结果赋值给变量response。打印response之后会发现，其结果是一个对象，我需要的是此对象的data属性的data属性中的某个属性的值(name属性)的值，所以设置变量userInfo，并将response.data.data赋值给userInfo。
        * 5.2 在getUserInfo函数内执行操作方法userAction()，并将存有用户数据的变量userInfo作为参数传递进去，以此实现将获取到的用户数据结果发送到redux中。
        * 5.3 发送用户数据结果到redux中后，在redux/reducers/user.js中将获取到的结果原原本本地返回并共享。
            * ```
                case USER:
                    console.log('成功进入switch判断');
                    // 3. return data in reducer for share 
                    // 返回并共享从Layout组件中传递的数据
                    return {
                        ...preState,
                        data
                    }
              ```
        * 5.4 回到Layout组件在展示用户数据的位置用{userInfo.data.xxx}的方式，使用从redux共享的数据即可。
            * ```
                useEffect(
                    ()=>{
                    // 1. send get  result
                    // 在useEffect中发送get请求
                    const getUserInfo=async ()=>{
                        const response=await http.get('http://geek.itheima.net/v1_0/user/profile')
                        const userInfo=response.data.data
                        // 2. result send to redux
                        // 执行操作方法，并需要传入存有用户数据的变量作为参数
                        userAction(userInfo)
                    }
                    getUserInfo()
                    },[userAction])
              ```
* 3.5. 退出登录实现
    * 目标：能够实现退出登录功能
    * 1. 为气泡确认框添加确认回调事件
    * 2. 退出登录中的一个点：删除token，此步骤不需要在redux中共享数据，只在logout函数中，调用删除token的方法，clearToken()即可
    * 3. 退出后，返回登录页面
        * ```
            const onLogout=()=>{
                // 退出登录，要删除token，跳回到登录界面
                // 删除token不需要使用redux共享数据，直接在确认退出的函数里调用删除token的函数即可
                // logoutAction()
                clearToken()
                navigate('/login',{replace:false})
            }
          ```
* 3.6 处理Token失效，token有有效时间，一般是在两个小时左右，当超过这个规定时间时，token会失效，此时token就无法在request header部分做鉴权了
    * 目标：能够在响应拦截器中处理token失效
    * **说明：为了能够在非组件环境下拿到路由信息，需要安装一个history包--Mobx**
    * 1. 通过响应拦截器处理token失效，如果发现是401，则调回到登录页面
    * 2. 在http文件的响应拦截器的响应拦截器失败的回调中，设置一个if判断，其判断条件为错误结果的响应状态码等于401，满足该判断条件时，在判断内调用删除token的方法
    * 3. 并在其判断中设置，当满足判断条件时，路由跳转到Login组件当中。但因http是工具文件，无法在其中调用和使用router6 专用的useNavigate hook & Navigate组件，因此需要以纯JavaScript原生的路由跳转方式，来实现路由跳转。
        * ```
            if (error.response.status===401) {
                // 删除token
                clearToken()
                // 跳转到登录页
                // 纯JavaScript原生的跳转路由方式
                window.location.href='/login'
            }
          ```
* 3.7 首页Home图标展示
    * 目标：实现首页echart图标封装展示
    * 1. 使用echarts配合react封装柱状图组件Bar
        * 1.1 在ECHARTS官网首页中点击快速入门->在项目中引入ECharts
        * 1.2 按照要求，通过 npm 安装 ECharts ```npm install echarts --save```
        * 1.3 首先，引入ECharts demo，让代码先跑起来，并在Home组件中展示柱状图；其次，按照需求，抽象处理需要自定义的参数
    * 2. 要求组件的标题title，横向数据XData，纵向数据YData，样式style可定制
        * 2.1 将原先写在Home组件的代码搬到components/Bar组件当中，并在Home组件引入Bar组件后，渲染Bar组件，此时点击数据概览的导航选项，就会看到两个柱状图。
        * 2.2 回到Bar组件，按照需求，可以将可定制的(如横/纵向文本和数据、柱状图的title、样式等)抽离为一个一个的参数，最后可以将这些参数传递给Bar组件，当做props来使用。

## 四、文章管理模块
* 4.1 筛选区结构
    * 目标：能够使用antd组件库搭建筛选区域结构
    * 1. 从antd引入Card,Breadcrumb, Form, Button, Radio, DatePicker, Select组件。共分五个小部分，头部部分、状态部分、频道部分、日期部分、筛选按钮部分
    * 2. 头部：Card组件的title属性的值为展示当前所在路由地址的导航的标签
    * 3. 状态：Card标签的子标签Form，添加onFinish属性和initialValues属性。onFinish属性绑定一个函数，选择好状态、频道、日期选项后，点击筛选按钮，可以在控制台展示选择的内容；initialValues属性的值为一个对象，在此设置初次渲染时的默认选项。Form下Form.Item标签中设置label和name的值，以及该标签下，设置五个Radio，单选框选项，initialValues的值设置为与全部单选框的value属性相同的值。
    * 4. 频道：Form.Item下添加Select标签，给Select标签添加placeholder属性值、initialValues属性值，其值为luke、style样式。并又在Select下添加Option选项，给两个Option添加value属性，属性值为luke和artem。
    * 5. 日期：事先从引入的DatePicker中解构赋值出RangePicker，用Form.Item将RangePicker包裹起来。
    * 6. 筛选：用Form.Item包裹Button，Button的type类型为primary。
