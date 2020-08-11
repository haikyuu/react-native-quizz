import { StatusBar } from 'expo-status-bar'
import React, { useCallback } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { ScreenProps } from '../types/navigation'
import Category from '../components/Category'
import { human } from 'react-native-typography'
import { useDispatch } from 'react-redux'
import { RootState, Dispatch } from '../store'

const categories: Array<popularCategory> = [
  'animals',
  'games',
  'music',
  'vehicles'
]

const Home: React.FunctionComponent<ScreenProps> = ({
  navigation
}: ScreenProps) => {
  const dispatch = useDispatch<Dispatch>()
  const onCategoryPress = useCallback(
    async (categoryId: string) => {
      // load category questions (10)
      await dispatch.questions.loadQuestions({ categoryId })
      // navigate to the quizz screen
      if (categoryId === '?') {
        console.log('random')
      } else {
        console.log('id', categoryId)
      }
    },
    [dispatch]
  )

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Text style={human.largeTitle}>Trivia Challenge</Text>
      <Text style={human.title1}>Select a Category</Text>

      <Category name='random' onPress={onCategoryPress} />
      {categories.map(category => (
        <Category key={category} name={category} onPress={onCategoryPress} />
      ))}
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
