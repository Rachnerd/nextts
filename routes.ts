const routes = require("next-routes");

export const routeConfig = routes()
  .add("index", "/")
  .add("search");

export const Link = routeConfig.Link;
