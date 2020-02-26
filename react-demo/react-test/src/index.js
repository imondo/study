import React, { Suspense } from "react"
import ReactDOM from "react-dom"
import {
  HashRouter as Router,
  Route
} from "react-router-dom"
import { Provider } from 'react-redux'

import App from './App'
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Suspense fallback={<div>Loading....</div>}>
        <Route render={() => <App /> }/>
      </Suspense>
    </Router>
  </Provider>,
  document.getElementById("root")
);