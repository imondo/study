import React, { Component } from 'react'

const ReduxPage = (props) => {
    return (
        <table border="1" cellSpacing="0">
            <thead>
                <tr>
                    <th>id</th>
                    <th>书名</th>
                    <th>作者</th>
                    <th>点赞</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>西游记</td>
                    <td>吴承恩</td>
                    <td>111</td>
                </tr>
            </tbody>
        </table>
    )
}

export default ReduxPage