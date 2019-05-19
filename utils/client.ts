///<reference path="client.d.ts"/>
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import fetch from "node-fetch";
import introspectionQueryResultData from "../fragmentTypes.json";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

export const client = new ApolloClient({
  ssrMode: !(process as any).browser,
  link: createHttpLink({
    uri: "http://localhost:8080",
    fetch: fetch as any
  }),
  cache: new InMemoryCache({
    fragmentMatcher
  })
});
