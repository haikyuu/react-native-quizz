type popularCategory = "games" | "animals" | "vehicles" | "music";
type extendedCategoryName = popularCategory | "random";
type StringBoolean = "True" | "False";
type QuestionType = "boolean" | "multiple";
type Difficulty = "easy" | "medium" | "hard";

interface Question {
  category: string;
  type: QuestionType;
  difficulty: Difficulty;
  question: string;
  correct_answer: string;
  incorrect_answers: Array<string>;
}

type BooleanQuestion = Question & {
  correct_answer: StringBoolean;
  incorrect_answers: [StringBoolean];
  type: "boolean";
};

type QuestionsState = {
  questions: Array<BooleanQuestion>;
  amount: number;
  type: "boolean" | "multiple" | "mixed";
  difficulty: Difficulty | "mixed";
  loading: boolean;
  error: string;
  answers: Record<number, StringBoolean>;
  currentQuestionIndex: number;
};
type SettingsState = {
  isMusicOn: boolean;
};
