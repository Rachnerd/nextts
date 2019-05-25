import gql from "graphql-tag";

export interface SelectViewModePayload {
  viewMode: string;
}

export class SelectViewMode {
  static mutation = gql`
    mutation SelectSearchResultsViewMode($viewMode: String!) {
      selectSearchResultsViewMode(viewMode: $viewMode) @client
    }
  `;

  type = ""; // Loona type issue

  constructor(public variables: SelectViewModePayload) {}
}
