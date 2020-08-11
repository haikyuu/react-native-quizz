import { StatusBar } from 'expo-status-bar'
import React, { useCallback } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '../store'
import { human } from 'react-native-typography'
import { useNavigation } from '@react-navigation/native'
import { ScreenProps } from '../types/navigation'

type QuizzProps = Record<string, unknown>

const Quizz: React.FunctionComponent<QuizzProps> = ({
  navigation
}: ScreenProps) => {
  // get the current question from the store

  const questions: QuestionsState = useSelector<RootState>(
    state => state.questions
  )
  const dispatch = useDispatch<Dispatch>()
  const handleAnswer = useCallback(
    answer => {
      // store answer in the store
      if (questions.currentQuestionIndex + 1 === questions.amount) {
        // ge to results screen
        navigation.navigate('Results')
      } else {
        dispatch.questions.storeAnswer(answer)
        // get the next answer
        dispatch.questions.incrementQuestion()
      }
    },
    [dispatch]
  )
  if (questions.loading) {
    //TODO:
    return <ActivityIndicator />
  }
  if (questions.error) {
    //TODO:
    return <Text>{questions.error}</Text>
  }
  const currentQuestion = questions.questions[questions.currentQuestionIndex]
  const allAnswers = [
    currentQuestion.correct_answer,
    ...currentQuestion.incorrect_answers
  ].sort((a, b) => a - b)
  return (
    <View style={styles.container}>
      <Text>
        Quizz {questions.currentQuestionIndex + 1}/{questions.amount}
      </Text>
      <Text style={human.title1}>{currentQuestion.question}</Text>
      {allAnswers.map(answer => (
        <Button
          title={answer}
          key={answer}
          onPress={() => handleAnswer(answer)}
        />
      ))}
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
