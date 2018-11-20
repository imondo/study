import { ADD, DELETE } from '../constants/todo'

export const add = (data:string) => {
  return {
    data,
    type: ADD
  }
}

export const del = (id:number) => {
  return {
    id,
    type: DELETE
  }
}