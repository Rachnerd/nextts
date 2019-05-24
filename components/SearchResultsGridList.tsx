import { List } from "../ui-components/List";
import { GQLSearchResult } from "../gql.model";
import { ListItem } from "../ui-components/ListItem";
import * as React from "react";
import css from "styled-jsx/css";
import { Grid } from "../ui-components/Grid";
import { GridTile } from "../ui-components/GridTile";
import { SearchResult } from "./SearchResult";

const AMOUNT_OF_COLUMNS_IN_ROW = 2;

interface SearchResultsGridListProps {
  searchResults: GQLSearchResult[];
}

export const SearchResultsGridList = ({
  searchResults
}: SearchResultsGridListProps) => (
  <List className={className}>
    {searchResults.map((result, index) => (
      <ListItem key={result.id + index}>
        <Grid>
          <GridTile rowSize={AMOUNT_OF_COLUMNS_IN_ROW}>
            <SearchResult result={result} />
          </GridTile>
          <GridTile rowSize={AMOUNT_OF_COLUMNS_IN_ROW}>
            <SearchResult result={result} />
          </GridTile>
          <GridTile rowSize={AMOUNT_OF_COLUMNS_IN_ROW}>
            <SearchResult result={result} />
          </GridTile>
          <GridTile rowSize={AMOUNT_OF_COLUMNS_IN_ROW}>
            <SearchResult result={result} />
          </GridTile>
        </Grid>
      </ListItem>
    ))}
    {styles}
  </List>
);

{
  /*language=SCSS*/
}
const { className, styles } = css.resolve`
  .list {
    height: 100%;
  }
`;
