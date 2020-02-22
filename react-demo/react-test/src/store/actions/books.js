import actionTypes from "./actionTypes";

export const insert = (id) => ({
  type: actionTypes.INSERT,
  payload: {
    id
  }
})