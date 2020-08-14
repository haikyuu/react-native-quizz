import { StackScreenProps } from "@react-navigation/stack";

type RootStackParamList = {
  Home: undedfined;
  Quizz: { category: extendedCategoryName };
  Results: undefined;
};

type ResultsProps = StackScreenProps<RootStackParamList, "Results">;
type QuizzProps = StackScreenProps<RootStackParamList, "Quizz">;
type HomeProps = StackScreenProps<RootStackParamList, "Home">;
