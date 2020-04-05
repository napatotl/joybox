import React from 'react'
import { Row, Col, Typography } from 'antd'
import 'antd/dist/antd.css'
import Player from '../component/Player'
const { Title } = Typography

const Component = ({ players }) => {
  return (
    <Row>
      <Col span={12} offset={6}>
      <Title level={2}>
        Total score
      </Title>
      {Object.keys(players).map((key) => {
         const player = players[key]
         return (
           <div>
             <Player name={player.name} score={player.score} />
           </div>
         )
       })}
      </Col>
    </Row>
  )
}

export default Component
