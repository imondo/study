import React from 'react';
import { GlobalStyle } from  './style';
import { IconStyle } from './assets/iconfont/iconfont';
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";
import store from "./store/index.js";
import routes from "./routes/index.js";
import { HashRouter as Router } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router className="App">
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        { renderRoutes(routes) }
      </Router>
    </Provider>
  );
}

export default App;
