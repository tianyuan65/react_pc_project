import { Link } from "react-router-dom"
import { Card,Breadcrumb, Form, Button, Radio, DatePicker, Select } from "antd"

const { Option } = Select
const { RangePicker } = DatePicker
export default function Article() {
  const onFinish=value=>{
    console.log('value:',value);
  }
  return (
    <div>
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
            <Select placeholder="请选择文章频道" initialvalues="luke" style={{width:120}}>
              <Option value="luke">Luke</Option>
              <Option value="artem">Artem</Option>
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
    </div>
  )
}
