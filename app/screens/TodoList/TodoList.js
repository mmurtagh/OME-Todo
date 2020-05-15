import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { View } from 'react-native'
import {
  Card,
  FAB,
  IconButton,
  Portal,
  Searchbar,
  Subheading,
  Title,
} from 'react-native-paper'
import debounce from 'lodash.debounce'

import Todo from './Todo'
import FilterDialog from './FilterDialog'
import { getColor, spacing } from '../../resources/style'
import { completeTodo, setFilter } from '../../redux/actions'
import { getContent } from '../../resources/content'
import { filterAndSortTodos } from './utils'

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing() },
  emptyList: { alignItems: 'center' },
  emptyListSubheading: { textAlign: 'center' },
  fab: {
    zIndex: 1,
    position: 'absolute',
    marginBottom: 32,
    marginRight: 16,
    right: 0,
    bottom: 0,
    backgroundColor: getColor('primary'),
  },
  header: { flexDirection: 'row' },
  searchBar: { flex: 1 },
  list: { marginTop: spacing('small') },
})

TodoList.navigationOptions = ({ route }) => {
  return {
    headerTitle: 'Todo List',
  }
}

// @name TodoList
// @description
// Screen component used to show the user's list of todos.
// Todos in the list can be sorted/filtered using the filter button beside the search bar
// @params {obj} navigation - navigation object provided by react-navigation
// @params {array} todos - the array of all todos provided by the redux store
// @params {obj} filter - the filter object provided by the redux store
// @params {fn} completeTodo - function use to complete a todo. Passed down to each Todo component
// @params {fn} search - function used to search for substrings witin the names of todos
function TodoList({ navigation, todos, filter, completeTodo, search }) {
  const [isDialogVisible, setIsDialogVisible] = useState(false)

  const onSearch = debounce((searchString) => {
    search(searchString)
  }, 250)

  const renderItem = ({ item }) => {
    return <Todo navigation={navigation} {...item} complete={completeTodo} />
  }

  // Component that renders when there's no todos that match the current filter
  const renderEmptyList = () => (
    <Card>
      <Card.Content style={styles.emptyList}>
        <Title>{getContent('noResults')}</Title>
        <Subheading style={styles.emptyListSubheading}>
          {getContent('noResultsHelp')}
        </Subheading>
      </Card.Content>
    </Card>
  )

  return (
    <Portal.Host>
      <FilterDialog
        isVisible={isDialogVisible}
        hide={() => setIsDialogVisible(false)}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        // null id implies new todo
        onPress={() => navigation.navigate('TodoDetail', { id: null })}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <Searchbar
            onChangeText={onSearch}
            style={styles.searchBar}
            placeholder={getContent('search')}
          />
          <IconButton
            color={getColor('primary')}
            icon="filter"
            onPress={() => setIsDialogVisible(true)}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.list}
          data={filterAndSortTodos(todos, filter)}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={renderEmptyList()}
        />
      </View>
    </Portal.Host>
  )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      targetDate: PropTypes.string,
      completionDate: PropTypes.string,
    })
  ).isRequired,
  filter: PropTypes.shape({
    showInProgress: PropTypes.bool,
    showCompleted: PropTypes.bool,
    searchString: PropTypes.string,
    sortBy: PropTypes.string,
  }).isRequired,
  completeTodo: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
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
