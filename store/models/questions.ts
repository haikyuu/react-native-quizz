import { createModel } from '@rematch/core'
import { Dispatch, RootState } from '..'
import api from '../../utils/api'
import config from '../../utils/config'


export const questions = createModel<QuestionsState>()({
    state: {
        questions: [],
        // we put it here to allow the user to configure it in the future from the settings
        amount: config.amount,
        type: config.type,
        difficulty: config.difficulty,
        currentQuestionIndex: 0,
        answers: {},
        loading: false,
        error: ""
    }, // initial state
    reducers: {
        // handle state changes with pure functions
        setQuestions(state, payload: Array<BooleanQuestion>) {
            console.log("p", payload);

            return { ...state, questions: payload }
        },
        setLoading(state, loading) {
            return { ...state, loading }
        },
        setError(state, error) {
            return { ...state, error }
        },
        storeAnswer(state, answer) {
            return {
                ...state, answers: {
                    ...state.answers,
                    [state.currentQuestionIndex]: answer,
                }
            }
        },
        incrementQuestion(state) {
            return {
                ...state, currentQuestionIndex: state.currentQuestionIndex < config.amount ? state.currentQuestionIndex + 1 : state.currentQuestionIndex
            }
        }
    },
    effects: (dispatch) => ({
        // handle state changes with impure functions.
        // use async/await for async actions
        async loadQuestions({ categoryId }: { categoryId: string }, rootState) {
            const { questions: { setLoading, setError, setQuestions } } = dispatch as Dispatch
            const { questions: { amount, type, difficulty } } = rootState as RootState

            const typeParam = type === "mixed" ? "" : `&type=${type}`;
            const difficultyParam = difficulty === "mixed" ? "" : `&difficulty=${difficulty}`;
            const categoryParam = categoryId === "mixed" ? "" : `&category=${categoryId}`
            setLoading(true)
            try {
                const result = await api.get(`?amount=${amount}${difficultyParam}${typeParam}${categoryParam}`)
                setLoading(false)
                const questions = result.data.results;
                setQuestions(questions)
            } catch (error) {
                setLoading(false)
                setError(error.message)
            }


            // typedDispatch.questions.setQuestions(result)
        },
    }),
});