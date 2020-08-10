import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type QuizzProps = Record<string, unknown>

const Quizz: React.FunctionComponent<QuizzProps> = () => {
  return (
    <View style={styles.container}>
      <Text>Quizz</Text>
      <StatusBar style='auto' />
    </View>
  )
}

export default Quizz

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
