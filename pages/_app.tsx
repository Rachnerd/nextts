import React from "react";
import App, { Container } from "next/app";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import fetch from "node-fetch";
import { ApolloClient } from "apollo-client";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
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

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default MyApp;
