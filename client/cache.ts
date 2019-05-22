import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import introspectionQueryResultData from "../fragmentTypes.json";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

export const cache = new InMemoryCache({
  fragmentMatcher
});

cache.writeData({
  data: {
    searchResults: {
      __typename: "SearchResults",
      viewMode: "Grid"
    }
  }
});
