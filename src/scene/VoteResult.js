import React from 'react'
import { Row, Col, Typography, Card } from 'antd'
import Container from '../component/Container'
import Player from '../component/Player'
import ScoreBoard from '../component/ScoreBoard'

const { Title, Text } = Typography

const Component = (props) => {
  const { question, answers, players, timer } = props

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
      <Row gutter={16}>
        <Col offset={6} />
        {answers.map(answer => (
          <Col>
            <Card size="small" title={<Player name={players[answer.answeredBy].name} />} style={{ width: 300 }}>
              <Title level={4}>{answer.text}</Title>
              <Text>{(answer.votedBy || []).length !== 0 && 'Vote By:'}</Text>
              <Row>
                {
                  (answer.votedBy || []).map(playerKey => (
                    (
                      <Col offset={2}>
                        <Player name={players[playerKey].name} />
                      </Col>
                    )
                  ))
                }
              </Row>
            </Card>
          </Col>
          )
        )}
      </Row>
      <ScoreBoard players={players} />
    </Container>
  )
}

export default Component
