import css from "styled-jsx/css";
import { ApolloClient } from "apollo-client";
import { ApolloProvider, Query } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "node-fetch";
import { gql } from "graphql";

const client = new ApolloClient({
  link: createHttpLink({
    uri: "http://localhost:8080",
    fetch: fetch as any
  }),
  ssrMode: true,
  cache: new InMemoryCache()
});

export const button = css`
  button {
    color: red;
  }
`;

function Home() {
  return (
    <ApolloProvider client={client}>
      <Query
        query={gql`
          {
            items(ids: ["1"]) {
              __typename
            }
          }
        `}
      >
        (({}) =>
        {
          <div>
            <p>Welcome to Next.js!</p>
            <button>Test</button>
            <style jsx>{button}</style>
          </div>
        }
      </Query>
    </ApolloProvider>
  );
}

export default Home;
