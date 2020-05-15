const content = {
  addTodo: 'Add Todo',
  apply: 'Apply',
  cancel: 'Cancel',
  chooseDate: 'Choose Date',
  clearDate: 'Clear Date',
  complete: 'Complete',
  completionDate: 'Completion Date',
  delete: 'Delete',
  description: 'Description',
  edit: 'Edit',
  filters: 'Filters',
  inProgress: 'In Progress',
  name: 'Name',
  nameAsc: 'Name Ascending',
  nameDesc: 'Name Descending',
  none: 'None',
  noTargetDate: 'This todo has no target date',
  required: 'Required',
  resetFilters: 'Reset Filters',
  saveChanges: 'Save Changes',
  search: 'Search',
  showCompleted: 'Show Completed Todos',
  showInProgress: 'Show In Progress Todos',
  sortBy: 'Sort By',
  targetDate: 'Target Date',
  targetDateAsc: 'Target Date Ascending',
  targetDateDesc: 'Target Date Descending',
  todoInProgress: 'This todo is in progress',
}

export function getContent(key) {
  if (Object.keys(content).includes(key)) {
    return content[key]
  }

  return 'CONTENT NOT FOUND'
}
