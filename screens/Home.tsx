import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { ScreenProps } from '../types/navigation'

const Home: React.FunctionComponent<ScreenProps> = ({
  navigation
}: ScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Trivia Challenge</Text>
      <StatusBar style='auto' />
      <Button
        title='Begin'
        onPress={() => navigation.navigate('Quizz')}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
