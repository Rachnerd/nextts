///<reference path="client.d.ts"/>
import { createHttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import fetch from "node-fetch";
import gql from "graphql-tag";
import { cache } from "./cache";
import { InMemoryCache } from "apollo-cache-inmemory";

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

export const client = new ApolloClient({
  ssrMode: !(process as any).browser,
  link: createHttpLink({
    uri: "http://localhost:8080",
    fetch: fetch as any
  }),
  typeDefs,
  cache,
  resolvers: {
    Mutation: {
      selectSearchResultsViewMode: (
        _root,
        { viewMode }: { viewMode: "List" | "Grid" | "GridList" },
        { cache }: { cache: InMemoryCache }
      ) => {
        cache.writeQuery({
          query: gql`
            {
              searchResults @client {
                viewMode
              }
            }
          `,
          data: {
            searchResults: {
              __typename: "SearchResults",
              viewMode
            }
          }
        });
        return true;
      }
    }
  }
});
