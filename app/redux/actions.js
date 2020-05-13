// action types
export const ADD_TODO = 'ADD_TODO'
export const COMPLETE_TODO = 'COMPLETE_TODO'
export const MODIFY_TODO = 'MODIFY_TODO'
export const SET_FILTER = 'SET_FILTER'

// actions
export function addTodo(todo) {
  return { type: ADD_TODO, todo }
}

export function completeTodo(id) {
  return { type: COMPLETE_TODO, id }
}

export function modifyTodo(todo) {
  return { type: MODIFY_TODO, todo }
}

export function setFilter(filter) {
  return { type: SET_FILTER, filter }
}
