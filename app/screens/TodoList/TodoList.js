import React, { useState } from 'react'
import { FlatList, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'
import { Button, FAB, Searchbar, IconButton, Portal } from 'react-native-paper'
import debounce from 'lodash.debounce'

import Todo from './Todo'
import FilterDialog from './FilterDialog'
import { getColor } from '../../resources/colors'
import { completeTodo, setFilter, sortByOptions } from '../../redux/actions'

function TodoList({ navigation, todos, filter, completeTodo, search }) {
  const [isDialogVisible, setIsDialogVisible] = useState(false)

  const onSearch = debounce((searchString) => {
    search(searchString)
  }, 250)

  const filterAndSortTodos = () => {
    const {
      showInProgress,
      showCompleted,
      showOverdue,
      searchString,
      sortBy,
    } = filter
    const filteredTodos = todos.filter(
      ({ targetDate, completionDate, name }) => {
        if (!showInProgress && !completionDate) {
          return false
        }

        if (!showCompleted && completionDate) {
          return false
        }

        if (!showOverdue && targetDate && Date.now() > targetDate) {
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
      }
    )

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

          return aTargetDate < bTargetDate
        case sortByOptions.targetDateAsc:
          if (!aTargetDate) return 1
          if (!bTargetDate) return -1

          return aTargetDate > bTargetDate
        default:
          return true
      }
    })
  }

  const renderItem = ({ item }) => {
    return <Todo navigation={navigation} {...item} complete={completeTodo} />
  }

  return (
    <Portal.Host>
      <FilterDialog
        isVisible={isDialogVisible}
        onHide={() => setIsDialogVisible(false)}
      />
      <FAB
        style={{
          zIndex: 1,
          position: 'absolute',
          marginBottom: 32,
          marginRight: 16,
          right: 0,
          bottom: 0,
          backgroundColor: getColor('primary'),
        }}
        icon="plus"
        onPress={() => navigation.navigate('TodoDetail', { id: null })}
      />
      <View style={{ flex: 1, padding: 10 }}>
        <View style={{ flexDirection: 'row' }}>
          <Searchbar
            onChangeText={onSearch}
            style={{ flex: 1 }}
            placeholder="Search"
          />
          <IconButton
            color={getColor('primary')}
            icon="filter"
            onPress={() => setIsDialogVisible(true)}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 5 }}
          data={filterAndSortTodos(todos)}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </Portal.Host>
  )
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    completeTodo: (id) => dispatch(completeTodo(id)),
    search: (string) => {
      let searchString = string
      if (string === '') {
        searchString = null
      }

      dispatch(setFilter({ searchString }))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
