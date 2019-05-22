const routes = require("next-routes");

export const routeConfig = routes()
  .add("index", "/")
  .add("test")
  .add("search")
  .add("search-server-side", "/search/server");

export const Link = routeConfig.Link;
