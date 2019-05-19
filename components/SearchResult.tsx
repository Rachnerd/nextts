import { UnionType } from "../utils/type.utils";
import { GQLError, GQLItem, GQLNotFound, GQLSearchResult } from "../gql.model";
import * as React from "react";
import { SearchResultItem } from "./SearchResultItem";
import { SearchResultNotFound } from "./SearchResultNotFound";
import { SearchResultError } from "./SearchResultError";

interface SearchResultProps {
  result: UnionType<GQLSearchResult>;
}

export const SearchResult = ({
  result: { __typename, ...result }
}: SearchResultProps) =>
  __typename === "Item" ? (
    <SearchResultItem item={result as GQLItem} />
  ) : __typename === "NotFound" ? (
    <SearchResultNotFound notFound={result as GQLNotFound} />
  ) : __typename === "Error" ? (
    <SearchResultError error={result as GQLError} />
  ) : (
    <SearchResultError
      error={{
        id: result.id,
        message: `Typename "${__typename}" not matched!`
      }}
    />
  );
