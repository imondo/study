import React from 'react'
import { Route, Link } from 'react-router-dom'

const User = (props) => {
    const { match } = props
    return (
        <div>
            <div>
                <Link to={`${match.path}/login`}>登录</Link>
                <Link to="/user/reg">注册</Link>
            </div>
            <Route path={`${match.path}/login`}>login</Route>
            <Route path="/user/reg">reg</Route>
        </div>
    )
}

export default User