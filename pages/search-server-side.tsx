import * as React from "react";
import gql from "graphql-tag";
import { GQLQuery } from "../gql.model";
import { Title } from "../ui-components/Title";
import { SearchResultsGrid } from "../components/SearchResultsGrid";
import { SearchResultsList } from "../components/SearchResultsList";
import { SearchResultsGridList } from "../components/SearchResultsGridList";
import css from "styled-jsx/css";
import { client } from "../utils/client";

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
      query: GET_ITEMS_QUERY,
      fetchPolicy: "no-cache"
    });
  }

  render() {
    const { items } = this.props.data;
    return (
      <>
        <Title>{`Search results for: ${ITEM_IDS.join(", ")}`}</Title>
        <div className="search">
          <div>
            <Title>List</Title>
            <SearchResultsList searchResults={items} />
          </div>
          <div>
            <Title>List + Grid</Title>
            <SearchResultsGridList searchResults={items} />
          </div>
          <div>
            <Title>Grid</Title>
            <SearchResultsGrid searchResults={items} />
          </div>
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
