import React from 'react'
import ReactDOM from "react-dom"

import List from './List'

import ListC from './ListC'

const ListDom = React.forwardRef((props, ref) => {
  console.log(props);
  return (
    <List ref={ref} {...props}>
      {props.children}
    </List>
  );
});

const ref = React.createRef();

class App extends React.Component {
  constructor() {
    super(...arguments);
    this.listF = React.createRef();
  }

  myClick(val) { // 可以通过子组件上函数访问子组件中的内容
    console.log(`父组件：` + val);
  }

  componentDidMount() {
    console.log(ref, this.listF);
    
  }

  render() {
    return (
      <div>
        <ListDom ref={ref} name="这是函数组件">
          slot
        </ListDom>
        <ListC ref={this.listF} myClick={this.myClick.bind(this)} />
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))