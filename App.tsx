import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './screens/Home'
import Quizz from './screens/Quizz'
import Results from './screens/Results'
import { RootStackParamList } from './types/navigation'
import { Provider } from 'react-redux'

import store from './store'
type AppProps = Record<string, unknown>

const Stack = createStackNavigator<RootStackParamList>()

const App: React.FunctionComponent<AppProps> = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Quizz' component={Quizz} />
          <Stack.Screen name='Results' component={Results} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App
