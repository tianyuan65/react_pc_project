import { Card,Breadcrumb, Form, Button, Radio, Upload, Select,Space,Input } from "antd"
import { Link } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.scss'
import { useState,useEffect,useRef } from 'react';
import { http } from "../../utils";

const {Option}=Select
export default function Publish() {
  // 获取频道数据
  const [channel,setChannel]=useState([])
  useEffect(()=>{
    // 获取数据的函数
    const getChannel=async ()=>{
      // 发送请求
      const response=await http.get('http://geek.itheima.net/v1_0/channels')
      const channelList=response.data.data.channels
      // 更新数据
      setChannel(channelList)
    }
    getChannel()
  },[])
  
  // 声明一个图片暂存仓库
  const fileListRef=useRef([])
  // 上传图片数据
  const [fileList,setFileList]=useState([])
  // 绑定在Upload标签的onChange事件上的函数
  const uploadChange=file=>{
    console.log('fileData',file);
    // 上传图片是一个过程，平均会打印出三个file对象，对file对象的fileList数组进行遍历，在遍历的回调中设置if判断
    const fileData = file.fileList.map(file => {
      // 符合该判断条件(file.response，该对象的data属性值为上传的图片数据)时，进入判断，
      if (file.response) {
        // 并将图片数据的链接作为返回值，存储在fileData中；
        return {
          url: file.response.data.url
        }
      }
      // 否则直接返回遍历的结果
      return file
    })
    // 更新图片数据
    setFileList(fileData)
    // 在此向仓库中存入图片
    fileListRef.current=fileData
  }

  // 设置单选框的状态、更新状态的方法和初始默认值
  const [imgCount,setImgCount]=useState(1)
  // 是否上传图片的函数
  const typeChange=event=>{
    console.log('typeEvent',event);
    // 获取点击的单选框的value值，也就是在Radio组件里的value属性的值
    const count=event.target.value
    // 更新数据
    setImgCount(count)

    if (count===1) {
      // 单图，只展示一张图片
      const firstImg=fileListRef.current[0]
      // 更新数据，若没有第一张图片，则返回一个空数组，并不展示；否则展示图片
      setFileList(firstImg ? [firstImg] : [])
    }else if (count===3) {
      // 三图，展示所有选中的图片
      setFileList(fileListRef.current)
    }
  }
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/layout/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>发布文章</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form 
          initialValues ={{type:1,content:'Enter content here'}} 
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
        >
          {/* 标题部分 */}
          <Form.Item label="标题" name="title">
            <Input placeholder="请输入文章标题" style={{width:400}}/>
          </Form.Item>

          {/* 频道部分 */}
          <Form.Item label="频道" name="channel_id"  rules={[{ required: true, message: '请选择文章频道' }]}>
            <Select placeholder="请选择文章频道" style={{width:400}}>
              {
                channel.map(item=>(
                  <Option value={item.id} key={item.id}>{item.name}</Option>
                ))
              }
            </Select>
          </Form.Item>

          {/* 封面部分 */}
          <Form.Item label="封面">
            {/* 是否上传图片，若上传，上传几张 */}
            <Form.Item name="type">
              <Radio.Group onChange={typeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* 上传图片 */}
            {/* 判断imgCount值，大于0(选了单图或三图的单选框)，则渲染Upload组件；否则不渲染 */}
            {imgCount>0 && (
              <Upload 
                name="image" 
                listType="picture-card" 
                className="avatar-uploader" 
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={uploadChange}
                maxCount={imgCount}
                multiple={imgCount>1}
              >
                <div style={{marginTop:8}}>
                  <PlusOutlined/>
                </div>
              </Upload>
            )}
          </Form.Item>

          {/* 输入文章内容 */}
          <Form.Item 
            label="内容"
            name="content"
            // 该对象必须是以数组形式，否则报错
            rules={[{required:true,message:'请输入文章内容'}]}
            >
              {/* 次富文本组件由Form.Item控制，它的输入内容，会在onFinish回调中收集 */}
              <ReactQuill theme="snow" />
          </Form.Item>

          {/* 发布文章内容 */}
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">发布文章</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
