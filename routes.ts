const routes = require("next-routes");

export const routeConfig = routes()
  .add("index", "/")
  .add("page");

export const Link = routeConfig.Link;
