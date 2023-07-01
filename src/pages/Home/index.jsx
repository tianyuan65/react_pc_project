import React from 'react'
// import * as echarts from 'echarts';
// import { useEffect,useRef } from 'react';
import Bar from '../../components/Bar'

export default function Home() {
  // // 调用useRef方法，来在react中获取dom
  // const domRef=useRef()
  // // 初始化chartInit函数
  // const chartInit=()=>{
  //   // 基于准备好的dom，初始化echarts实例。
  //   // const myChart = echarts.init(document.getElementById('main'));
  //   // init方法的参数替换为domRef.current
  //   const myChart = echarts.init(domRef.current);
  //   // 绘制图表，调用setOption方法来设置参数的配置
  //   myChart.setOption({
  //     title: {
  //       text: 'ECharts 入门示例'
  //     },
  //     tooltip: {},
  //     xAxis: {
  //       data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  //     },
  //     yAxis: {},
  //     series: [
  //       {
  //         name: '销量',
  //         type: 'bar',
  //         data: [5, 20, 36, 10, 10, 20]
  //       }
  //     ]
  //   });
  // }

  // // 调用chartInit函数
  // useEffect(()=>{
  //   chartInit()
  // },
  // // 添加一个空的依赖项
  // [])
  // return (
  //   <div>
  //     {/* 准备一个挂载节点 */}
  //     <div ref={domRef} style={{width:'500px',height:'400px'}}></div>
  //   </div>
  // )

  return (
    <div>
      {/* 渲染Bar组件 */}
      <Bar 
        title='主流框架使用满意度' 
        xData={['react','vue','angular']}
        yData={['30','40','50']}
        style={{width:'500px',height:'400px'}}/>
      <Bar 
        title='剩余抽卡道具' 
        xData={['光头','马哈鱼','狗叠']}
        yData={['60','80','10']}
        style={{width:'300px',height:'200px'}}/>
    </div>
  )
}
