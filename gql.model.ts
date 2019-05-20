export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type GQLError = {
  __typename?: "Error";
  id: Scalars["String"];
  message: Scalars["String"];
};

export type GQLItem = {
  __typename?: "Item";
  id: Scalars["String"];
  name: Scalars["String"];
};

export type GQLNotFound = {
  __typename?: "NotFound";
  id: Scalars["String"];
};

export type GQLQuery = {
  __typename?: "Query";
  items: Array<GQLSearchResult>;
};

export type GQLQueryItemsArgs = {
  ids: Array<Scalars["String"]>;
};

export type GQLSearchResult = GQLItem | GQLNotFound | GQLError;
