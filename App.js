import React from 'react'
import { Button, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

import { store } from './app/redux/store'
import TodoList from './app/screens/TodoList/TodoList'
import TodoDetail from './app/screens/TodoDetail/TodoDetail'
import { getColor } from './app/resources/style'

const Stack = createStackNavigator()

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: getColor('primary'),
  },
}

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PaperProvider theme={theme}>
          <Stack.Navigator initialRouteName="MainScreen">
            <Stack.Screen name="TodoList" component={TodoList} />
            <Stack.Screen name="TodoDetail" component={TodoDetail} />
          </Stack.Navigator>
        </PaperProvider>
      </NavigationContainer>
    </Provider>
  )
}

export default App
