import moment from 'moment'

import {
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  SET_FILTER,
  COMPLETE_TODO,
} from './actions'

const initialState = {
  todos: [
    {
      id: '1',
      name: 'Call Mom',
      description: 'Her birthday is on 11/30',
      targetDate: moment().endOf('day'),
      completionDate: null,
    },
  ],
  foo: 'bar',
}

export function mainReducer(state, action) {
  if (state === undefined) {
    return initialState
  }

  switch (action.type) {
    case COMPLETE_TODO:
      console.debug('test')
      return completeTodo(state, action)
    case DELETE_TODO:
      return deleteTodo(state, action)
    case UPDATE_TODO:
      return updateTodo(state, action)
    case ADD_TODO:
      return addTodo(state, action)
  }

  function completeTodo(state, { id }) {
    // find the appropriate todo and set its completionDate to now
    const updatedTodos = state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completionDate: Date.now() }
      }

      return todo
    })

    return { ...state, todos: updatedTodos }
  }

  function deleteTodo(state, { id }) {
    // filter out the deleted todo from the current todos
    const filteredTodos = state.todos.filter((todo) => {
      todo.id !== action.id
    })

    return { ...state, todos: filteredTodos }
  }

  function updateTodo(state, { todo: updatedTodo }) {
    // map through each todo into a new array.
    // when we find the modified todo, return the
    // todo passed into the action
    const updatedTodos = state.todos.map((todo) => {
      if (todo.id === updatedTodo.id) {
        return updatedTodo
      }

      return todo
    })

    return { ...state, todos: updatedTodos }
  }

  return state
}

// For a new todo, we generate an id,
// spread it into the parameterized todo,
// and concat that onto the list of todos
function addTodo(state, { todo }) {
  const id = `id_${new Date().getTime()}`

  const todoWithId = { ...todo, id }
  return { ...state, todos: state.todos.concat(todoWithId) }
}
