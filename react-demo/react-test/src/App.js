import React from 'react'
import { Route, NavLink as Link, Switch, Redirect } from 'react-router-dom'

import { Page, List, ListC, User, Hooks, ReduxPage } from './views'

import ErrorPage from './components/ErrorPage'

import { AppContext, staticStore } from './store/common-context'

class App extends React.Component {
  static contextType = AppContext
  constructor() {
    super(...arguments);
    this.listF = React.createRef();
    this.state = {
      staticStore
    }
    console.log(this.context)
  }

  myClick(val) { // 可以通过子组件上函数访问子组件中的内容
    console.log(`父组件：` + val);
  }

  componentDidMount() {
    console.log(this.listF);

  }

  handleClick(e) {
    console.log(e)
  }

  render() {
    return (
      <AppContext.Provider value={staticStore}>
        <button onClick={this.handleClick.bind(this, '事件')}>事件绑定</button>
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
            <Link to="/lists">列表s</Link>
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
          <Route path="/lists" component={ListC}></Route>
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
          <Route path="/redux" render={(routeProps) => {
            return <ReduxPage {...routeProps}/>;
          }}></Route>
          <Redirect from="/" to="/home" exact></Redirect>
          {/* 没有写path表示匹配到所有的路径 */}
          <Route component={ErrorPage} />
        </Switch>
      </AppContext.Provider>
    );
  }
}

export default App