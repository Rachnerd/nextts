import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { ReactNode } from "react";
import * as React from "react";

const SELECT_VIEW_MODE = gql`
  mutation SelectSearchResultsViewMode($viewMode: String!) {
    selectSearchResultsViewMode(viewMode: $viewMode) @client
  }
`;

interface SearchResultsSelectViewModeProps {
  viewMode: string;
  current: string;
}

export const SearchResultsSelectViewMode = ({
  viewMode,
  current
}: SearchResultsSelectViewModeProps) => (
  <Mutation mutation={SELECT_VIEW_MODE} variables={{ viewMode }}>
    {(selectViewMode: () => ReactNode) => (
      <button onClick={selectViewMode} disabled={viewMode === current}>
        {viewMode}
      </button>
    )}
  </Mutation>
);
