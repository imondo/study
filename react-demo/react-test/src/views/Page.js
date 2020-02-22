import React from 'react'

import { GoBack } from './../components'

class Page extends React.Component {
    constructor() {
        super(...arguments)
    }

    render() {
        console.log(this.props);
        return (
          <div>
            <h1>这是page页面</h1>
            <GoBack />
          </div>
        );
    }
}

export default Page