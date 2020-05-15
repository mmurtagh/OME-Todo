import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { FAB, Searchbar, IconButton, Portal } from 'react-native-paper'
import debounce from 'lodash.debounce'

import Todo from './Todo'
import FilterDialog from './FilterDialog'
import { getColor, spacing } from '../../resources/style'
import { completeTodo, setFilter } from '../../redux/actions'
import { getContent } from '../../resources/content'
import { filterAndSortTodos } from './utils'

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing() },
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

function TodoList({ navigation, todos, filter, completeTodo, search }) {
  const [isDialogVisible, setIsDialogVisible] = useState(false)

  const onSearch = debounce((searchString) => {
    search(searchString)
  }, 250)

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
