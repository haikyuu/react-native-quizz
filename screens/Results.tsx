import { StatusBar } from 'expo-status-bar'
import React, { useCallback } from 'react'
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native'
import { ScreenProps } from '../types/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '../store'
import { AntDesign } from '@expo/vector-icons'
type ResultsProps = Record<string, unknown>

const Results: React.FunctionComponent<ScreenProps> = ({
  navigation
}: ScreenProps) => {
  const { score, amount, questionsWithAnswers } = useSelector<
    RootState,
    {
      score: number
      amount: number
      questionsWithAnswers: Array<
        BooleanQuestion & { isCorrect: boolean; answer: StringBoolean }
      >
    }
  >(state => {
    const { amount, answers, questions } = state.questions
    const questionsWithAnswers = questions.map((q, index) => ({
      ...q,
      answer: answers[index],
      isCorrect: answers[index] === q.correct_answer
    }))
    const score = questionsWithAnswers.reduce(
      (acc, { isCorrect }) => acc + (isCorrect ? 1 : 0),
      0
    )
    return { score, amount, questionsWithAnswers }
  })
  const dispatch = useDispatch<Dispatch>()
  const playAgain = useCallback(() => {
    dispatch.questions.reset()
    navigation.navigate('Home')
  }, [navigation, dispatch])
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>You Scored {`${score}/${amount}`}</Text>
        {questionsWithAnswers.map(
          ({ isCorrect, question, correct_answer, answer }) => (
            <View key={question}>
              {isCorrect ? (
                <AntDesign name='checkcircle' size={24} color='green' />
              ) : (
                <AntDesign name='closecircle' size={24} color='red' />
              )}
              <Text>{question}</Text>
              {!isCorrect ? <Text>{answer}</Text> : null}
              <Text>{correct_answer}</Text>
            </View>
          )
        )}
        <Button title='Play Again' onPress={playAgain} />
        <StatusBar style='auto' />
      </ScrollView>
    </View>
  )
}

export default Results

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
    // alignItems: 'center',
    // justifyContent: 'center'
  }
})
