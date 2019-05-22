// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, {
  Head,
  Html,
  Main,
  NextDocumentContext,
  NextScript
} from "next/document";
import { client } from "../client/client";
import { reset } from "../styles/reset";

/**
 * index.html
 */
class MyDocument extends Document {
  static async getInitialProps(ctx: NextDocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/*Store the server-side apollo state on the window so that the client-side apollo can restore its cache  */}
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__APOLLO_SSR_STATE__ = ${JSON.stringify(
                client.extract()
              )}`
            }}
          />
        </Head>
        <body>
          {/*Global styles*/}
          <style jsx global>
            {reset}
          </style>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
