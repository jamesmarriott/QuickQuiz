import { extendType, objectType } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";

export const Link = objectType({
  name: "Question",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("category");
    t.nonNull.string("difficulty");
    t.nullable.string("hint");
    t.nonNull.string("hint");
    t.nullable.string("image_url");
    t.nonNull.string("question");
    t.nonNull.string("correct_answer");
    t.nonNull.string("wrong_answer");
  },
});

let links: NexusGenObjects["Link"][] = [
  // 1
  {
    id: 1,
  },
  {
    id: 2,
  },
];

export const LinkQuery = extendType({
  // 2
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("feed", {
      // 3
      type: "Link",
      resolve(parent, args, context, info) {
        // 4
        return links;
      },
    });
  },
});
