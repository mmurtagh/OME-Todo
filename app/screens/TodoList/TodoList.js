import React from 'react'
import { connect } from 'react-redux'
import { Button, Text, View } from 'react-native'

function TodoList({ navigation, ...props }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>TodoList</Text>
      <Button
        title="Detail"
        onPress={() =>
          navigation.navigate('TodoDetail', { data: Math.random() })
        }
      />
      <Button
        title="Change Filters"
        onPress={() => navigation.navigate('Filter')}
      />
      <Text>{props.foo}</Text>
    </View>
  )
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(TodoList)
