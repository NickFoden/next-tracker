import { gql, ApolloServer } from "apollo-server-micro";
import { mergeResolvers, mergeTypeDefs } from "graphql-toolkit";
import connectDb from "../../lib/mongoose";
import { habitsResolvers } from "../../api/habits/resolvers";
import { habitsMutations } from "../../api/habits/mutations";
import Habits from "../../api/habits/Habits.graphql";

const fakeTypeDefs = gql`
  type Query {
    sayHello: String
  }
`;

const fakeResolvers = {
  Query: {
    sayHello: () => {
      return "Hello Apollo Fans";
    }
  }
};

const resolvers = mergeResolvers([
  fakeResolvers,
  habitsResolvers,
  habitsMutations
]);

const typeDefs = mergeTypeDefs([fakeTypeDefs, Habits]);

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false
  }
};

const server = apolloServer.createHandler({ path: "/api/graphql" });
export default connectDb(server);
