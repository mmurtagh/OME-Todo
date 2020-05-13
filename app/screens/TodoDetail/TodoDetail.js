import React from 'react'
import { Text, View } from 'react-native'

export default function TodoDetail({ route }) {
  const { data } = route.params

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>TodoDetail</Text>
      <Text>{`Data: ${data}`}</Text>
    </View>
  )
}
