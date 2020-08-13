import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useMemo } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
  Image,
  TouchableOpacity
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '../store'
import { human } from 'react-native-typography'
import { ScreenProps, QuizzProps } from '../types/navigation'
import Category from '../components/Category'
import { LinearGradient } from 'expo-linear-gradient'
import { categoryImages } from '../utils/categories'
import { SharedElement } from 'react-navigation-shared-element'
import TouchableScale from 'react-native-touchable-scale'
const Entities = require('html-entities').AllHtmlEntities

const entities = new Entities()
const Quizz: React.FunctionComponent<QuizzProps> = ({
  navigation,
  route
}: QuizzProps) => {
  // get the current question from the store

  const questions: QuestionsState = useSelector<RootState, QuestionsState>(
    state => state.questions
  )
  const dispatch = useDispatch<Dispatch>()
  const handleAnswer = useCallback(
    answer => {
      // store answer in the store
      dispatch.questions.storeAnswer(answer)
      if (questions.currentQuestionIndex + 1 === questions.amount) {
        // ge to results screen
        navigation.navigate('Results')
      } else {
        // get the next answer
        dispatch.questions.incrementQuestion()
      }
    },
    [dispatch, questions]
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
  console.log('crr', questions.currentQuestionIndex)
  const currentQuestionText = useMemo(() => {
    return entities.decode(currentQuestion.question)
  }, [currentQuestion])
  const allAnswers = [
    currentQuestion.correct_answer,
    ...currentQuestion.incorrect_answers
  ].sort((a, b) => b - a)
  const categoryImage = categoryImages[route.params.category]
  const imageStyle = {
    width: categoryImage.width * 1.2,
    height: categoryImage.height * 1.2,
    position: 'absolute',
    left: `${(0.4 + Math.random()) * 40}%`,
    bottom: 0
  }
  return (
    <LinearGradient colors={['#4b6cb7', '#182848']} style={styles.container}>
      <Text style={[human.title1White]}>
        Quizz {questions.currentQuestionIndex + 1}/{questions.amount}
      </Text>

      <Text style={[human.title2White, styles.question]}>
        {currentQuestionText}
      </Text>
      {allAnswers.map(answer => (
        <TouchableOpacity
          key={`${answer}${questions.currentQuestionIndex}`}
          onPress={() => handleAnswer(answer)}
          style={{
            borderRadius: 40,
            width: '100%',
            borderColor: 'cyan',
            borderWidth: 3,
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16
          }}
        >
          <Text style={human.title2White}>{answer}</Text>
        </TouchableOpacity>
      ))}
      <StatusBar style='auto' />
      <SharedElement id={route.params.category} style={imageStyle}>
        <Image
          // random in the render function will make the image move on every render :)
          style={[imageStyle]}
          source={categoryImage.source}
        />
      </SharedElement>
    </LinearGradient>
  )
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
    paddingTop: 40,
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  question: { padding: 40, textAlign: 'center' }
})
