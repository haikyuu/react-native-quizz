import { StatusBar } from "expo-status-bar";
import * as Animatable from "react-native-animatable";
import React, { useCallback, useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  StyleProp,
  ImageStyle,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState, Dispatch } from "../store";
import { human } from "react-native-typography";
import { QuizzProps } from "../types/navigation";
import { LinearGradient } from "expo-linear-gradient";
import { categoryImages } from "../utils/categories";
import { SharedElement } from "react-navigation-shared-element";
import { AllHtmlEntities as Entities } from "html-entities";
const entities = new Entities();
const Quizz: React.FunctionComponent<QuizzProps> = ({
  navigation,
  route,
}: QuizzProps) => {
  const [isAboutToLeave, setAboutToLeave] = useState(false);
  // get the current question from the store

  const questions: QuestionsState = useSelector<RootState, QuestionsState>(
    (state) => state.questions
  );
  const dispatch = useDispatch<Dispatch>();
  const handleAnswer = useCallback(
    (answer) => {
      // store answer in the store
      dispatch.questions.storeAnswer(answer);
      if (questions.currentQuestionIndex + 1 === questions.amount) {
        // ge to results screen
        // fix
        setAboutToLeave(true);
        navigation.navigate("Results");
      } else {
        // get the next answer
        dispatch.questions.incrementQuestion();
      }
    },
    [dispatch, questions]
  );
  const currentQuestion = questions.questions[questions.currentQuestionIndex];
  const currentQuestionText = useMemo(() => {
    return entities.decode(currentQuestion?.question);
  }, [currentQuestion]);
  const imageLeft = useMemo(() => `${(0.2 + Math.random()) * 30}%`, []);
  const categoryImage = categoryImages[route.params.category];
  const imageStyle: StyleProp<ImageStyle> = {
    width: categoryImage.width,
    height: categoryImage.height,
    position: "absolute",
    left: imageLeft,
    bottom: 0,
  };
  // navigation is done after loading the questions
  if (questions.error) {
    //TODO:
    return (
      <LinearGradient colors={["#4b6cb7", "#182848"]} style={styles.container}>
        <Text style={[human.title1White]}>Oops, There was an error!</Text>
        <Text style={human.title2White}>{questions.error}</Text>
        <SharedElement id={route.params.category} style={[imageStyle]}>
          <Image
            // random in the render function will make the image move on every render :)
            style={[imageStyle, isAboutToLeave ? { opacity: 0 } : {}]}
            source={categoryImage.source}
          />
        </SharedElement>
      </LinearGradient>
    );
  }

  const allAnswers = [
    currentQuestion.correct_answer,
    ...currentQuestion.incorrect_answers,
  ].sort((a, b) => b.localeCompare(a));

  return (
    <LinearGradient colors={["#4b6cb7", "#182848"]} style={styles.container}>
      <Text style={[human.title1White]}>
        Quizz {questions.currentQuestionIndex + 1}/{questions.amount}
      </Text>

      <Animatable.Text
        key={questions.currentQuestionIndex}
        animation="zoomIn"
        style={[human.title2White, styles.question]}
      >
        {currentQuestionText}
      </Animatable.Text>
      {allAnswers.map((answer) => (
        <TouchableOpacity
          key={`${answer}${questions.currentQuestionIndex}`}
          onPress={async () => {
            handleAnswer(answer);
            await dispatch.settings.playClickSound();
          }}
          style={styles.button}
        >
          <Text style={human.title2White}>{answer}</Text>
        </TouchableOpacity>
      ))}
      <StatusBar style="light" />
      <SharedElement id={route.params.category} style={[imageStyle]}>
        <Image
          // random in the render function will make the image move on every render :)
          style={[imageStyle, isAboutToLeave ? { opacity: 0 } : {}]}
          source={categoryImage.source}
        />
      </SharedElement>
    </LinearGradient>
  );
};

export default Quizz;

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    width: "100%",
    paddingBottom: 50,
  },
  question: { padding: 20, textAlign: "center" },
  button: {
    borderRadius: 40,
    width: "100%",
    borderColor: "cyan",
    borderWidth: 3,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
});
