import { Link,useNavigate } from "react-router-dom"
import { Card,Breadcrumb, Form, Button, Radio, DatePicker, Select,Table,Space,Tag,Popconfirm } from "antd"
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import img404 from '../../assets/error.png'
import { useState,useEffect } from "react"
// import axios from 'axios'
import { http } from "../../utils"

const { Option } = Select
const { RangePicker } = DatePicker
export default function Article() {
  const navigate=useNavigate()
  // 引入useState，原状态，更新状态的方法  channel要以数组的形式参与遍历，所以在useState hook中传递空数组作为参数
  const [channel,setChannel]=useState([])
  // 在useEffect的回调中获取数据
  useEffect(()=>{
    const getChannel=async ()=>{
      // 发送请求
      const response=await http.get('http://geek.itheima.net/v1_0/channels')
      // 调用setChannel方法，传入从服务器获取的channel数据
      setChannel(response.data.data.channels)
    }
    getChannel()
  },[])

  const columns=[
    {
      title: '封面',
      dataIndex: 'cover',
      width:120,
      // render是一个函数，在此的意思是，render函数中返回一个模板，可以在当前列把这个模板渲染出来
        // cover为当前列的数据，会在函数体内返回出一个img标签，该标签的src属性中会做一个兼容处理，若有cover属性，就是当前封面字段存在cover属性，那就用封面字段，没有就用引入的img404
      render: cover => {
        return <img src={cover.images || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      // render是一个函数，在此使用data作为参数，引用Tag标签来展示当前状态的内容
      render: data => <Tag color="green">审核通过</Tag>
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      // render是一个函数，使用data作为参数，在此用来展示操作列的两个按钮
      render: data => {
        return (
          <Space size="middle">
            <Button 
              type="primary" 
              shape="circle" 
              icon={<EditOutlined />} 
              onClick={()=>goPublishId(data)}/>
            {/* 点击按钮后，弹出确认提示框，询问是否确认删除文章 */}
            <Popconfirm 
              title="是否确认删除该篇文章？" 
              okText="退出" 
              cancelText="取消"
              onConfirm={()=>deleteArticle(data)}
            >
                <Button
                  type="primary"
                  danger
                  shape="circle"
                  icon={<DeleteOutlined />}
                />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

  // 文章列表管理
  const [article,setArticle]=useState({
    list:[],
    count:0
  })

  // 2. 参数管理，就是初始化每一篇文章内容(对象)里的条数(参数)
  const [params,setParams]=useState({
    page:1,
    per_page:2
  })

  // 3. 发送请求，以获取数据
  useEffect(()=>{
    const getArticleList=async ()=>{
      // 发送请求
      const response=await http.get('http://geek.itheima.net/v1_0/mp/articles',{params})
      const articleList=response.data.data
      const {results,total_count}=articleList
      setArticle({list:results,count:total_count})
    }
    getArticleList()
  },[params])

  const onFinish=value=>{
    console.log('value:',value);
    const {status,channel_id,date}=value
    // 格式化表单数据，就是创建一个叫newParams的变量，其值为一个空对象，下面的一系列操作就是想=向newParams添加属性的操作
    const newParams={}
    // 格式化status，就是把在上面设置的param，其值为{page:1,per_page:10}，这个对象赋值给newParams的status
    newParams.status=status
    // 判断channel是否channel_id是否被选择
    if (channel_id) {
      // 被选，则在作为参数添加进去；没被选，则不作为新参数添加进去
      newParams.channel_id=channel_id
    }
    // 判断起终事件是否被选
    if (date) {
      // 被选，则作为新参数添加，并重新设置日期展示格式；不被选，不添加
      newParams.begin_pubdate=date[0].format('YYYY-MM-DD')
      newParams.end_pubdate=date[1].format('YYYY-MM-DD')
    }
    setParams({
      ...params,
      ...newParams
    })
  }

  const pageChange=pages=>{
    console.log('page',pages);
    setParams({
      ...params,
      pages
    })
  }

  // 删除文章
  const deleteArticle=async data=>{
    // console.log('delete',data);
    // 发送delete请求
    await http.delete(`http://geek.itheima.net/v1_0/mp/articles/${data.id}`)
    // 刷新列表
    setParams({
      // 保留删除前其他文章的参数
      ...params,
      // 默认在第一页
      page:1
    })
  }

  // 编辑文章跳转
  const goPublishId=data=>{
    navigate(`publish/id=${data.id}`,{replace:false})
  }
  return (
    <div>
      {/* 筛选区域 */}
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/layout/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form onFinish={onFinish} initialValues ={{value:-1}}>
          {/* 状态部分 */}
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={-1}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          {/* 频道部分 */}
          <Form.Item label="频道" name="channel_id">
            <Select placeholder="请选择文章频道" style={{width:120}}>
              {channel.map(channelItem=>(
                <Option key={channelItem.id} value={channelItem.id}>{channelItem.name}</Option>
              ))}
              
              {/* <Option value="artem">Artem</Option> */}
            </Select>
          </Form.Item>

          {/* 日期部分 */}
          <Form.Item label="日期" name="date">
            <RangePicker></RangePicker>
          </Form.Item>

          {/* 筛选按钮 */}
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{marginLeft:80}}>筛选</Button>
          </Form.Item>
        </Form>
      </Card>

      {/* 文章列表区域 */}
      <Card title={`根据筛选条件共查询到${article.count}条结果:`}>
        <Table rowKey="id" 
        columns={columns} 
        dataSource={article.list}
        pagination={{
          position:['bottomRight'],
          // 当前页数
          current:params.page,
          // 每页条数
          pageSize:params.per_page,
          total:article.count,
          onChange:pageChange
        }}/>
      </Card>
    </div>
  )
}
