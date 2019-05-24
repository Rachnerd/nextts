import * as React from "react";
import gql from "graphql-tag";
import { GQLQuery } from "../gql.model";
import { Title } from "../ui-components/Title";
import { Query, QueryResult } from "react-apollo";
import { Loading } from "../ui-components/Loading";
import { SearchResults } from "../components/SearchResults";
import { client } from "../client/client";

export const GET_ITEMS_QUERY_OPTIONS = {
  query: gql`
    query Items($ids: [String!]!) {
      items(ids: $ids) {
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
  `,
  variables: {
    ids: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "500"]
  }
};

export class Search extends React.Component<void> {
  /**
   * Will prefetch `items` for the initial render (entry point browser)
   */
  static async getInitialProps() {
    return await client.query(GET_ITEMS_QUERY_OPTIONS);
  }

  render() {
    const { query, variables } = GET_ITEMS_QUERY_OPTIONS;
    return (
      <Query
        query={query}
        variables={variables}
      >
        {({ data, loading, error }: QueryResult<Pick<GQLQuery, "items">>) => (
          <>
            <Title>{`Search results for: ${variables.ids.join(", ")}`}</Title>
            <div className="search">
              {error ? (
                <p>Error</p>
              ) : loading || !data || !data.items ? (
                <Loading />
              ) : (
                <SearchResults searchResults={data.items} />
              )}
            </div>
            {/*language=SCSS*/}
            <style jsx>{`
              .search {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
              }
            `}</style>
          </>
        )}
      </Query>
    );
  }
}

export default Search;
