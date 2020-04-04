import React from 'react'
import { Row, Col, Card, Typography, Button } from 'antd'
import Player from '../component/Player'
import Container from '../component/Container'

const { Title } = Typography

const Component = (props) => {
  const { isAnswerer, answers, vote, question, players, timer, player } = props

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
                <Card size="small" title={<Player name={players[answer.answeredBy].name} />} style={{ width: 300 }}>
                  <Title level={4}>{answer.text}</Title>
                  <Button disabled={isAnswerer || player.voteTo} onClick={() => vote(answer.answeredBy)}>Vote</Button>
                </Card>
              </Col>
            )
          })}
      </Row>
    </Container>
  )
}

export default Component


