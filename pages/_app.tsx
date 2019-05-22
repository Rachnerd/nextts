import React from "react";
import App, { Container, NextAppContext } from "next/app";
import { ApolloProvider } from "react-apollo";
import { client } from "../client/client";

/**
 * AppComponent
 */
class MyApp extends App {
  /**
   * Nextjs calls this fn server-side and sends it to the client as soon as this Promise is resolved.
   * App calls `getInitialProps` of the first component of the page.
   */
  static async getInitialProps({ Component, ctx }: NextAppContext) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    /**
     * Restore Apollo client-side cache with server-side state.
     */
    if ((process as any).browser) {
      client.restore((window as any).__APOLLO_SSR_STATE__);
    }

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
