import { GQLSearchResult } from "../gql.model";
import * as React from "react";
import { ReactNode } from "react";
import { Title } from "../ui-components/Title";
import { SearchResultsList } from "./SearchResultsList";
import { SearchResultsGridList } from "./SearchResultsGridList";
import { SearchResultsGrid } from "./SearchResultsGrid";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import css from "styled-jsx/css";
import { SearchResultsSelectViewMode } from "./SearchResultsSelectViewMode";

interface SearchResultsViewerProps {
  searchResults: GQLSearchResult[];
}
interface SearchResultsViewerData {
  data: {
    searchResults: {
      viewMode: "List" | "Grid" | "GridList";
    };
  };
}

const GET_VIEW_MODE = gql`
  query SearchResults {
    searchResults {
      viewMode
    }
  }
`;
export const SearchResults = ({
  searchResults
}: SearchResultsViewerProps) => (
  <Query query={GET_VIEW_MODE}>
    {({
      data: {
        searchResults: { viewMode }
      }
    }: SearchResultsViewerData): ReactNode => (
      <div className={"search-results"}>
        <style jsx>{searchStyle}</style>
        <div>
          <SearchResultsSelectViewMode viewMode={"List"} current={viewMode} />
          <SearchResultsSelectViewMode
            viewMode={"GridList"}
            current={viewMode}
          />
          <SearchResultsSelectViewMode viewMode={"Grid"} current={viewMode} />
        </div>
        <Title>{viewMode}</Title>
        {viewMode === "List" ? (
          <SearchResultsList searchResults={searchResults} />
        ) : viewMode === "GridList" ? (
          <SearchResultsGridList searchResults={searchResults} />
        ) : viewMode === "Grid" ? (
          <SearchResultsGrid searchResults={searchResults} />
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
    height: 40em;
    overflow: hidden;
  }
`;
