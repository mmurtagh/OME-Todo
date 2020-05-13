import React from 'react'
import { Button, Text, View } from 'react-native'

export default function TodoList({ navigation }) {
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
    </View>
  )
}
