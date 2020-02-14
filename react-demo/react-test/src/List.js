  
import React from "react"

const Item = () => {
  return 'slot'
}

const List = (props) => {
  return (
    <h2>{ props.name }{ props.children }</h2>
  )
}

export default List;