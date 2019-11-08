import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

import Habits from "./habits";

export const habitsResolvers = {
  Query: {
    async habits() {
      try {
        const habits = await Habits.find();
        return habits;
      } catch (e) {
        console.error(e);
      }
    }
  },

  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date Custom Scalar",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }
      return null;
    }
  })
};
