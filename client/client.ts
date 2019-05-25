///<reference path="client.d.ts"/>
import { createHttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import fetch from "node-fetch";
import gql from "graphql-tag";
import { cache } from "./cache";
import { createLoona } from "@loona/react";

const typeDefs = gql`
  type SearchResults {
    viewMode: String!
  }
  extend type Query {
    searchResults: SearchResults
  }

  type Mutation {
    selectSearchResultsViewMode(viewMode: String!): Boolean
  }
`;

// Create Loona Link
export const loona = createLoona(cache);

export const client = new ApolloClient({
  ssrMode: !(process as any).browser,
  link: loona.concat(
    createHttpLink({
      uri: "http://localhost:8080",
      fetch: fetch as any
    })
  ),
  typeDefs,
  cache
});
