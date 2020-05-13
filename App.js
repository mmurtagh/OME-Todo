import React from 'react'
import { Button, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import TodoList from './app/screens/TodoList/TodoList'
import TodoDetail from './app/screens/TodoDetail/TodoDetail'
import Filter from './app/screens/Filter/Filter'

const Stack = createStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen name="TodoList" component={TodoList} />
        <Stack.Screen name="TodoDetail" component={TodoDetail} />
        <Stack.Screen name="Filter" component={Filter} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
