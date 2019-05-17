// server.js

import * as next from "next";

const routes = require("next-routes");

const app = next({ dev: process.env.NODE_ENV !== "production" });

const handler = (routes as any)()
  .add("about", "/about", "blog")
  .add("asd", "/asd", "blog")
  .getRequestHandler(app);

const express = require("express");

app.prepare().then(() => {
  const server = express();
  server.use(require("compression")());
  server.use(handler).listen(3000);
});
