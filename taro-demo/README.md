* 在 TypeScript 使用 Redux 的 connect 装饰器

```
export default connect(
  ({ todos }) => ({
    todos: todos.todos
  }),
  dispatch => ({
    add(data: string) {
      dispatch(add(data));
    },
    del(id: number) {
      dispatch(del(id));
    }
  })
)(Index as any);
```