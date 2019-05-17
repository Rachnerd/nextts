import React from "react";
import App, { Container } from "next/app";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import fetch from "node-fetch";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";

export const client = new ApolloClient({
  ssrMode: !(process as any).browser,
  link: createHttpLink({
    uri: "http://localhost:8080",
    fetch: fetch as any
  }),
  ssrForceFetchDelay: 100,
  cache: new InMemoryCache()
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
