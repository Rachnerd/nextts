import { UnionType } from "../utils/type.utils";
import { GQLSearchResult } from "../gql.model";
import * as React from "react";
import css from "styled-jsx/css";
import { Grid } from "../ui-components/Grid";
import { GridTile } from "../ui-components/GridTile";
import { SearchResult } from "./SearchResult";

const AMOUNT_OF_COLUMNS_IN_ROW = 4;

export const SearchResultGrid = ({
  searchResults
}: {
  searchResults: GQLSearchResult[];
}) => (
  <Grid className={className}>
    {searchResults.map((result: UnionType<GQLSearchResult>, index) => (
      <GridTile
        amountPerRow={AMOUNT_OF_COLUMNS_IN_ROW}
        key={result.id + index}
      >
        <SearchResult result={result} />
      </GridTile>
    ))}
    {styles}
  </Grid>
);

{
  /*language=CSS*/
}
const { className, styles } = css.resolve`
  {  
      width: 50em;
      height: 40em;
  }
`;
