import { GQLError } from "../gql.model";
import { Title } from "../ui-components/Title";
import * as React from "react";
import { HttpCat } from "./HttpCat";

interface SearchResultErrorProps {
  error: GQLError;
}

export const SearchResultError = ({
  error: { id, message }
}: SearchResultErrorProps) => (
  <>
    <Title>{`${id}. ${message}`}</Title>
    <HttpCat status={500} />
  </>
);
