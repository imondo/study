import React, { Component } from 'react'
import Item from './Item'

class ListC extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      h1: "这是conponent标题"
    };
    console.log(this.props)
  }
  

  // 生命周期
  componentWillMount() {
    console.log(`willMount`);
  }

  componentDidMount() {
    console.log(`didMount`);
  }

  componentWillUpdate() {
    console.log(`willUpdate`);
  }

  componentDidUpdate() {
    console.log(`didUpdate`);
  }

  componentWillUnmount() {
    console.log(`unmount`);
  }

  handleClick(msg) {
    this.props.myClick("这是子组件的消息"); // 挂载在子组件上的事件
    this.setState(
      (prevState, props) => {
        console.log(prevState, props);
        return {
          h1: "修改的state"
        };
      },
      () => {
        console.log(this.state.h1);
      }
    );
    console.log(msg);
  }

  render() {
    return (
      <div>
        <h2 onClick={e => this.handleClick("呵呵")}>
          {this.state.h1}
        </h2>
        <Item isShow/>
      </div>
    );
  }
}

export default ListC