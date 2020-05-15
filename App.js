import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from './app/redux/store'
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

// @name App
// @description
// Main application component defining the navigation structure. Wraps the app in the following
// Provider: hooks the application into the redux store
// PersistGate: allows the redux store to be loaded from AsyncStorage before the initialization
// of the app
// NavigationContainer: allows the app to implement navigation as defined by react-navigation
// PaperProvider: provides app-wide theming to all react-native-paper components
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <PaperProvider theme={theme}>
            <Stack.Navigator initialRouteName="MainScreen">
              <Stack.Screen
                name="TodoList"
                options={TodoList.navigationOptions}
                component={TodoList}
              />
              <Stack.Screen
                name="TodoDetail"
                options={TodoDetail.navigationOptions}
                component={TodoDetail}
              />
            </Stack.Navigator>
          </PaperProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App
