import * as React from "react";
import gql from "graphql-tag";
import { GQLQuery } from "../gql.model";
import { Title } from "../ui-components/Title";
import css from "styled-jsx/css";
import { client } from "../client/client";
import { SearchResultsViewer } from "../components/SearchResultsViewer";

const ITEM_IDS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "500"];

const GET_ITEMS_QUERY = gql`
  {
    items(ids: [${ITEM_IDS.map(id => `"${id}"`)}]) {
      __typename
      ... on Item {
        id
        name
      }
      ... on NotFound {
        id
      }
      ... on Error {
        id
        message
      }
    }
  }
`;

interface SearchProps {
  data: Pick<GQLQuery, "items">;
}

export class SearchServerSide extends React.PureComponent<SearchProps> {
  /**
   * The server will wait until the GQL query is completed before responding to the client.
   */
  static async getInitialProps() {
    return await client.query({
      query: GET_ITEMS_QUERY
    });
  }

  render() {
    const { items } = this.props.data;
    return (
      <>
        <Title>{`Search results for: ${ITEM_IDS.join(", ")}`}</Title>
        <div className="search">
          <SearchResultsViewer searchResults={items} />
          <style jsx>{searchStyle}</style>
        </div>
      </>
    );
  }
}

const searchStyle = css`
  .search {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
`;

export default SearchServerSide;
