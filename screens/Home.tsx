import { StatusBar } from 'expo-status-bar'
import React, { useCallback } from 'react'
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import { ScreenProps } from '../types/navigation'
import Category from '../components/Category'
import { human } from 'react-native-typography'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, Dispatch } from '../store'
import { LinearGradient } from 'expo-linear-gradient'

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
      navigation.navigate('Quizz')
    },
    [dispatch]
  )

  return (
    <LinearGradient colors={["#4b6cb7", "#182848"]} style={s.container}>
      <ScrollView contentContainerStyle={s.scrollViewContainer}>
        <StatusBar style='auto' />
        <Text style={[human.largeTitle, s.title]}>Trivia Challenge</Text>
        <Text style={[human.title1, s.subtitle]}>Select a Category</Text>

        <Category name='animals' onPress={onCategoryPress} />
        <View style={s.categoryRow}>
          <Category name='games' onPress={onCategoryPress} />
          <Category name='music' onPress={onCategoryPress} />
        </View>
        <View style={s.categoryRow}>
          <Category name='vehicles' onPress={onCategoryPress} />
          <Category name='random' onPress={onCategoryPress} />
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

export default Home

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18
  },
  scrollViewContainer: {
    paddingHorizontal: 28
  },
  title: { color: '#fff', marginBottom: 8 },
  subtitle: { color: '#fff', marginBottom: 24 }
})
