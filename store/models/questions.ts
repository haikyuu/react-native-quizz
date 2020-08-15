/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createModel } from "@rematch/core";
import { Dispatch, RootState } from "..";
import api from "../../utils/api";
import config from "../../utils/config";

const initialState: QuestionsState = {
  questions: [],
  // we put it here to allow the user to configure it in the future from the settings
  amount: config.amount,
  type: config.type,
  difficulty: config.difficulty,
  currentQuestionIndex: 0,
  answers: {},
  loading: false,
  error: "",
};
export const questions = createModel<QuestionsState>()({
  state: initialState, // initial state
  reducers: {
    reset() {
      return initialState;
    },
    setQuestions(state, payload: Array<BooleanQuestion>) {
      return { ...state, questions: payload };
    },
    setLoading(state, loading: boolean) {
      return { ...state, loading };
    },
    setError(state, error: string) {
      return { ...state, error };
    },
    storeAnswer(state, answer: StringBoolean) {
      return {
        ...state,
        answers: {
          ...state.answers,
          [state.currentQuestionIndex]: answer,
        },
      };
    },
    incrementQuestion(state) {
      return {
        ...state,
        currentQuestionIndex:
          state.currentQuestionIndex < config.amount
            ? state.currentQuestionIndex + 1
            : state.currentQuestionIndex,
      };
    },
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async loadQuestions({ categoryId }: { categoryId: string }, rootState) {
      const {
        questions: { reset, setLoading, setError, setQuestions },
      } = dispatch as Dispatch;
      const {
        questions: { amount, type, difficulty },
      } = rootState as RootState;

      // useful when using the back button to go to the
      // home screen when the quizz is in progress
      reset();
      const typeParam = type === "mixed" ? "" : `&type=${type}`;
      const difficultyParam =
        difficulty === "mixed" ? "" : `&difficulty=${difficulty}`;
      const categoryParam =
        categoryId === "mixed" ? "" : `&category=${categoryId}`;
      setLoading(true);
      try {
        const result = await api.get(
          `?amount=${amount}${difficultyParam}${typeParam}${categoryParam}`
        );
        setLoading(false);
        const questions = result.data.results;

        setQuestions(questions);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }

      // typedDispatch.questions.setQuestions(result)
    },
  }),
});
