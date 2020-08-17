import { init } from "@rematch/core";
import { questions } from "../models/questions";
import api from "../../utils/api";

const mockedApi = api as jest.Mocked<typeof api>;

jest.mock("../../utils/api.ts", () => {
  return {
    baseURL: "https://opentdb.com/api.php",
    get: jest.fn().mockResolvedValue({
      data: require("./test_boolean_data.json"),
    }),
  };
});

describe("Questions Model", () => {
  it("Questions should be loaded from the api and stored in the state correctly", async () => {
    const store = init({
      models: { questions },
    });
    await store.dispatch.questions.loadQuestions({ categoryId: "mixed" });
    const questionsState = store.getState().questions;
    expect(questionsState.questions.length).toBe(questionsState.amount);
  });
  it("Errors should be gracefully handled when loading questions", async () => {
    const errorMessage = "Network Error";
    const store = init({
      models: { questions },
    });

    mockedApi.get.mockImplementation(async () => {
      throw new Error("Network Error");
    });
    await store.dispatch.questions.loadQuestions({ categoryId: "mixed" });
    const questionsState = store.getState().questions;
    expect(questionsState.questions.length).toBe(0);
    expect(questionsState.error).toBe(errorMessage);
  });
});

describe("Incrementing questions when passing the quizz", () => {
  it("Increments the question when below 10", async () => {
    const store = init({
      models: { questions },
    });
    await store.dispatch.questions.loadQuestions({ categoryId: "mixed" });
    store.dispatch.questions.incrementQuestion();
    const questionsState = store.getState().questions;
    expect(questionsState.currentQuestionIndex).toBe(1);
  });
  it("Increments the question is a noop when index = 10", async () => {
    const store = init({
      models: { questions },
    });
    await store.dispatch.questions.loadQuestions({ categoryId: "mixed" });
    for (let i = 0; i < 11; i++) {
      store.dispatch.questions.incrementQuestion();
    }
    const questionsState = store.getState().questions;
    expect(questionsState.currentQuestionIndex).toBe(10);
  });
});
