import { List } from "../ui-components/List";
import { GQLSearchResult } from "../gql.model";
import { ListItem } from "../ui-components/ListItem";
import * as React from "react";
import css from "styled-jsx/css";
import { SearchResult } from "./SearchResult";

interface SearchResultsListProps {
  searchResults: GQLSearchResult[];
}

export const SearchResultsList = ({
  searchResults
}: SearchResultsListProps) => (
  <List className={className}>
    {searchResults.map((result, index) => (
      <ListItem key={result.id + index}>
        <SearchResult result={result} />
      </ListItem>
    ))}
    {styles}
  </List>
);

{
  /*language=SCSS*/
}
const { className, styles } = css.resolve`
  $width: 18em;
  $height: 40em;
  .list {  
      width: $width;
      height: $height;
  }
`;
