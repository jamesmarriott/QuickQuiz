import { extendType, objectType, enumType, nonNull, stringArg } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";

export const Link = objectType({
  name: "Question",
  definition(t) {
    t.nonNull.int("id");
    t.field("category", { type: CategoryEnum });
    t.nonNull.string("difficulty");
    t.nullable.string("hint");
    t.nonNull.string("question_content");
    t.nonNull.string("correct_answer");
    t.list.nonNull.field("wrong_answers", {
      type: "String",
    });
  },
});

const CategoryEnum = enumType({
  name: "CategoryEnum",
  members: {
    ART: "Art",
    BOOKS: "Books",
    COMICS: "Comics",
    COMPUTERS: "Computers",
    FILM: "Film",
    GAMES: "Games",
    GENERAL_KNOWLEDGE: "General Knowledge",
    GEOGRAPHY: "Geography",
    HISTORY: "History",
    MATHEMATICS: "Mathematics",
    MUSIC: "Music",
    MYTHOLOGY: "Mythology",
    NATURE: "Nature",
    POLITICS: "Politics",
    SPORTS: "Sports",
    TELEVISION: "Television",
  },
});

const questions: NexusGenObjects["Question"][] = [
  {
    id: 1,
    category: "General Knowledge",
    difficulty: "easy",
    hint: "This is a hint",
    question_content: "What is the capital of France?",
    correct_answer: "Paris",
    wrong_answers: ["London", "Berlin", "Rome"],
  },
];

export const QuestionQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("feed", {
      type: "Question",
      resolve(parent, args, context, info) {
        return questions;
      },
    });
  },
});

export const LinkMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("post", {
      type: "Question",
      args: {
        category: nonNull(stringArg()),
        difficulty: nonNull(stringArg()),
        hint: stringArg(),
        question_content: nonNull(stringArg()),
        correct_answer: nonNull(stringArg()),
        wrong_answers: nonNull(stringArg()),
      },

      resolve(_, args, __) {
        const {
          category: CategoryEnum,
          correct_answer,
          difficulty,
          hint,
          id,
          question_content,
          wrong_answers,
        } = args as unknown as NexusGenObjects["Question"];

        let idCount = questions.length + 1;
        const question = {
          category: CategoryEnum,
          correct_answer: correct_answer,
          difficulty: difficulty,
          hint: hint,
          id: idCount,
          question_content: question_content,
          wrong_answers: wrong_answers,
        };
        questions.push(question);
        return question;
      },
    });
  },
});
