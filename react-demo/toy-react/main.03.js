import { createElement, Component, render } from "./toy-react.02.js";

class MyComponent extends Component {
  constructor() {
    super();
    this.state = {
      a: 1,
      b: 2,
    };
  }
  render() {
    return (
      <div>
        <h1>my Component</h1>
        <button
          onclick={() => {
            this.setState({
              a: +this.state.a++,
            });
          }}
        >
          add
        </button>
        <span>{this.state.a.toString()}</span>
        <span>{this.state.b.toString()}</span>
        {this.children}
      </div>
    );
  }
}

render(
  <MyComponent id="a" class="b">
    <div>abc</div>
    <div></div>
    <div></div>
  </MyComponent>,
  document.body
);
