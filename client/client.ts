import { createHttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import fetch from "node-fetch";
import gql from "graphql-tag";
import { cache } from "./cache";

const typeDefs = gql`
  type Example {
    example: String!
  }
`;

export const client = new ApolloClient({
  ssrMode: !(process as any).browser,
  link: createHttpLink({
    uri: "http://localhost:8080",
    fetch: fetch as any
  }),
  typeDefs,
  cache,
  resolvers: {}
});
