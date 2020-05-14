import React, { useState } from 'react'
import { FlatList, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'
import { Button, FAB, Searchbar, IconButton, Portal } from 'react-native-paper'

import Todo from './Todo'
import FilterDialog from './FilterDialog'
import { getColor } from '../../resources/colors'

const fakeTodos = [
  {
    id: '1',
    name: 'Call Mom',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quae quas, eius ratione commodi reiciendis sit repellat ea porro aliquam?',
    targetCompletionDate: 'Aug 14, 2020',
    completionDate: '11/10/20',
  },
  {
    id: '2',
    name: 'Review water bill',
    description: 'It was a lot higher this month for some reason.',
    targetCompletionDate: '11/11/20',
    completionDate: '',
  },
  {
    id: '3',
    name: 'Call Mom',
    description: 'her birthday is coming up',
    targetCompletionDate: '11/11/20',
    completionDate: '',
  },
  {
    id: '4',
    name: 'Call Mom',
    description: 'her birthday is coming up',
    targetCompletionDate: '11/11/20',
    completionDate: '',
  },
]

function TodoList({ navigation, ...props }) {
  const [isDialogVisible, setIsDialogVisible] = useState(false)

  const renderItem = ({ item }) => {
    return <Todo navigation={navigation} {...item} />
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
          onPress={() => console.log('Pressed')}
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
            data={fakeTodos}
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

export default connect(mapStateToProps)(TodoList)
