import React from 'react'
import { Row, Col, Card, Typography, Button } from 'antd'
import Container from '../component/Container'
import TotalScore from '../component/TotalScore'

const { Title } = Typography

const Component = (props) => {
  const { isAnswerer, answers, vote, question, timer, player, players } = props

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
      <Row gutter={16}>
        <Col offset={6}></Col>
          {answers.map((answer) => {
            return (
              <Col>
                <Card size="small"  style={{ width: 300 }}>
                  <Title level={4}>{answer.text}</Title>
                  <Button disabled={isAnswerer || player.voteTo} onClick={() => vote(answer.answeredBy)}>Vote</Button>
                </Card>
              </Col>
            )
          })}
      </Row>
      <TotalScore players={players} />
    </Container>
  )
}

export default Component


