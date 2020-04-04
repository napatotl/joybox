import React from 'react'
import { Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
const { Paragraph } = Typography

const Component = ({ name, score }) => {
  return score || score === 0 ?
    <span><UserOutlined /><Paragraph>{`${name}: ${score}`}</Paragraph></span> :
    <span><UserOutlined /><Paragraph>{name}</Paragraph></span>
}

export default Component