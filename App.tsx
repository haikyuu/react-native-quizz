import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './screens/Home'
import Quizz from './screens/Quizz'
import { RootStackParamList } from './types/navigation'

type AppProps = Record<string, unknown>

const Stack = createStackNavigator<RootStackParamList>()

const App: React.FunctionComponent<AppProps> = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Quizz' component={Quizz} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
