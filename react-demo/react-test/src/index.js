import React from "react"
import ReactDOM from "react-dom"
import {
  HashRouter,
  Route
} from "react-router-dom"

import App from './App'
import store from "./store";

ReactDOM.render(
  <HashRouter>
    <Route render={() => <App store={store} />} />
  </HashRouter>,
  document.getElementById("root")
);