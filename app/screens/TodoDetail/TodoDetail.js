import React from 'react'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'

function TodoDetail({ route }) {
  const { data } = route.params

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>TodoDetail</Text>
      <Text>{`Data: ${data}`}</Text>
    </View>
  )
}

export default connect()(TodoDetail)
