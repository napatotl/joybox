import React from 'react'
import { Row, Col, Input, Button, Typography, Divider, } from 'antd'
import Container from '../component/Container'

const { Title } = Typography

const Component = ({ isAnswerer, question, setAnswerText, answer, timer, player }) => {
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
            <Input size='large' onChange={(e) => setAnswerText(e.target.value)} />
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={6}>
            {/* TODO: validate input */}
            <Button size='large' onClick={answer} disabled={player.answer}>Submit</Button>
          </Col>
        </Row>
      </Container>
    )
  }
  return (
    <Container>
      <Row>
        <Col span={12} offset={6}>
          <Title level={2}>{`Question: ${question}`}</Title>
        </Col>
      </Row>
      <Row>
        <Col span={12} offset={6}>
          <Title level={4}>Wait for response... {timer} seconds</Title>
        </Col>
      </Row>
    </Container>
  )
}

export default Component
