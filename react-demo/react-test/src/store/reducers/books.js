import actionTypes from "./../actions/actionTypes";

const initState = [
  {
    id: 1,
    title: "西游记",
    author: "吴承恩",
    star: 55
  }
]

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.INSERT:
      return state.map(v => {
        if (v.id === action.payload.id) {
          v.star++
        }
        return v
      });
    default:
      return state;
  }
}
