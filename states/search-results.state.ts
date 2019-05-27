import { effect, mutation, state } from "@loona/react";
import gql from "graphql-tag";
import {
  SelectViewMode,
  SelectViewModePayload
} from "./select-view-mode.action";
import { Context, EffectContext, MutationAsAction, Action } from "@loona/core";
import { TrackClick } from "./track-click.action";

export interface SearchResultsData {
  searchResults: {
    __typename: string;
    viewMode: "List" | "Grid" | "GridList";
  };
}

@state<SearchResultsData>({
  typeDefs: `
    type SearchResults {
      viewMode: String!
    }
    extend type Query {
      searchResults: SearchResults
    }
    
    type Mutation {
      selectSearchResultsViewMode(viewMode: String!): Boolean
    }
  `,
  defaults: {
    searchResults: {
      __typename: "SearchResults",
      viewMode: "List"
    }
  }
})
export class SearchResultsState {
  @mutation(SelectViewMode)
  selectViewModeMutation(
    { viewMode }: Partial<SearchResultsData["searchResults"]>,
    { patchQuery }: Context
  ) {
    patchQuery(
      gql`
        {
          searchResults {
            viewMode
          }
        }
      `,
      ({ searchResults }: SearchResultsData) => {
        searchResults.viewMode = viewMode!;
      }
    );
  }

  @effect(SelectViewMode)
  selectViewModeEffect(
    action: Action | MutationAsAction,
    { dispatch }: EffectContext
  ) {
    dispatch(
      new TrackClick(
        "SelectViewMode",
        ((action as MutationAsAction).options
          .variables! as SelectViewModePayload).viewMode
      )
    );
  }
}
