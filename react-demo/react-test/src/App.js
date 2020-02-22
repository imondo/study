import React from 'react'
import ReactDOM from "react-dom"
import { HashRouter, Route, NavLink as Link, Switch, Redirect } from 'react-router-dom'

import { Page, List, ListC, User, Hooks, ReduxPage } from './views'

import ErrorPage from './components/ErrorPage'

class App extends React.Component {
  constructor() {
    super(...arguments);
    this.listF = React.createRef();
  }

  myClick(val) { // 可以通过子组件上函数访问子组件中的内容
    console.log(`父组件：` + val);
  }

  componentDidMount() {
    console.log(this.listF);

  }

  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">首页</Link>
          </li>
          <li>
            <Link to="/page">Page</Link>
          </li>
          <li>
            <Link to="/user">用户</Link>
          </li>
          <li>
            <Link to="/list/1/4">列表</Link>
          </li>
          <li>
            <Link to="/hooks">hooks</Link>
          </li>
          <li>
            <Link to="/redux">redux</Link>
          </li>
        </ul>
        {/* Switch表示如果匹配到了路由，就不再往下面匹配了，如果不写Switch，则一直会匹配到404页面 */}
        <Switch>
          {/* 配置路由规则  exact表示精确匹配，防止匹配其他页面的时候匹配到/，也就是首页*/}
          <Route
            path="/home"
            exact
            render={routeProps => {
              return (
                <div>
                  <List name="这是函数组件" {...routeProps}>
                    slot
                  </List>
                  <ListC
                    ref={this.listF}
                    {...routeProps}
                    myClick={this.myClick.bind(this)}
                  />
                </div>
              );
            }}
          ></Route>
          <Route path="/page" component={Page}></Route>
          <Route path="/user" exact component={User}></Route>
          {/* 必须使用 component 来指定组件，不然访问不到match */}
          <Route path="/list/:id/:user" component={List}></Route>
          <Route path="/hooks" component={Hooks}></Route>
          {/* 登录 */}
          <Route
            path={`/user/login`}
            render={routeProps => {
              return (
                <List name="这是render渲染" user="mondo" {...routeProps} />
              );
            }}
          ></Route>
          <Route path="/user/reg" render={() => <div>reg</div>}></Route>
          <Route path="/redux" component={ReduxPage}></Route>
          <Redirect from="/" to="/home" exact></Redirect>
          {/* 没有写path表示匹配到所有的路径 */}
          <Route component={ErrorPage} />
        </Switch>
      </div>
    );
  }
}

ReactDOM.render(
  <HashRouter>
    <Route component={App} />
  </HashRouter>,
  document.getElementById("root")
);