import Routes from "next-routes";
const nextRoutes = require("next-routes");

/**
 * TS types do not seem to match properly.
 */
const routes: Routes = nextRoutes();

const config = routes.add("index", "/").add("search", "/search");

export default config;
