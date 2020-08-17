interface Config {
  amount: number;
  type: QuestionType | "mixed";
  difficulty: Difficulty | "mixed";
}

const config: Config = {
  amount: 10,
  type: "boolean",
  difficulty: "mixed",
};

export default config;
