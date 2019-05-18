import { List } from "../ui-components/List";
import { UnionType } from "../utils/type.utils";
import { GQLSearchResult } from "../gql.model";
import { ListItem } from "../ui-components/ListItem";
import * as React from "react";
import css from "styled-jsx/css";
import { Grid } from "../ui-components/Grid";
import { GridTile } from "../ui-components/GridTile";
import { SearchResult } from "./SearchResult";

const AMOUNT_OF_COLUMNS_IN_ROw = 2;

export const SearchResultGridList = ({
  searchResults
}: {
  searchResults: GQLSearchResult[];
}) => (
  <List className={className}>
    {searchResults.map((result: UnionType<GQLSearchResult>, index) => (
      <ListItem key={result.id + index}>
        <Grid>
          <GridTile amountPerRow={AMOUNT_OF_COLUMNS_IN_ROw}>
            <SearchResult result={result} />
          </GridTile>
          <GridTile amountPerRow={AMOUNT_OF_COLUMNS_IN_ROw}>
            <SearchResult result={result} />
          </GridTile>
        </Grid>
      </ListItem>
    ))}
    {styles}
  </List>
);

{
  /*language=CSS*/
}
const { className, styles } = css.resolve`
  {  
      width: 18em;
      height: 40em;
  }
`;
