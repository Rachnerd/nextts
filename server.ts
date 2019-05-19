// server.js

import * as next from "next";
import routes from "./routes";

const app = next({ dev: process.env.NODE_ENV !== "production" });

const handler = routes.getRequestHandler(app);

const express = require("express");

app.prepare().then(() => {
  const server = express();
  // server.use(require("compression")());
  server.use(handler).listen(3000);
});
