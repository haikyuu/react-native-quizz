type popularCategory = games | animals | vehicles | music;

type QuestionType = "boolean" | "multiple"

interface Question {
    category: string,
    type: QuestionType,
    difficulty: "easy" | "medium" | "hard",
    question: string,
    correct_answer: string,
    incorrect_answers: Array<string>
}

type BooleanQuestion = Question & {
    question: "True" | "False",
    incorrect_answers: ["True" | "False"],
    type: "boolean"
}