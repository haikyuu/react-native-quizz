import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState, Dispatch } from "../store";
import { LinearGradient } from "expo-linear-gradient";
import { ResultsProps } from "../types/navigation";
import { human } from "react-native-typography";
import * as Animatable from "react-native-animatable";
import { AllHtmlEntities as Entities } from "html-entities";
import { TouchableOpacity } from "react-native-gesture-handler";

const Results: React.FunctionComponent<ResultsProps> = ({
  navigation,
}: ResultsProps) => {
  const { score, amount, questionsWithAnswers } = useSelector<
    RootState,
    {
      score: number;
      amount: number;
      questionsWithAnswers: Array<
        BooleanQuestion & { isCorrect: boolean; answer: StringBoolean }
      >;
    }
  >((state) => {
    const { amount, answers, questions } = state.questions;
    const questionsWithAnswers = questions.map((q, index) => ({
      ...q,
      answer: answers[index],
      isCorrect: answers[index] === q.correct_answer,
    }));
    const score = questionsWithAnswers.reduce(
      (acc, { isCorrect }) => acc + (isCorrect ? 1 : 0),
      0
    );
    return { score, amount, questionsWithAnswers };
  });
  const dispatch = useDispatch<Dispatch>();
  const playAgain = useCallback(() => {
    dispatch.settings.playClickSound();
    dispatch.questions.reset();
    navigation.navigate("Home");
  }, [navigation, dispatch]);
  const resultText = score < 6 ? "No luck!" : "Lucky!!";
  return (
    <LinearGradient colors={["#4b6cb7", "#182848"]} style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.resultsContainer}>
          <Animatable.Text
            animation="zoomIn"
            style={[human.title1, styles.score]}
          >
            {score}
          </Animatable.Text>
          <View>
            <Text style={[human.title1, styles.resultText]}>{resultText}</Text>
            <View style={styles.detailsRow}>
              <View style={[styles.dot, { backgroundColor: "#3dd598" }]}></View>
              <Text
                style={[human.body, styles.detailsText]}
              >{`${score} correct answers`}</Text>
            </View>
            <View style={styles.detailsRow}>
              <View style={[styles.dot, { backgroundColor: "#ff575f" }]}></View>
              <Text style={[human.body, styles.detailsText]}>{`${
                amount - score
              } incorrect answers`}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={playAgain} style={styles.playAgainContainer}>
          <Text style={[human.title3]}>Play Again</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.questionsContainer}>
        {questionsWithAnswers.map(({ isCorrect, question, answer }) => (
          <View
            key={question}
            style={[
              styles.questionContainer,
              isCorrect ? styles.greenContainer : styles.redContainer,
            ]}
          >
            <View
              style={[
                styles.questionBox,
                isCorrect ? styles.greenBox : styles.redBox,
              ]}
            >
              <Text
                style={[
                  human.bodyWhite,
                  styles.answer,
                  isCorrect ? styles.correctAnswer : styles.incorrectAnswer,
                ]}
              >
                {answer}
              </Text>
            </View>
            <Text
              style={[human.body, styles.questionText]}
              ellipsizeMode="tail"
              numberOfLines={4}
            >
              {Entities.decode(question)}
            </Text>
          </View>
        ))}
      </ScrollView>
      <StatusBar style="dark" />
    </LinearGradient>
  );
};

export default Results;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  topContainer: {
    width: 375,
    height: 235,
    backgroundColor: "#ffc542",
  },
  resultsContainer: {
    height: 156,
    borderRadius: 25,
    backgroundColor: "#ffffff",
    marginHorizontal: 28,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
    padding: 24,
    marginBottom: 5,
  },
  score: {
    fontSize: 100,
    lineHeight: 100,
    color: "#182848",
    marginTop: 16,
  },
  detailsRow: { flexDirection: "row", alignItems: "center" },
  dot: {
    width: 15,
    height: 10,
    borderRadius: 6,
    marginRight: 8,
  },
  resultText: {
    marginBottom: 12,
    color: "#182848",
  },
  detailsText: { color: "#899a96" },
  questionContainer: {
    height: 105,
    borderRadius: 25,
    marginHorizontal: 25,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  questionBox: {
    width: 59,
    height: 57,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  greenBox: { backgroundColor: "#3dd598" },
  redBox: { backgroundColor: "#ff565e" },
  greenContainer: { backgroundColor: "rgba(61, 213, 152, .6)" },
  redContainer: { backgroundColor: "rgba(255, 87, 95, .6)" },
  questionsContainer: { marginTop: 24 },
  questionText: { color: "white", flexShrink: 1, marginLeft: 16, flex: 1 },
  answer: {},
  correctAnswer: {},
  incorrectAnswer: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    textDecorationColor: "blue",
  },
  playAgainContainer: {
    alignSelf: "center",
    paddingVertical: 16,
  },
});
