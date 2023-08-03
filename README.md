## Project Introduction
* Built with React technology, this project allows users to log in and not only view all published articles but also filter articles by channels and publish and edit their own articles.
## Project Goals
* After logging in, users can not only view published articles but also publish new articles and edit their own published articles.
## Main Contents
* 1. After logging in, the Layout page is rendered, displaying the user's ID on the upper right corner of the layout page. Clicking the Data Overview option in the left navigation bar will display a bar chart created using ECharts.
In the article publishing module, users can edit the article title, choose a channel, upload related images, input article content, and finally publish the article.
* 2. In the article management module, users can choose to edit published articles. After editing, clicking the Update Article button will update the published article.
## Technologies Used
* React
* react-router-dom
* antd (Ant Design)
* redux
* react-quill
## Summary
* It took a while to share user data using Redux. Instead of sending requests in the reducers' switch statements, the approach is to send requests, receive responses, call mapped action methods with user data as parameters in components, and then return the received data as-is in the reducers.
## Difficulties and Key Points
* 1. To share user data using Redux, it is also necessary to add the user's data to localStorage.
* 2. There is no need to send requests and get successful responses in the reducers' functions. Instead, useEffect hook is used in the components. In the callback function of the hook, sending requests and receiving responses are handled. To share data, call mapped action methods, pass the data variables you want to share as parameters to the mapped action methods, and then simply return the data as-is in the reducers. This makes sharing user data more convenient and clear.
## Impressions:
* 1. More solid understanding of Redux-related knowledge is needed, such as how to send asynchronous requests to the server and receive response results within the reducers' switch loops.
* 2. Agile utilization of the antd component library is essential.
## Start this project.
* 1. ![start the project](./pc_note/images/How%20start%20the%20project.PNG)
* 2. After successful startup, the URL is ```http://localhost:3000```. Please enter ```/login``` after 3000.
* 3. Please enter the following credentials: Username: 13811111111, Password: 246810. This will allow you to access and display the Layout Component.

## 项目介绍
* 使用React技术搭建脚手架，用户登录后，除了可以查看已发布的所有文章，根据频道筛选想要查看的文章，还可以发布并编辑文章。
## 项目目标
* 用户登录后，除了可以查看已发布文章，用户还可以发布文章和编辑用户自己发布的文章
## 主要内容
* 1. 登录后，渲染Layout页面，在布局页面的右上侧展示用户的id，并点击左侧导航栏的数据概览选项时，展示引入EChARTS制作的柱状图
* 2. 在发布文章模块，用户可以实现编辑文章标题、选择频道、上传相关图片、输入文章内容，最后发布文章的操作
* 3. 在文章管理模块，可以选择对已发布的文章进行编辑，编辑后点击更新文章按钮，实现对已发布文章的编辑功能
## 用到的技术
* React
* react-router-dom
* antd
* redux
* react-quill
## 总结
* 1. 使用redux共享用户数据时卡了很久，不用在reducers的switch判断中进行发送请求的操作，在组件中发送请求、接收响应、调用映射的操作方法并将用户数据作为参数传递后，在reducers中将获取的数据原原本本的返回即可。
## 难点与重点
* 1. 使用redux共享用户数据，还需要将用户的数据添加到localStorage当中
* 2. 不需要再reducers函数当中向服务器发送请求、获取成功响应。在组件当中调用useEffect hook后，在该hook的回调函数中，进行发送请求、接收响应的操作，想要共享数据，只需调用映射的操作方法，并向映射的操作方法传递想要共享的数据变量作为参数后，在reducers当中将数据原原本本地返回即可，这样就可以更便捷、清楚地共享用户数据
## 感受：
* 1. 需要更扎实地掌握Redux相关的知识，如：如何在reducers的switch循环中向服务器发送异步请求，并接收响应结果
* 2. 灵活运用antd组件库
## 启动该项目
* 1. ![start the project](./pc_note/images/How%20start%20the%20project.PNG)
* 2. 启动成功后，网址为```http://localhost:3000```，请在3000后输入```/login```。
* 3. 请输入，Username：13811111111，Password：246810，即可展示Layout