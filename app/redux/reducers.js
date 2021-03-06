import moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage'

import {
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  SET_FILTER,
  COMPLETE_TODO,
  RESET_FILTER,
  sortByOptions,
} from './actions'

const initialState = {
  todos: [
    {
      id: '1',
      name: 'Call Mom',
      description: 'Her birthday is on 11/30',
      targetDate: moment()
        .endOf('day')
        .format(),
      completionDate: null,
    },
  ],
  filter: {
    showInProgress: true,
    showCompleted: false,
    searchString: null,
    sortBy: sortByOptions.nameDesc,
  },
}

export function rootReducer(state, action) {
  if (state === undefined) {
    return initialState
  }

  switch (action.type) {
    case COMPLETE_TODO:
      return completeTodo(state, action)
    case DELETE_TODO:
      return deleteTodo(state, action)
    case UPDATE_TODO:
      return updateTodo(state, action)
    case ADD_TODO:
      return addTodo(state, action)
    case SET_FILTER:
      return setFilter(state, action)
    case RESET_FILTER:
      return resetFilter(state)
    default:
      return state
  }

  function completeTodo(state, { id }) {
    // find the appropriate todo and set its completionDate to now
    const updatedTodos = state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completionDate: moment(Date.now()).format() }
      }

      return todo
    })

    return { ...state, todos: updatedTodos }
  }

  function deleteTodo(state, { id }) {
    // filter out the deleted todo from the current todos
    const filteredTodos = state.todos.filter((todo) => {
      return todo.id !== action.id
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
}

// For a new todo, we generate an id,
// spread it into the parameterized todo,
// and concat that onto the list of todos
function addTodo(state, { todo }) {
  const id = `id_${new Date().getTime()}`

  const todoWithId = { ...todo, id }
  return { ...state, todos: state.todos.concat(todoWithId) }
}

function setFilter(state, { filter }) {
  return { ...state, filter: { ...state.filter, ...filter } }
}

// reset all filters except for the search string which is technically
// a filter, but unexpected behavior from pressing the "Reset Filters"
// button
function resetFilter(state) {
  return {
    ...state,
    filter: { ...initialState.filter, searchString: state.filter.searchString },
  }
}
