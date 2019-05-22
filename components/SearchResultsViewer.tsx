import { GQLSearchResult } from "../gql.model";
import * as React from "react";
import { Title } from "../ui-components/Title";
import { SearchResultsList } from "./SearchResultsList";
import { SearchResultsGridList } from "./SearchResultsGridList";
import { SearchResultsGrid } from "./SearchResultsGrid";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import css from "styled-jsx/css";
import { ReactNode } from "react";

interface SearchResultsViewerProps {
  searchResults: GQLSearchResult[];
}
const GET_VIEW_MODE = gql`
  query SearchResults {
    searchResults {
      viewMode
    }
  }
`;
export const SearchResultsViewer = ({
  searchResults
}: SearchResultsViewerProps) => (
  <Query query={GET_VIEW_MODE}>
    {({
      data: {
        searchResults: { viewMode }
      }
    }: {
      data: { searchResults: { viewMode: "List" | "Grid" | "GridList" } };
    }): ReactNode => (
      <div className={"search-results"}>
        <style jsx>{searchStyle}</style>
        <div>
          <SelectViewMode viewMode={"List"} current={viewMode} />
          <SelectViewMode viewMode={"GridList"} current={viewMode} />
          <SelectViewMode viewMode={"Grid"} current={viewMode} />
        </div>
        {viewMode === "List" ? (
          <div>
            <Title>List</Title>
            <SearchResultsList searchResults={searchResults} />
          </div>
        ) : viewMode === "GridList" ? (
          <div>
            <Title>List + Grid</Title>
            <SearchResultsGridList searchResults={searchResults} />
          </div>
        ) : viewMode === "Grid" ? (
          <div>
            <Title>Grid</Title>
            <SearchResultsGrid searchResults={searchResults} />
          </div>
        ) : (
          <p>ViewMode not matched</p>
        )}
      </div>
    )}
  </Query>
);

const searchStyle = css`
  .search-results {
    display: flex;
    flex-direction: column;
    width: 50em;
  }
`;

const SELECT_VIEW_MODE = gql`
  mutation SelectSearchResultsViewMode($viewMode: String!) {
    selectSearchResultsViewMode(viewMode: $viewMode) @client
  }
`;

const SelectViewMode = ({
  viewMode,
  current
}: {
  viewMode: string;
  current: string;
}) => (
  <Mutation mutation={SELECT_VIEW_MODE} variables={{ viewMode }}>
    {(selectViewMode: () => ReactNode) => (
      <button onClick={selectViewMode} disabled={viewMode === current}>
        {viewMode}
      </button>
    )}
  </Mutation>
);
