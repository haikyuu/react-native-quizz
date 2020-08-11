import { createModel } from '@rematch/core'
import { Dispatch, RootState } from '..'
import api from '../../utils/api'
import config from '../../utils/config'
import { QuestionsState } from '../../types/state';


export const questions = createModel<QuestionsState>()({
    state: {
        questions: [],
        // we put it here to allow the user to configure it in the future from the settings
        amount: config.amount,
        type: config.type,
        difficulty: config.difficulty
    }, // initial state
    reducers: {
        // handle state changes with pure functions
        setQuestions(state, payload: Array<BooleanQuestion>) {
            return { ...state, questions: payload }
        },
    },
    effects: (dispatch) => ({
        // handle state changes with impure functions.
        // use async/await for async actions
        async loadQuestions({ categoryId }: { categoryId: string }, rootState) {
            const typedDispatch = dispatch as Dispatch
            const { questions: { amount, type, difficulty } } = rootState as RootState

            const typeParam = type === "mixed" ? "" : `&type=${type}`;
            const difficultyParam = difficulty === "mixed" ? "" : `&difficulty=${difficulty}`;
            const categoryParam = categoryId === "mixed" ? "" : `&category=${categoryId}`

            const result = await api.get(`?amount=${amount}${difficultyParam}${typeParam}${categoryParam}`)
            const questions = result.data.results;
            typedDispatch.questions.setQuestions(questions)
            console.log("result", result)
            // typedDispatch.questions.setQuestions(result)
        },
    }),
});