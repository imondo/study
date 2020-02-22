import React from 'react'

import { withRouter } from 'react-router-dom'


const GoBack = props => {
  console.log(props)
  const goBack = () => {
    props.history.go(-1)
  }
  return <button onClick={goBack}>返回</button>
}

export default withRouter(GoBack)