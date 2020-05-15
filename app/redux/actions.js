// action types
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'MODIFY_TODO'
export const SET_FILTER = 'SET_FILTER'
export const DELETE_TODO = 'DELETE_TODO'
export const COMPLETE_TODO = 'COMPLETE_TODO'
export const sortByOptions = {
  nameDesc: 'NAME_DESC',
  nameAsc: 'NAME_ASC',
  targetDateDesc: 'TARGET_DATE_DESC',
  targetDateAsc: 'TARGET_DATE_ASC',
}
export const RESET_FILTER = 'RESET_FILTER'

// actions
export function addTodo(todo) {
  return { type: ADD_TODO, todo }
}

export function deleteTodo(id) {
  return { type: DELETE_TODO, id }
}

export function updateTodo(todo) {
  return { type: UPDATE_TODO, todo }
}

export function completeTodo(id) {
  return { type: COMPLETE_TODO, id }
}

export function setFilter(filter) {
  return { type: SET_FILTER, filter }
}

export function resetFilter() {
  return { type: RESET_FILTER }
}
