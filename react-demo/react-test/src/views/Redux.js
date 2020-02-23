import React, { useState } from 'react'
import { insert } from './../store/actions/books'

/**
 * 触发一个action，所有的redux都会收到
 */

const ReduxPage = props => {
    console.log(props)
    const state = props.getState().books
    const [books, setBooks] = useState(state)
    const add = (id) => {
        props.dispatch(insert(id))
        setBooks(props.getState().books)
    }
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
                    <button onClick={add.bind(this, book.id)}>+</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
};

export default ReduxPage