import React from 'react'
import { Row, Col, Input, Typography } from 'antd'
import Container from '../component/Container'
import ScoreBoard from '../component/ScoreBoard'

const { Title } = Typography

const Component = (props) => {
  const { isAnswerer, question, setAnswerText, timer, players } = props
  if (isAnswerer) {
    return (
      <Container>
        <Row>
          <Col span={12} offset={6}>
            <Title level={4}>{`Timer: ${timer}`}</Title>
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={6}>
            <Title level={2}>{`Question: ${question}`}</Title>
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={6}>
            <Input size="large" onChange={e => setAnswerText(e.target.value)} />
          </Col>
        </Row>
        <ScoreBoard players={players} />
      </Container>
    )
  }
  return (
    <Container>
      <Row>
        <Col span={12} offset={6}>
          <Title level={4}>{`Timer: ${timer}`}</Title>
        </Col>
        <Col span={12} offset={6}>
          <Title level={2}>{`Question: ${question}`}</Title>
        </Col>
      </Row>
      <Row>
        <Col span={12} offset={6}>
          <Title level={4}>Wait for response...</Title>
        </Col>
      </Row>
      <ScoreBoard players={players} />
    </Container>
  )
}

export default Component
