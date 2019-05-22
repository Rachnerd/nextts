"use strict";
// server.js
exports.__esModule = true;
var next = require("next");
var routes_1 = require("./routes");
var app = next({ dev: process.env.NODE_ENV !== "production" });
var handler = routes_1.routeConfig.getRequestHandler(app);
var express = require("express");
app.prepare().then(function () {
    var server = express();
    server.use(require("compression")());
    server.use(handler).listen(3000);
});
