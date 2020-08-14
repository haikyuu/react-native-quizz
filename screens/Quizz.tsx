import { StatusBar } from 'expo-status-bar'
import * as Animatable from 'react-native-animatable'
import React, { useCallback, useMemo } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
  Image,
  TouchableOpacity,
  StyleProp,
  ImageStyle
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '../store'
import { human } from 'react-native-typography'
import { QuizzProps } from '../types/navigation'
import { LinearGradient } from 'expo-linear-gradient'
import { categoryImages } from '../utils/categories'
import { SharedElement } from 'react-navigation-shared-element'
import { AllHtmlEntities as Entities } from 'html-entities'

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
  const currentQuestion = questions.questions[questions.currentQuestionIndex]
  const currentQuestionText = useMemo(() => {
    return entities.decode(currentQuestion.question)
  }, [currentQuestion])
  const imageLeft = useMemo(() => `${(0.4 + Math.random()) * 40}%`, [])
  if (questions.loading) {
    //TODO:
    return <ActivityIndicator />
  }
  if (questions.error) {
    //TODO:
    return <Text>{questions.error}</Text>
  }

  const allAnswers = [
    currentQuestion.correct_answer,
    ...currentQuestion.incorrect_answers
  ].sort((a, b) => b.localeCompare(a))
  const categoryImage = categoryImages[route.params.category]
  const imageStyle: StyleProp<ImageStyle> = {
    width: categoryImage.width * 1.2,
    height: categoryImage.height * 1.2,
    position: 'absolute',
    left: imageLeft,
    bottom: 0
  }
  return (
    <LinearGradient colors={['#4b6cb7', '#182848']} style={styles.container}>
      <Text style={[human.title1White]}>
        Quizz {questions.currentQuestionIndex + 1}/{questions.amount}
      </Text>

      <Animatable.Text
        key={questions.currentQuestionIndex}
        animation='zoomIn'
        style={[human.title2White, styles.question]}
      >
        {currentQuestionText}
      </Animatable.Text>
      {allAnswers.map(answer => (
        <TouchableOpacity
          key={`${answer}${questions.currentQuestionIndex}`}
          onPress={async () => {
            handleAnswer(answer)
            await dispatch.settings.playClickSound()
          }}
          style={styles.button}
        >
          <Text style={human.title2White}>{answer}</Text>
        </TouchableOpacity>
      ))}
      <StatusBar style='light' />
      <SharedElement id={route.params.category} style={imageStyle}>
        <Image
          // random in the render function will make the image move on every render :)
          style={[imageStyle]}
          source={categoryImage.source}
        />
      </SharedElement>
    </LinearGradient>
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
  question: { padding: 40, textAlign: 'center' },
  button: {
    borderRadius: 40,
    width: '100%',
    borderColor: 'cyan',
    borderWidth: 3,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
  }
})
