import { Action, AnyAction } from 'redux'

type QuestionsState = {
    questions: Array<BooleanQuestion>,
    amount: number,
    type: "boolean" | "multiple" | "mixed"
}

declare module 'redux' {
    export interface Dispatch<A extends Action = AnyAction> {
        // list all your models names here
        questions: QuestionsState // we have one model - count, so we added it
    }
}