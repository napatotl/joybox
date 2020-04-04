import React from 'react'
import { Row, Col, Input, Button, Typography } from 'antd'
import Container from '../component/Container'

const { Title } = Typography

const Component = (props) => {
  const { setPlayerName, login, loggedIn, playerName } = props 
  if (loggedIn) {
    return (
      <Container>
        <Row>
          <Col span={12} offset={6}>
            <Title level={2}>{`Hello ${playerName}`}</Title>
            <Title level={3}>Game is about to starting soon ~</Title>
          </Col>
        </Row>
      </Container>
    )
  }
  return (
    <Container>
      <Row>
        <Col span={12} offset={6}>
          <Input size='large' onChange={(e) => setPlayerName(e.target.value)}/>
          {/* TODO: validate input */}
          <Button size='large' onClick={() => login()}>Login</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Component
