import { extendType, objectType } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";

export const Link = objectType({
  name: "Question",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("category");
    t.nonNull.string("difficulty");
    t.nullable.string("hint");
    t.nonNull.string("question");
    t.nonNull.string("correct_answer");
    t.nonNull.string("wrong_answer");
  },
});

let questions: NexusGenObjects["Question"][] = [
  // 1
  {
    id: 1,
    category: "General Knowledge",
    difficulty: "easy",
    hint: "This is a hint",
    question: "What is the capital of France?",
    correct_answer: "Paris",
    wrong_answer: "London",
  },
];

export const QuestionQuery = extendType({
  // 2
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("feed", {
      // 3
      type: "Question",
      resolve(parent, args, context, info) {
        // 4
        return questions;
      },
    });
  },
});
