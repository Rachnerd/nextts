import { GQLItem } from "../gql.model";
import { Title } from "../ui-components/Title";
import * as React from "react";
import { HttpCat } from "./HttpCat";

interface SearchResultItemProps {
  item: GQLItem;
}

export const SearchResultItem = ({
  item: { id, name }
}: SearchResultItemProps) => (
  <>
    <Title>{`${id}. ${name}`}</Title>
    <HttpCat status={200} />
  </>
);
