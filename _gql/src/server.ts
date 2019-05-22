import { ApolloServer, gql, makeExecutableSchema } from "apollo-server";
import { GQLError, GQLNotFound, GQLSearchResult } from "./models";
import { GQLItem } from "./models";

const resolvers = {
  Query: {
    items: async (_, { ids }): Promise<GQLSearchResult[]> => {
      console.log("Called with ", ids);
      return ids.map(id =>
        parseInt(id) < 5
          ? ({
              id,
              name: `Item ${id}`
            } as GQLItem)
          : id === "500"
          ? ({
              id,
              message: `Something went wrong!`
            } as GQLError)
          : ({
              id
            } as GQLNotFound)
      );
    }
  },
  SearchResult: {
    __resolveType: obj => {
      if ((obj as GQLItem).name) {
        return "Item";
      }

      if ((obj as GQLError).message) {
        return "Error";
      }

      if ((obj as GQLNotFound).id) {
        return "NotFound";
      }

      return null;
    }
  }
};

const schema = makeExecutableSchema({
  typeDefs: gql`
    type Item {
      id: String!
      name: String!
    }

    type NotFound {
      id: String!
    }

    type Error {
      id: String!
      message: String!
    }

    union SearchResult = Item | NotFound | Error

    type Query {
      items(ids: [String!]!): [SearchResult!]!
    }
  `,
  resolvers
});

const server = new ApolloServer({
  schema,
  introspection: true
});

server.listen(8080).then(() => console.log("Server started"));

declare const module: any;
if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}
