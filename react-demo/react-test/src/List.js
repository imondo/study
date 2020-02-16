  
import React from "react"

const Item = () => {
  return 'slot'
}

const List = (props) => {
  console.log(props)
  const { history } = props

  const goRoute = () => {
    // history.push('/user')
    if (history) {
      history.go(-1)
    }
  }

  return (
    <h2>
      { props.name }{ props.children }
      这是列表页
      { props.match ? JSON.stringify(props.match.params) : null }
      <button onClick={goRoute}>跳转到用户</button>
    </h2>
  )
}


export default List;