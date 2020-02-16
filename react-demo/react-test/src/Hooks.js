import React, { useState } from 'react'

const Hooks = (props) => {

    const [ value, setValue ] = useState('这是state')
    const state = useState('这是state')
    
    console.log(state)
    return (
        <div>
            <h1>这是Hooks页面</h1>
            <p>{ value }</p>
            <button onClick={e => {
                setValue(perState => {
                    console.log(perState)
                    return '改变的state'
                })
            }}>改变state</button>
        </div>
    )
}

export default Hooks