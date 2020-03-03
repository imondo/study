import React from 'react'

import { GoBack } from './../components'

class Page extends React.Component {
    constructor() {
        super(...arguments)
        this.state = {
          name: ''
        }
    }
    handleChange(event) {
      this.setState({
        name: event.target.value
      })
    }
    render() {
        console.log(this.props);
        return (
          <div>
            <h1>这是page页面</h1>
            <input value={this.state.name} onChange={this.handleChange.bind(this)}></input>
            <GoBack />
          </div>
        );
    }
}

export default Page