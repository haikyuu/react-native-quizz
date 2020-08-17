import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { HomeProps } from "../types/navigation";
import Category from "../components/Category";
import { human } from "react-native-typography";
import { useDispatch } from "react-redux";
import { Dispatch } from "../store";
import { LinearGradient } from "expo-linear-gradient";

const Home: React.FunctionComponent<HomeProps> = ({
  navigation,
}: HomeProps) => {
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    dispatch.settings.playMusic();
  }, []);
  const onCategoryPress = useCallback(
    async (categoryId: string, category: extendedCategoryName) => {
      // load category questions (10)
      await dispatch.questions.loadQuestions({ categoryId });
      // navigate to the quizz screen
      navigation.navigate("Quizz", { category });
    },
    [dispatch]
  );

  return (
    <LinearGradient colors={["#4b6cb7", "#182848"]} style={s.container}>
      <ScrollView contentContainerStyle={s.scrollViewContainer}>
        <StatusBar style="light" />
        <Text style={[human.title1, s.subtitle]}>Select a Category</Text>
        <Category name="animals" onPress={onCategoryPress} />
        <View style={s.categoryRow}>
          <Category name="games" onPress={onCategoryPress} />
          <Category name="music" onPress={onCategoryPress} />
        </View>
        <View style={s.categoryRow}>
          <Category name="vehicles" onPress={onCategoryPress} />
          <Category name="random" onPress={onCategoryPress} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Home;

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 8,
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 18,
  },
  scrollViewContainer: {
    paddingHorizontal: 8,
    justifyContent: "space-around",
  },
  title: { color: "#fff", marginBottom: 8 },
  subtitle: { color: "#fff", marginBottom: 24 },
});
