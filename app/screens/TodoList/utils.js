import moment from 'moment'

import { sortByOptions } from '../../redux/actions'

export function filterAndSortTodos(todos, filter) {
  const { showInProgress, showCompleted, searchString, sortBy } = filter
  const filteredTodos = todos.filter(({ completionDate, name }) => {
    if (!showInProgress && !completionDate) {
      return false
    }

    if (!showCompleted && completionDate) {
      return false
    }

    // make search case insensitive
    if (
      searchString &&
      !name.toLowerCase().includes(searchString.toLowerCase())
    ) {
      return false
    }

    return true
  })

  return filteredTodos.sort((a, b) => {
    const aName = a.name
    const bName = b.name
    const aTargetDate = a.targetDate
    const bTargetDate = b.targetDate

    switch (sortBy) {
      case sortByOptions.nameDesc:
        return aName.localeCompare(bName)
      case sortByOptions.nameAsc:
        return !aName.localeCompare(bName)
      case sortByOptions.targetDateDesc:
        // if sorting by target date push all todos
        // with no target date to the botto of the list
        if (!aTargetDate) return 1
        if (!bTargetDate) return -1

        return moment(aTargetDate).utc() < moment(bTargetDate).utc()
      case sortByOptions.targetDateAsc:
        if (!aTargetDate) return 1
        if (!bTargetDate) return -1

        return moment(aTargetDate).utc() > moment(bTargetDate).utc()
      default:
        return true
    }
  })
}
