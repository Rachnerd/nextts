import * as React from "react";
import gql from "graphql-tag";
import { GQLQuery } from "../gql.model";
import { Title } from "../ui-components/Title";
import { SearchResultsGrid } from "../components/SearchResultsGrid";
import { SearchResultsList } from "../components/SearchResultsList";
import { SearchResultsGridList } from "../components/SearchResultsGridList";
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

interface SearchProps {
  data: Pick<GQLQuery, "items">;
}

export class SearchClientSide extends React.PureComponent<SearchProps> {
  render() {
    return (
      /**
       * The server will respond immediately and let the client execute the GQL query.
       */
      <Query query={GET_ITEMS_QUERY} fetchPolicy={"no-cache"}>
        {({ data, loading, error }: QueryResult<Pick<GQLQuery, "items">>) => {
          if (error) {
            return <p>Error</p>;
          }
          const renderLoadingOrComponent = Component =>
            loading || !data || !data.items ? <Loading /> : Component;
          return (
            <>
              <Title>{`Search results for: ${ITEM_IDS.join(", ")}`}</Title>
              <div className="search">
                <div>
                  <Title>List</Title>
                  {renderLoadingOrComponent(
                    <SearchResultsList searchResults={data.items} />
                  )}
                </div>
                <div>
                  <Title>List + Grid</Title>
                  {renderLoadingOrComponent(
                    <SearchResultsGridList searchResults={data.items} />
                  )}
                </div>
                <div>
                  <Title>Grid</Title>
                  {renderLoadingOrComponent(
                    <SearchResultsGrid searchResults={data.items} />
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

const searchStyle = css`
  .search {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
`;

export default SearchClientSide;
