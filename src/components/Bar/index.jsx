// 在此封装Bar组件

import React from 'react'
import * as echarts from 'echarts';
import { useEffect,useRef } from 'react';

export default function Bar({title,xData,yData,style}) {
  // 调用useRef方法，来在react中获取dom
  const domRef=useRef()
  // 初始化chartInit函数
  const chartInit=()=>{
    // 基于准备好的dom，初始化echarts实例。
    // const myChart = echarts.init(document.getElementById('main'));
    // init方法的参数替换为domRef.current
    const myChart = echarts.init(domRef.current);
    // 绘制图表，调用setOption方法来设置参数的配置
    myChart.setOption({
      title: {
        text: title
      },
      tooltip: {},
      xAxis: {
        data: xData
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: yData
        }
      ]
    });
  }

  // 调用chartInit函数
  useEffect(()=>{
    chartInit(title,xData,yData,style)
  },
  // 添加一个空的依赖项
  [xData,yData])
  return (
    <div>
      {/* 准备一个挂载节点 */}
      <div ref={domRef} style={style}></div>
    </div>
  )
}
