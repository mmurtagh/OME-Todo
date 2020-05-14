import React, { useState } from 'react'
import { FlatList, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'
import { Button, FAB, Searchbar, IconButton, Portal } from 'react-native-paper'

import Todo from './Todo'
import FilterDialog from './FilterDialog'
import { getColor } from '../../resources/colors'
import { completeTodo } from '../../redux/actions'

function TodoList({ navigation, todos, completeTodo }) {
  const [isDialogVisible, setIsDialogVisible] = useState(false)

  const renderItem = ({ item }) => {
    return <Todo navigation={navigation} {...item} complete={completeTodo} />
  }

  return (
    <Portal.Host>
      <SafeAreaView style={{ flex: 1 }}>
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
        <View style={{ padding: 10 }}>
          <View style={{ flexDirection: 'row' }}>
            <Searchbar style={{ flex: 1 }} placeholder="Search" />
            <IconButton
              color={getColor('primary')}
              icon="filter"
              onPress={() => setIsDialogVisible(true)}
            />
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ paddingTop: 10 }}
            data={todos}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </SafeAreaView>
    </Portal.Host>
  )
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    completeTodo: (id) => dispatch(completeTodo(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
