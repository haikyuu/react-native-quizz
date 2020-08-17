import { Models } from "@rematch/core";
import { questions } from "./questions";
import { settings } from "./settings";

export interface RootModel extends Models {
  questions: typeof questions;
  settings: typeof settings;
}

export const models: RootModel = { questions, settings };
