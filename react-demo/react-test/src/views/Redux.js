import React, { useState } from 'react'
import { connect } from 'react-redux'
import { insert } from './../store/actions/books'

/**
 * 触发一个action，所有的redux都会收到
 */

const ReduxPage = props => {
    console.log(props)
    const [books] = useState(props.books)
     return (
      <div>
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
            {books.map(book => {
              return (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>
                    {book.star}
                    <button onClick={props.insert.bind(this, book.id)}>+</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
};

// 重新定义数据挂在到当前组件props上
const mapStateToProps = state => {
  console.log(state)
  return {
    books: state.books
  }
}

// 重新定义方法注入到当前组件props上 
const mapDispatchToProps = dispatch => {
  return {
    add: id => dispatch(insert(id))
  }
}

export default connect(mapStateToProps, { insert })(ReduxPage)