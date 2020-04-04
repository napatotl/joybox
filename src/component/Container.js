import React from 'react'
import { Layout } from 'antd'
import 'antd/dist/antd.css'
import { Typography } from 'antd';
const { Title } = Typography;

const { Header, Content } = Layout

const Component = (props) => {
  return (
    <Layout style={{height: '100vh'}}>
      <Header style={{ padding: '10px' }}>
        <Title style={{color: 'white', textAlign: 'center'}}>JOY BOX</Title>
      </Header>
      <Content style={{ padding: '20px 50px', textAlign: 'center' }}>
        {props.children}
      </Content>
    </Layout>
  )
}

export default Component


