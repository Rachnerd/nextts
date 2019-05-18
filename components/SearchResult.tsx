import { UnionType } from "../utils/type.utils";
import { GQLError, GQLItem, GQLNotFound, GQLSearchResult } from "../gql.model";
import { Title } from "../ui-components/Title";
import * as React from "react";

export const SearchResult = ({
  result: { __typename, ...result }
}: {
  result: UnionType<GQLSearchResult>;
}) =>
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

const SearchResultItem = ({ item: { id, name } }: { item: GQLItem }) => (
  <>
    <Title text={`${id}. ${name}`} />
    <HttpCat status={200} />
  </>
);

const SearchResultNotFound = ({
  notFound: { id }
}: {
  notFound: GQLNotFound;
}) => (
  <>
    <Title text={`${id}. Not found`} />
    <HttpCat status={404} />
  </>
);

const SearchResultError = ({ error: { id, message } }: { error: GQLError }) => (
  <>
    <Title text={`${id}. ${message}`} />
    <HttpCat status={500} />
  </>
);

type HttpCatStatus = 200 | 404 | 500;

const HttpCat = ({ status }: { status: HttpCatStatus }) => (
  <div>
    <img src={`https://http.cat/${status}`} />
    {/*language=CSS*/}
    <style jsx>{`
      img {
        width: 100%;
      }
    `}</style>
  </div>
);
