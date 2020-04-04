import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Player from './page/Player'
import Director from './page/Director'

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Player />
          </Route>
          <Route path="/director">
            <Director />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
