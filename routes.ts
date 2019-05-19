import Routes from "next-routes";
const nextRoutes = require("next-routes");

/**
 * TS types do not seem to match properly.
 */
const routes: Routes = nextRoutes();

const config = routes
  .add("index", "/")
  .add("search-server-side", "/search/server")
  .add("search-client-side", "/search/client");

export default config;
