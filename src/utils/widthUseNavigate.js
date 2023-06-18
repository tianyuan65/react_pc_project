import { useNavigate } from "react-router-dom"

const widthUseNavigate=(WrapCompontent)=>{
  return function NavigateComponent(){
    const navigate=useNavigate()
    // 给组件添加一个属性to，以便于路由跳转
    return <WrapCompontent to={navigate}/>
  }
}
export default widthUseNavigate
