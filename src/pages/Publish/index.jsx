import React from 'react'
import { Card,Breadcrumb, Form, Button, Radio, Upload, Select,Space,Input } from "antd"
import { Link } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons'

const {Option}=Select
export default function Publish() {
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
        <Form initialValues ={{type:1}}>
          {/* 标题部分 */}
          <Form.Item label="标题" name="title">
            <Input placeholder="请输入文章标题" style={{width:400}}/>
          </Form.Item>

          {/* 频道部分 */}
          <Form.Item label="频道" name="channel_id">
            <Select placeholder="请选择文章频道" style={{width:400}}>
              <Option value={0}>推荐</Option>
            </Select>
          </Form.Item>

          {/* 封面部分 */}
          <Form.Item label="封面">
            {/* 是否上传图片，若上传上传几张 */}
            <Form.Item name="type">
              <Radio.Group>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* 上传图片 */}
            <Upload name="image" listType="picture-card" className="avatar-uploader" showUploadList>
              <PlusOutlined/>
            </Upload>
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
