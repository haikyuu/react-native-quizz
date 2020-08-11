import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type ResultsProps = Record<string, unknown>

const Results: React.FunctionComponent<ResultsProps> = () => {
  return (
    <View style={styles.container}>
      <Text>Results</Text>
      <StatusBar style='auto' />
    </View>
  )
}

export default Results

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
