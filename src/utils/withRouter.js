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
