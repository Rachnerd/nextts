import css from "styled-jsx/css";
import gql from "graphql-tag";
import * as React from "react";
import { client } from "./_app";

export const button = css`
  button {
    color: red;
  }
`;

export const tst = css.global`
  body {
    background-color: red;
  }
`;

const { className: buttonLarge, styles } = css.resolve`width: 20em`;

class Home extends React.Component {
  static async getInitialProps({ req }) {
    return await client.query({
      query: gql`
        {
          items(ids: ["1", "11", "666"]) {
            __typename
          }
        }
      `
    });
  }

  data;

  constructor(props) {
    super(props);
    this.data = props.data;
  }

  render() {
    const s = s => console.log(s);

    s`asd`;

    return (
      <>
        <div>
          <p>
            Welcome to Next.js!{" "}
            {this.data && this.data.items && this.data.items[0].__typename}
          </p>

          <button>Test</button>
          <button className={buttonLarge}>Test</button>

          <style jsx>{button}</style>
          <style jsx global>
            {tst}
          </style>
          {styles}
        </div>
        <p>Foo</p>
      </>
    );
  }
}

export default Home;
