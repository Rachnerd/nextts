import { GQLNotFound } from "../gql.model";
import { Title } from "../ui-components/Title";
import * as React from "react";
import { HttpCat } from "./HttpCat";

interface SearchResultNotFoundProps {
  notFound: GQLNotFound;
}

export const SearchResultNotFound = ({
  notFound: { id }
}: SearchResultNotFoundProps) => (
  <>
    <Title>{`${id}. Not found`}</Title>
    <HttpCat status={404} />
  </>
);
