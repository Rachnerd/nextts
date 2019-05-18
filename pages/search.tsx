import * as React from "react";
import { client } from "./_app";
import gql from "graphql-tag";
import { GQLQuery } from "../gql.model";
import { Title } from "../ui-components/Title";
import { SearchResultGrid } from "../components/SearchResultGrid";
import { SearchResultList } from "../components/SearchResultList";
import { SearchResultGridList } from "../components/SearchResultGridList";
import css from "styled-jsx/css";
import { Query, QueryResult } from "react-apollo";
import { Loading } from "../ui-components/Loading";

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

const searchStyle = css`
  .search {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
`;

type ItemsQueryData = Pick<GQLQuery, "items">;

/**
 * The server will wait until the GQL query is completed before responding to the client.
 */
export class SearchServerSide extends React.PureComponent<{
  data: ItemsQueryData;
}> {
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
        <Title text={`Search results for: ${ITEM_IDS.join(", ")}`} />
        <div className="search">
          <div>
            <Title text={`List`} />
            <SearchResultList searchResults={items} />
          </div>
          <div>
            <Title text={`List + Grid`} />
            <SearchResultGridList searchResults={items} />
          </div>
          <div>
            <Title text={`Grid`} />
            <SearchResultGrid searchResults={items} />
          </div>
          <style jsx>{searchStyle}</style>
        </div>
      </>
    );
  }
}

/**
 * The server will respond immediately and let the client execute the GQL query.
 */
export class SearchClientSide extends React.PureComponent<{
  data: ItemsQueryData;
}> {
  render() {
    return (
      <Query query={GET_ITEMS_QUERY} fetchPolicy={"no-cache"}>
        {({ data, loading, error }: QueryResult<ItemsQueryData>) => {
          if (error) {
            return <p>Error</p>;
          }
          const renderLoadingOrComponent = Component =>
            loading || !data || !data.items ? <Loading /> : Component;
          return (
            <>
              <Title text={`Search results for: ${ITEM_IDS.join(", ")}`} />
              <div className="search">
                <div>
                  <Title text={`List`} />
                  {renderLoadingOrComponent(
                    <SearchResultList searchResults={data.items} />
                  )}
                </div>
                <div>
                  <Title text={`List + Grid`} />
                  {renderLoadingOrComponent(
                    <SearchResultGridList searchResults={data.items} />
                  )}
                </div>
                <div>
                  <Title text={`Grid`} />
                  {renderLoadingOrComponent(
                    <SearchResultGrid searchResults={data.items} />
                  )}
                </div>
                <style jsx>{searchStyle}</style>
              </div>
            </>
          );
        }}
      </Query>
    );
  }
}

/**
 * SearchServerSide || SearchClientSide
 */
export default SearchServerSide;
