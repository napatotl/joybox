import React from 'react'
import { Row, Col, Input, Button, Typography } from 'antd'
import Container from '../component/Container'
import TotalScore from '../component/TotalScore'

const { Title } = Typography

const Component = ({ isAnswerer, question, setAnswerText, answer, timer, player, players }) => {
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
            <Input size='large' onChange={(e) => setAnswerText(e.target.value)}/>
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={6}>
            {/* TODO: validate input */}
            <Button size='large' onClick={answer} disabled={player.answer}>Submit</Button>
          </Col>
        </Row>
        <TotalScore players={players} />
      </Container>
    )
  }
  return (
    <Container>
      <Row>
          <Col span={12} offset={6}>
            <Title level={4}>{`Timer: ${timer}`}</Title>
          </Col>
      </Row>
      <Row>
        <Col span={12} offset={6}>
          <Title level={2}>Not your turn, Please wait.</Title>
        </Col>
      </Row>
      <TotalScore players={players} />
    </Container>
  )
}

export default Component


