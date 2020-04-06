import React from 'react'
import { Row, Col, Input, Button, Typography } from 'antd'
import Container from '../component/Container'
import ScoreBoard from '../component/ScoreBoard'

const { Title } = Typography

const Component = (props) => {
  const { isAnswerer, question, setAnswerText, answer, timer, player, players, answerText } = props
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
            <Input size="large" disabled={player.answer} onChange={e => setAnswerText(e.target.value)} />
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={6}>
            {/* TODO: validate input */}
            <Button size="large" onClick={answer} disabled={player.answer || answerText === ''}>Submit</Button>
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
          <Title level={2}>{`Question: ${question}`}</Title>
        </Col>
      </Row>
      <Row>
        <Col span={12} offset={6}>
          <Title level={4}>Wait for response... {timer} seconds</Title>
        </Col>
      </Row>
      <ScoreBoard players={players} />
    </Container>
  )
}

export default Component
