import React, { Component } from "react"

import { AppContext } from './../store/common-context'

const ItemShow = (props) => {
  if (props.isShow) {
  return <p>这是条件渲染{props.value}</p>
  }
  return null
}

class Item extends Component {

  constructor() {
    super(...arguments);
    console.log(this.context, 1)
  }

  // 生命周期
  componentWillMount() {
    console.log(`这是item willMount`);
  }

  componentDidMount() {
    console.log(`这是item didMount`);
  }

  componentWillUpdate() {
    console.log(`这是item willUpdate`);
  }

  componentDidUpdate() {
    console.log(`这是item didUpdate`);
  }

  componentWillUnmount() {
    console.log(`unmount`);
  }

  render() {
    return (
      <h3>
        这是Item{" "}
        {
          [1, 2, 3].map(item => {
            return <ItemShow key={item} isShow={true} value={item} />;
          })
        }
      </h3>
    );
  }
}

Item.contextType = AppContext

export default Item;
